import Head from "next/head";
import styles from "@/styles/Home.module.css";
import drawer from "@/styles/Drawer.module.css";
import { useState } from "react";
import { PrimaryInput } from "@/components/PrimaryInput";
import { Comment } from "@/components/Comment";
import Drawer from "@/components/Drawer";

// const inter = Inter({ subsets: ["latin"] });
// interface ICounter {
//   counter: number;
//   setCounter: () => void;
// }

export default function Home() {
  const [openDrawer, setopenDrawer] = useState(false);
  const [mousePos, setMousePos] = useState(50);

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
        onClick={() => setopenDrawer((prev) => !prev)}
      >
        Open
      </button>

      <main className={styles.main}>
        <Drawer
          mousePos={mousePos}
          setMousePos={setMousePos}
          openDrawer={openDrawer}
          setopenDrawer={setopenDrawer}
        >

            
            {/* {draggable ? <p>yes</p> : <p>no</p>} */}
            <ul>
              {/* <PrimaryInput /> */}
              {Array.from(Array(10), (_, i) => (
                <Comment key={i} />
              ))}
            </ul>
          
        </Drawer>
      </main>
    </>
  );
}
