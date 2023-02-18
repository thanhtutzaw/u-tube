import { Drawer } from "@/components";
import { PrimaryInput } from "@/components/Comments/PrimaryInput";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useState } from "react";
import { MoreVideo } from "../components/MoreVideo";
import { Player } from "../components/Player";
import { ShowComment } from "../components/ShowComment";
import Comments from "@/components/Comments/Comments";

export default function Home() {
    const [openDrawer, setOpenDrawer] = useState(false);
    // const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <>
            <Head>
                <title>U-Tube</title>
                <meta name="description" content="Mini U Tube" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
                    <PrimaryInput />
                    <Comments />
                </Drawer>
                <Player autoplay={false} />

                <div
                    style={{ pointerEvents: openDrawer ? "none" : "initial" }}
                    className={styles.topContent}
                >
                    <ShowComment setOpenDrawer={setOpenDrawer} />
                    <MoreVideo />
                </div>
            </main>
        </>
    );
}
