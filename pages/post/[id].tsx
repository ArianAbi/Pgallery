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
    const [creatorUsername, setCreatorUsername] = useState<string>();

    const [loading, setLoading] = useState(true);

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

            const { data: creatorUsername, error: creatorUsernameErr } = await supabaseClient.from('users').select('user_name').eq('user_id', data[0].creator_id)

            setCreatorUsername(creatorUsername && creatorUsername[0].user_name)
            setPost(data[0])
            setLoading(false)
        })()
    }, [id])

    return (
        <>
            {loading &&
                <div className="flex flex-col gap-4">
                    {/* image placeholder */}
                    <div className="w-full aspect-video bg-slate-400 animate-pulse"></div>


                    <div className="flex flex-col gap-4 px-4">
                        {/* title placeholder */}
                        <span className="w-[220px] h-8 bg-slate-400 rounded-md animate-pulse"></span>

                        {/* profile placeholder */}
                        <div className="flex gap-2">
                            <div className="w-12 aspect-square rounded-full bg-slate-400 animate-pulse"></div>

                            <div className="w-[100px] h-6 rounded-md bg-slate-400 animate-pulse"></div>
                        </div>

                        {/* description placeholder */}
                        <span className="w-[320px] h-6 bg-slate-400 rounded-md animate-pulse"></span>
                        <span className="w-[320px] h-6 bg-slate-400 rounded-md animate-pulse"></span>
                        <span className="w-[320px] h-6 bg-slate-400 rounded-md animate-pulse"></span>
                    </div>
                </div>
            }

            {!loading &&

                <div className="flex flex-col gap-4 text-white">
                    {/* image */}
                    {post && imageUrl &&
                        <Image
                            className="w-full max-h-[50vh] min-h-[300px] aspect-auto object-contain bg-stone-900"
                            placeholder="empty"
                            alt={post.description}
                            src={imageUrl}
                            width={200}
                            height={200}
                        />
                    }

                    <div className="px-4 flex flex-col gap-4">
                        {/* title */}
                        <h1 className="text-xl font-semibold">
                            {post?.title}
                        </h1>

                        {/* profile */}
                        <div>
                            <div className="flex gap-2">
                                <div className="w-12 aspect-square rounded-full bg-slate-400"></div>

                                <div className="mt-1">{creatorUsername}</div>
                            </div>
                        </div>

                        {/* date */}
                        <span className="text-sm italic flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>

                            {dayjs(post?.date).format('YY/MM/DD')}
                        </span>

                        {/* description */}
                        <p>{post?.description}</p>
                    </div>
                </div>
            }

            <MobileNav />
        </>
    )
}