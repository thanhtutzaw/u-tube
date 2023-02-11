import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useCallback, useState } from "react";
import { Item } from "@/components/Comment/Item";
import { Comment, Drawer } from "@/components";
import { PrimaryInput } from "@/components/Comment/PrimaryInput";
import {AiOutlineClose} from "react-icons/ai"
// const inter = Inter({ subsets: ["latin"] });
// interface ICounter {
//   counter: number;
//   setCounter: () => void;
// }

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);

  // const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <Head>
        <title>U-Tube</title>
        <meta name="description" content="Mini U Tube" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.bottom}>
          <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
            <PrimaryInput />
            <Comment>
              {Array.from(Array(10), (_, i) => (
                <Item key={i} />
              ))}
            </Comment>
          </Drawer>
        </div>
        <div className={styles.top}>
          <Video />

          <div className={styles.topContent}>
            <div
            className={styles.showComment}
              onClick={() => {
                setOpenDrawer((prev) => !prev);
                // inputRef.current?.focus()
              }}
            >
              Add Comment
            </div>

            <VideoLink />
            <VideoLink />
            <VideoLink />
            <VideoLink />
          </div>
        </div>
      </main>
    </>
  );
}
// type VideoProps ={
// vid:ref
// }
function Video() {
  const vid = useCallback((x: any) => (x.volume = 0.06), []);
  return (
    <video
    className={styles.player}
      width="500"
      muted // autoPlay={true}
      controls
      title={
        'Music Playing "Evening Of Amsterdam (Offical Lyric Vedio)_Luizz " '
      }
      ref={vid}
      loop
      onPlaying={(e) => {
        // e.currentTarget.muted = false;
      }}
      src="download.mp4"
    ></video>
  );
}

function VideoLink({}) {
  return (
    <a href="#">
      <div className="videoCard">More Video</div>
    </a>
  );
}
