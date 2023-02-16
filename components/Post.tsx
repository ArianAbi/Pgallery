import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import dayjs from "dayjs"
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
            console.log(imageData.publicUrl);
            setImage(imageData.publicUrl)

            const { data } = await supabaseClient.from('users').select('user_name').eq('user_id', creator_id)

            setUsername(data && data[0].user_name)
        })()
    }, [])

    return (
        <Link href={`/post/${id}`}>
            <div
                className="h-full w-full bg-white rounded-md shadow-md flex flex-col justify-center items-center py-4"
            >
                <h2 className="text-xl font-semibold">
                    {title}
                </h2>

                <div className="flex flex-col gap-2 items-center pt-10">
                    <span>{username}</span>
                    <span>created at : {formatedDate}</span>
                </div>

                <img src={image} alt="" />
            </div>
        </Link>
    )
}