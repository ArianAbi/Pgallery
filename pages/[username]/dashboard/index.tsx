import { useEffect, useState } from "react"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { MobileNav } from "@/components/MobileNav"
import { DashboardPost } from "@/components/DashboardPost"

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
    }, [user, supabaseClient])

    return (
        <>

            <div className="flex justify-between py-4 px-4 ">
                <div className="flex gap-4 ">
                    <div className="w-[70px] aspect-square bg-stone-100 rounded-full"></div>
                    <h2 className="text-white mt-2 text-lg font-semibold">{username}</h2>
                </div>

                <div className="flex flex-col items-center justify-center text-white text-md pr-4">
                    <span className="">{posts?.length}</span>
                    <span className="">posts</span>
                </div>
            </div>

            <div>
                <h3 className="bg-stone-800 text-xl font-semibold text-white px-4 py-2">Posts</h3>

                <div className="grid grid-cols-3 gap-1 p-2">
                    {posts?.length === 0 &&
                        <div className="text-white col-span-full text-center mt-4 text-lg italic">No Posts Yet</div>
                    }

                    {posts?.map(post => {
                        return (
                            // <div className="bg-white text-black text-center w-full h-[110px] flex items-center justify-center 
                            // rounded-md shadow-md">
                            //     {post.title}
                            // </div>
                            <DashboardPost image_path={post.image_path} title={post.title} creator_id={post.creator_id} date={post.date} id={post.id} key={post.id} />
                        )
                    })}
                </div>
            </div>

            <MobileNav />
        </>
    )
}

export default Dashboard