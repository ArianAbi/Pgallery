import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState, useEffect } from "react";
import { Post } from "@/components/Post";
import { MobileNav } from "@/components/MobileNav";

export default function Home() {

  const supabaseClient = useSupabaseClient();
  const userClient = useUser();

  const [postJsx, setPostJsx] = useState<JSX.Element[]>();

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
          />
        )
      })

      setPostJsx(renderdPosts)

    })()
  }, [])

  return (
    <>
      <div className="w-full flex flex-col items-center py-4 px-6 gap-4">

        {postJsx}

      </div>

      {userClient &&
        <MobileNav />
      }
    </>
  )
}
