import { useEffect } from "react"
import Router, { useRouter } from "next/router"
import Link from "next/link"

export const Header = () => {

    const loginRoute = "/login"
    const signupRoute = "/signup"
    const router = useRouter();

    if (router.pathname === loginRoute || router.pathname === signupRoute) {
        return <></>
    }
    return (
        <>
            <header className="grid grid-cols-3 w-full bg-slate-200 text-center p-3">
                <div className="text-xl font-bold text-left">
                    <Link href="/">
                        Logo
                    </Link>
                </div>

                <div className="">
                    Search
                </div>

                <div className="text-right">
                    <a href={loginRoute}>Account</a>
                </div>
            </header>
        </>
    )
}