interface Post {
    id: string,
    creator_id: string,
    title: string,
    date: string
}

export const Post = ({ id, creator_id, title, date }: Post) => {
    return (
        <div
            key={id}
            className="w-full bg-white rounded-md shadow-md flex flex-col justify-center items-center py-4"
        >
            <h2 className="text-xl font-semibold">
                {title}
            </h2>

            <div className="flex flex-col gap-2 items-center pt-10">
                <span>{creator_id}</span>
                <span>{date}</span>
            </div>
        </div>
    )
}