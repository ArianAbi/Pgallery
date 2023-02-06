import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

interface Post {
    id: string,
    creator_id: string,
    title: string,
    date: string
}

export const Post = ({ id, creator_id, title, date }: Post) => {

    const supabaseClient = useSupabaseClient();
    const [username, setUsername] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await supabaseClient.from('users').select('user_name').eq('user_id', creator_id)

            setUsername(data && data[0].user_name)
        })()
    }, [])

    return (
        <div
            key={id}
            className="w-full bg-white rounded-md shadow-md flex flex-col justify-center items-center py-4"
        >
            <h2 className="text-xl font-semibold">
                {title}
            </h2>

            <div className="flex flex-col gap-2 items-center pt-10">
                <span>{username}</span>
                <span>{date}</span>
            </div>
        </div>
    )
}