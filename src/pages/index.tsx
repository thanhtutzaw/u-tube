import Head from "next/head";
import styles from "@/styles/Home.module.css";
// import drawer from "@/styles/Drawer.module.css";
import { useCallback, useRef, useState } from "react";
// import { PrimaryInput } from "@/components/Comment/PrimaryInput";
import { Item } from "@/components/Comment/Item";
import { Comment, Drawer } from "@/components";
import { PrimaryInput } from "@/components/Comment/PrimaryInput";
// import { PrimaryInput } from "@/components/Comment/PrimaryInput";

// const inter = Inter({ subsets: ["latin"] });
// interface ICounter {
//   counter: number;
//   setCounter: () => void;
// }

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const vid = useCallback((x: any) => (x.volume = 0.06), []);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <Head>
        <title>U-Tube</title>
        <meta name="description" content="Mini U Tube" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <video
          width="500"
          muted
          // autoPlay={true}
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
        <button
          onClick={() => {
            setOpenDrawer((prev) => !prev);
            // inputRef.current?.focus()
          }}
        >
          Add Comment
        </button>
        <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
          <PrimaryInput inputRef={inputRef} />
          <Comment>
            {Array.from(Array(10), (_, i) => (
              <Item key={i} />
            ))}
          </Comment>
        </Drawer>
      </main>
    </>
  );
}
