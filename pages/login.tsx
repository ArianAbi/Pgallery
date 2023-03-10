import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Login() {

    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onFormSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        setError("");

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return;
        }

        console.log(`welcome ${data.user?.email}`);
        router.replace('/');
    }

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center px-10">

                <form
                    onSubmit={onFormSubmit}
                    className="shadow-md rounded-md w-full bg-white p-5 flex flex-col gap-6"
                >
                    {/* google */}
                    <button
                        className="relative w-full bg-white py-2 rounded-md outline outline-1 outline-gray-400"
                    >
                        <Image
                            className="absolute left-2 top-[50%] translate-y-[-50%]"
                            priority
                            src="/google.svg"
                            height={28}
                            width={28}
                            alt="login with google"
                        />
                        Login With Google
                    </button>


                    {/* divider */}
                    <div className="relative text-center">
                        <div className="w-full h-[1px] bg-black opacity-50"></div>
                        <span className="absolute top-0 translate-x-[-50%] translate-y-[-50%] bg-white px-2 font-semibold">or</span>
                    </div>

                    {/* email */}
                    <input
                        className="py-2 px-3 rounded-md outline outline-1 outline-gray-400"
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    {/* password */}
                    <input
                        className="py-2 px-3 rounded-md outline outline-1 outline-gray-400"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    {/* login */}
                    <div className="text-center">
                        <button
                            className={`w-full py-2 bg-emerald-600 text-white text-xl font-semibold rounded-md
                            ${loading ? "animate-pulse" : ""}
                            `}
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "loading..." : "Login"}
                        </button>

                        {error && <span className="text-sm italic text-red-600">{error}</span>}
                    </div>

                    {/* signup */}
                    <span className="w-full text-center gap-2 text-sm">
                        don&apos;t have an account ?
                        <Link
                            className="text-cyan-600"
                            href="/signup"
                        >
                            SignUp
                        </Link>
                    </span>
                </form>
            </div>
        </>
    )
}