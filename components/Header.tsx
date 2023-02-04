import { useEffect } from "react"
import Router, { useRouter } from "next/router"

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
                <div className="text-left">
                    Menu
                </div>

                <div className="text-xl font-bold">
                    Logo
                </div>

                <div className="text-right">
                    <a href={loginRoute}>Profile</a>
                </div>
            </header>
        </>
    )
}