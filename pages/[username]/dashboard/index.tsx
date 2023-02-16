import { useEffect, useState } from "react"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { MobileNav } from "@/components/MobileNav"
import { Post } from "@/components/Post"

const Dashboard = () => {

    const user = useUser()
    const supabaseClient = useSupabaseClient();

    const [username, setUsername] = useState('');
    const [posts, setPosts] = useState<any[]>();

    useEffect(() => {
        (async () => {
            if (user === null) {
                return
            }

            //set username
            const { data: usernameData, error: usernameErr } = await supabaseClient.from('users').select('user_name').eq('user_id', user?.id)

            if (usernameErr) {
                console.log(usernameErr);
                return;
            }

            const username = usernameData && usernameData[0].user_name;
            setUsername(username)

            //get posts
            const { data: postData, error: postErr } = await supabaseClient.from('posts').select('*').eq('creator_id', user?.id)

            if (postErr) {
                console.log(postErr);
                return;
            }

            setPosts(postData)
        })()
    }, [user])

    return (
        <>
            <h2>{username}</h2>
            <div>Dashboard</div>

            <div>
                <h3 className="bg-stone-800 text-xl font-semibold text-white px-4 py-2">Posts</h3>

                <div className="grid grid-cols-3 gap-2 p-2">
                    {posts?.map(post => {
                        return (
                            // <div className="bg-white text-black text-center w-full h-[110px] flex items-center justify-center 
                            // rounded-md shadow-md">
                            //     {post.title}
                            // </div>
                            <Post title={post.title} creator_id={post.creator_id} date={post.date} id={post.id} />
                        )
                    })}
                </div>
            </div>

            <MobileNav />
        </>
    )
}

export default Dashboard