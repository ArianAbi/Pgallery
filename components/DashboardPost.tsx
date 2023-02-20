import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import dayjs from "dayjs"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"


interface Post {
    id: string,
    creator_id: string,
    title: string,
    date: string,
    image_path: string,
}

export const DashboardPost = ({ id, creator_id, title, date, image_path }: Post) => {

    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [image, setImage] = useState<string>();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteing, setDeleteing] = useState(false);

    useEffect(() => {
        (async () => {
            const { data: imageData } = await supabaseClient.storage.from('posts').getPublicUrl(image_path)

            setImage(imageData.publicUrl)

            const { data } = await supabaseClient.from('users').select('user_name').eq('user_id', creator_id)

            setUsername(data && data[0].user_name)
        })()
    }, [creator_id, image_path, supabaseClient])

    const toggleDialog = () => {
        setDialogOpen(!dialogOpen)
    }

    const deletePost = async (id: string) => {
        console.log("deleteing...");
        setDeleteing(true);

        const { error: postDeleteErr } = await supabaseClient.from('posts').delete().eq('id', id)
        if (postDeleteErr) {
            console.log("error occured : " + postDeleteErr);
            return;
        }
        const { error: imageDeleteErr } = await supabaseClient.storage.from('posts').remove([image_path])
        if (imageDeleteErr) {
            console.log("error occured : " + imageDeleteErr);
            return;
        }

        console.log("deleted");
        setDeleteing(false)
        router.reload();
        toggleDialog()
    }

    return (

        <>
            <div
                className="w-full bg-cover bg-center aspect-square flex flex-col justify-end items-center py-2 relative overflow-hidden z-10"
            >

                {/* delete button */}
                <button
                    className="absolute right-1 top-1 z-10 p-1 backdrop-blur-[2px]"
                    onClick={() => toggleDialog()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path className="stroke-red-500" strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>

                <Link href={`/post/${id}`}>
                    {image &&

                        <Image
                            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-0 min-h-full min-w-full object-cover m-auto text-center"
                            alt={title}
                            src={image}
                            width={100}
                            height={100}
                            quality={75}
                        />
                    }


                </Link>
            </div>

            {/* dialog box */}
            {dialogOpen &&

                <div
                    className="absolute backdrop-brightness-50 w-full h-full top-0 left-0 flex items-center justify-center z-20"
                >

                    <div className="flex flex-col items-center justify-center gap-6 bg-slate-700 px-10 py-6 rounded-md">
                        <p className="text-white">are you sure?</p>

                        <div className="flex gap-4">
                            <button
                                className="w-[100px] text-white border-2 border-white py-2 rounded-md font-semibold"
                                onClick={toggleDialog}
                                disabled={deleteing}
                            >
                                cancel
                            </button>

                            <button
                                className="w-[100px] bg-red-500 text-white rounded-md font-semibold"
                                onClick={() => deletePost(id)}
                                disabled={deleteing}
                            >
                                {deleteing ? "deleting" : "delete"}
                            </button>
                        </div>
                    </div>

                </div>

            }
        </>

    )
}