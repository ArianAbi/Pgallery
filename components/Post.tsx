import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"


interface Post {
    id: string,
    creator_id: string,
    title: string,
    date: string,
    image_path: string,
}

export const Post = ({ id, creator_id, title, date, image_path }: Post) => {

    const supabaseClient = useSupabaseClient();

    const [username, setUsername] = useState("");
    const [image, setImage] = useState<string>();

    const formatedDate = dayjs(date).format('YY/DD/MM');

    useEffect(() => {
        (async () => {
            const { data: imageData } = await supabaseClient.storage.from('posts').getPublicUrl(image_path)

            setImage(imageData.publicUrl)

            const { data } = await supabaseClient.from('users').select('user_name').eq('user_id', creator_id)

            setUsername(data && data[0].user_name)
        })()
    }, [])

    return (
        <Link href={`/post/${id}`}>
            <div
                // style={{ backgroundImage: `url(${image})` }}
                className="w-full bg-cover bg-center aspect-square rounded-md flex flex-col justify-end items-center py-2 shadow-post relative overflow-hidden"
            >

                {image &&

                    <Image
                        className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] min-h-full min-w-full object-cover m-auto text-center"
                        alt={title}
                        src={image}
                        width={100}
                        height={100}
                        quality={50}
                    />

                }


                <h2 className="text-white font-semibold text-xl">
                    {title}
                </h2>
            </div>
        </Link>
    )
}