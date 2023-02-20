import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect } from "react";
import { Post } from "@/components/Post";
import { MobileNav } from "@/components/MobileNav";

export default function Home() {

  const supabaseClient = useSupabaseClient();
  const userClient = useUser();

  const [postJsx, setPostJsx] = useState<JSX.Element[]>();
  const [loadingJsx, setLoadingJsx] = useState<JSX.Element[]>();
  const [loading, setLoading] = useState(true);

  //fetch posts
  useEffect(() => {
    (async () => {
      const { data: posts, error } = await supabaseClient.from('posts').select('*')

      if (error) {
        console.log(error);
        return;
      }

      const renderdPosts = posts?.map(post => {
        return (
          <Post
            id={post.id}
            creator_id={post.creator_id}
            title={post.title}
            date={post.date}
            image_path={post.image_path}
            key={post.id}
          />
        )
      })

      setPostJsx(renderdPosts)
      setLoading(false)
    })()
  }, [userClient])

  if (loading) {
    return (
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 text-center p-4 gap-2">
        {
          Array.apply(null, Array(25)).map(() => {
            return <div className="bg-slate-500 animate-pulse w-full aspect-square"></div>
          })
        }
      </div>
    )
  }

  return (
    <>
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 text-center p-4 gap-2">
        {postJsx}
      </div>

      {userClient &&
        <MobileNav />
      }
    </>
  )
}
