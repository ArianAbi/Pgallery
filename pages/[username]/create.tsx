import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function CreatePost() {

    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const { username } = router.query;

    const [title, setTitle] = useState("");

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        setError("")

        if (title === "") {
            setError("please add title");
            return;
        }

        try {
            await supabaseClient.from('posts').insert({ title: title, creator_id: user?.id })
        } catch (err) {
            console.log(err);
            setError(`${err}`);
            return;
        }

        router.replace('/')
    }

    return (
        <>
            <div className="my-auto px-10">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col w-full items-center gap-6 p-6 bg-white rounded-md shadow-md"
                >
                    <h2 className="text-md font-semibold">Create New Post</h2>

                    {/* title */}
                    <input
                        className="w-full py-2 px-3 rounded-md outline outline-1 outline-gray-400"
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    {/* create */}
                    <div className="w-full text-center">
                        <button
                            className={`w-full py-2 bg-emerald-600 text-white text-xl font-semibold rounded-md
                            ${loading ? "animate-pulse" : ""}
                            `}
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "loading..." : "Create"}
                        </button>

                        {error && <span className="text-sm italic text-red-600">{error}</span>}
                    </div>
                </form>
            </div>
        </>
    )
}