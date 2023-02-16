import s from "@/styles/Home.module.css";
import { useCallback } from "react";

export function Player({ autoplay = true }) {
    const vid = useCallback((x: any) => (x.volume = 0.06), []);
    return (
        <video
            className={s.player}
            width="500"
            muted
            autoPlay={autoplay}
            controls
            title={
                'Music Playing "Evening Of Amsterdam (Offical Lyric Vedio)_Luizz " '
            }
            ref={vid}
            loop
            onPlaying={(e) => {
                e.currentTarget.muted = false;
            }}
            src="download.mp4"
        ></video>
    );
}
