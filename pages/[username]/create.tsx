import { useRouter } from "next/router"

export default function CreatePost() {

    const router = useRouter();

    const { username } = router.query;

    return (
        <>
            <div className="font-semibold text-white">
                {username}
            </div>
        </>
    )
}