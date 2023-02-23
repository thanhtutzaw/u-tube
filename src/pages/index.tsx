import { Drawer } from "@/components";
import { PrimaryInput } from "@/components/Comments/PrimaryInput";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useRef } from "react";
import { MoreVideo } from "../components/MoreVideo";
import { Player } from "../components/Player";
import { ShowComment } from "../components/ShowComment";
import Comments from "@/components/Comments/Comments";
import { useDrag } from "@/components/Drawer/useDrag";
export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const fullScreenRef = useRef<HTMLDivElement>(null);
    const hashRoute = "comments";
    const {
        openDrawer,
        setOpenDrawer,
        draggable,
        backdropRef,
        mousePos,
        ignoreClick,
        newPos,
    } = useDrag(containerRef, fullScreenRef, hashRoute);

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
                <Drawer
                    fullScreenRef={fullScreenRef}
                    containerRef={containerRef}
                    backdropRef={backdropRef}
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    draggable={draggable}
                    ignoreClick={ignoreClick}
                    mousePos={mousePos}
                    newPos={newPos}
                >
                    <PrimaryInput />
                    <Comments />
                </Drawer>
                <Player autoplay={false} />

                <div
                    style={{ pointerEvents: openDrawer ? "none" : "initial" }}
                    className={styles.topContent}
                >
                    <ShowComment
                        hashRoute={hashRoute}
                        setOpenDrawer={setOpenDrawer}
                    />
                    <MoreVideo />
                </div>
            </main>
        </>
    );
}
