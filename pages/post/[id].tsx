import { useRouter } from "next/router"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react";
import { MobileNav } from "@/components/MobileNav";
import Image from "next/image";
import dayjs from "dayjs";

export default function PostPage() {

    type data = {
        creator_id: string,
        date: string,
        id: string,
        title: string,
        description: string,
        image_path: string
    }

    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const [post, setPost] = useState<data>()
    const [imageUrl, setImageUrl] = useState<string>()

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

            const { data: _imageUrl } = await supabaseClient.storage.from('posts').getPublicUrl(data[0].image_path);

            setImageUrl(_imageUrl.publicUrl)

            setPost(data[0])
        })()
    }, [id])

    return (
        <>
            <div className="text-white">
                {/* image */}
                {post && imageUrl &&

                    <Image
                        alt={post.description}
                        src={imageUrl}
                        width={200}
                        height={200}
                    />

                }
                {/* title */}
                <h1>{post?.title}</h1>

                {/* date */}
                <span>{dayjs(post?.date).format('YY/MM/DD')}</span>

                {/* description */}
                <p>{post?.description}</p>


            </div>

            <MobileNav />
        </>
    )
}