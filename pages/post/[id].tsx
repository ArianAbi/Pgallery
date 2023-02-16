import { useRouter } from "next/router"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react";
import { Post } from "@/components/Post";
import { MobileNav } from "@/components/MobileNav";

export default function ArtworkPost() {

    interface data {
        creator_id: string,
        date: string,
        id: string,
        title: string
    }

    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const [post, setPost] = useState<data[]>()

    const { id } = router.query

    useEffect(() => {
        if (!id) {
            return;
        }
        (async () => {
            const { data, error } = await supabaseClient.from('posts').select('*').eq('id', id)
            if (error) {
                console.log(error);
                return;
            }

            console.log(data[0]);

            setPost(data)
        })()
    }, [id])

    return (
        <>
            <h2 className="text-center text-white">{post && post[0].title}</h2>

            <MobileNav />
        </>
    )
}