import Head from "next/head";
import styles from "@/styles/Home.module.css";
// import drawer from "@/styles/Drawer.module.css";
import { useState } from "react";
// import { PrimaryInput } from "@/components/Comment/PrimaryInput";
import { Item } from "@/components/Comment/Item";
import { Comment, Drawer } from "@/components";
// import { PrimaryInput } from "@/components/Comment/PrimaryInput";

// const inter = Inter({ subsets: ["latin"] });
// interface ICounter {
//   counter: number;
//   setCounter: () => void;
// }

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Head>
        <title>U-Tube</title>
        <meta name="description" content="Mini U Tube" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        style={{ padding: "1rem", zIndex: "300", position: "fixed" }}
        onClick={() => setOpenDrawer((prev) => !prev)}
      >
        Open
      </button>

      <main className={styles.main}>
        <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
          {/* <PrimaryInput /> */}
          {/* <PrimaryInput /> */}

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
