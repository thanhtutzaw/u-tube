import s from "@/styles/Home.module.css";

export function Player({ autoplay = true }) {
    // const vid = useCallback((x: any) => (x.volume = 0.06), []);
    return (
        <video
            className={s.player}
            width="500"
            muted
            autoPlay={autoplay}
            controls
            title={"Playing Video"}
            onPlaying={(e) => {
                e.currentTarget.muted = false;
            }}
            src="download.mp4"
        />
    );
}
