import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

export default function Home() {

  const supabaseClient = useSupabaseClient();
  const userClient = useUser();

  return (
    <>
      <div className="h-screen w-screen bg-slate-700 text-green-500">
        Hi
      </div>
    </>
  )
}
