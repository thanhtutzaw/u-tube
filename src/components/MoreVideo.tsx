function VideoLink({}) {
    return (
        <a href="#">
            <div className="videoCard">More Video</div>
        </a>
    );
}
export function MoreVideo({}) {
    return (
        <>
            <VideoLink />
            <VideoLink />
            <VideoLink />
            <VideoLink />
        </>
    );
}
