import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState } from "react";

export default function Home() {

  const supabaseClient = useSupabaseClient();
  const userClient = useUser();
  const [userName, setUserName] = useState("");

  const getUserName = async () => {

    setUserName("Loading...")

    const { data, error } = await supabaseClient.from('users').select('user_name').eq('user_id', userClient?.id)

    if (error) {
      console.log(error);
      setUserName("")
      return;
    }

    setUserName(data[0].user_name)
  }

  return (
    <>
      <div className="h-screen w-full bg-slate-700 flex flex-col items-center py-4 gap-4">
        <button
          className="bg-green-600 px-2 py-2 text-white font-semibold rounded-md"
          onClick={getUserName}
        >
          Get User Name
        </button>

        {
          userName === "" ?
            <h1 className="text-white font-semibold">No UserName</h1>
            :
            <h1 className="text-white font-semibold">{userName}</h1>
        }

      </div>
    </>
  )
}
