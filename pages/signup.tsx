import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function signup() {

    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);

    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        setError("")

        //check for empty fields
        if (
            username === "" ||
            email === "" ||
            password === "" ||
            confirm === ""
        ) {
            setError("please fill all the fields")
            return;
        }

        //check for password match
        if (password !== confirm) {
            setError("passwords don't match");
            return;
        }

        try {
            const data = await supabaseClient.auth.signUp({ email: email, password: password });
            const userId = data.data.user?.id;
            await supabaseClient.from("users").insert([{ user_id: userId, user_name: username },])
        } catch (err) {
            setError("Some Error Happend (unhandled)")
            console.log(err);
            return;
        }

        setAccountCreated(true);
        console.log("created");

    }

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center px-10">

                <form
                    className="shadow-md rounded-md w-full bg-white p-5 flex flex-col text-center"
                    onSubmit={onFormSubmit}
                >
                    <h1
                        className="text-lg font-semibold my-3"
                    >
                        Create pGallery Account
                    </h1>

                    {/* username */}
                    <input
                        className="py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    {/* email */}
                    <input
                        className="py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3"
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    {/* password */}
                    <input
                        className="py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    {/* confirm */}
                    <input
                        className="py-2 px-3 rounded-md outline outline-1 outline-gray-400 my-3"
                        type="password"
                        placeholder="confirm"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                    />

                    {/* error */}
                    {
                        error ? <span className="text-red-500 text-sm italic my-1 ">{error}</span> : <></>
                    }

                    {/* login */}
                    <button
                        className={`
                        w-full py-2 bg-emerald-600 text-white text-xl font-semibold rounded-md mt-2 
                        ${loading ? "bg-opacity-80 animate-pulse" : ""}
                        `}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>
            </div>

            {/* created succsess */}
            {
                accountCreated &&
                <div className="flex items-center justify-center bg-black bg-opacity-75 left-0 top-0 absolute w-full h-full z-10">

                    <div className="flex flex-col gap-4 items-center justify-center bg-white px-6 py-10 rounded-md shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path className="stroke-green-600" strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <div className="font-semibold text-green-600">
                            Check Your Email for Verification
                        </div>

                        <button
                            className="bg-green-600 text-white font-semibold text-base p-2 rounded-md shadow-md"
                            onClick={() => {
                                router.replace('/')
                            }}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            }
        </>
    )
}