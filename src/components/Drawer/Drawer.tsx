import { MouseEvent, ReactNode, useEffect, useState } from "react";
import s from "@/styles/Drawer.module.css";
type DrawerProps = {
  children: ReactNode;
  openDrawer: boolean;
  setOpenDrawer: Function;
};
interface BackdropProps {
  draggable: boolean;
  mousePos: number;
  openDrawer: boolean;
  setOpenDrawer: Function;
}
function Backdrop(props: BackdropProps) {
  return (
    <div
      // onClick={() => props.setOpenDrawer(false)}
      style={{
        backgroundColor: `rgba(0 0 0 / ${
          props.draggable ? Math.min(1.02 - props.mousePos / 100, 0.5) : 0.5 //1.02 decrease the space
          // : props.openDrawer
          // ? ".5"
          // : "0"
        })`,
        // backdropFilter: `blur(${
        //   Math.min(1.5 - (props.mousePos * 2) / 100, 1) * 3 + "px"
        // })`,
        opacity: props.openDrawer ? "1" : "0",
      }}
      className={s.backdrop}
    ></div>
  );
}

export function Drawer({ children, openDrawer, setOpenDrawer }: DrawerProps) {
  const [draggable, setDraggable] = useState(false);
  // const middleHeight = 40;
  const middleHeight = 0;
  const [mousePos, setMousePos] = useState(middleHeight);
  const [fullscreen, setfullscreen] = useState(false);
  function toggleFullscreen() {
    setfullscreen((prev) => !prev);
    console.log("toggle f ull screen");
    const target = document.getElementsByClassName(
      "Drawer_container__MW58C"
    )[0] as HTMLDivElement;
    target.style.transform = `translateY(0dvh)`;
    setMousePos(0);

    if (fullscreen) {
      target.style.transform = `translateY(${middleHeight}dvh)`;
      setMousePos(middleHeight);
    }
  }
  function dragStart() {
    setDraggable(true);
    console.log("drag start");
  }
  function dragging(e: MouseEvent<HTMLDivElement>) {
    if (draggable) {
      const target = document.getElementsByClassName(
        "Drawer_container__MW58C"
      )[0] as HTMLDivElement;
      // const clientHeight = document.getElementsByClassName(
      //   "Home_main__EtNt2"
      // )[0] as HTMLDivElement;
      const y = Math.round((100 * e.clientY) / e.currentTarget.clientHeight);
      // const y =
      //   (100 * (window.innerHeight === 673 ? e.clientY - 50 : e.clientY)) /
      //   window.innerHeight;
      setMousePos(y);
      target.style.transform = `translateY(${Math.round(mousePos)}dvh)`;

      // ⚠️This makes jumping issue when scrolling from content Bottom
      //(only solved in deskop still left in mobile) Not sure it happen when devtools open
      //Now it only happed when devtools opend. Problem solved. ⚠️

      // target.style.transition = `transform .05s ease`;
      target.style.transition = `unset`;
    }
  }
  function dragStop() {
    setDraggable(false);
    const target = document.getElementsByClassName(
      "Drawer_container__MW58C"
    )[0] as HTMLDivElement;
    const backdrop = document.getElementsByClassName(
      "Drawer_backdrop__C9y4o"
    )[0] as HTMLDivElement;

    target.style.transition = `transform .3s ease-in-out`;
    // target.style.transition = `all .3s ease`;

    // Snapping
    if (mousePos > 49 && mousePos < 100) {
      target.style.transform = `translateY(100dvh)`;
      setMousePos(middleHeight);
      backdrop.style.opacity = "0";
      // backdrop.style.backdropFilter = "blur(0)";
      target.style.transition = `transform .3s ease-in-out`;
      setTimeout(() => {
        setOpenDrawer(false);
      }, 250);
    } else if (mousePos < 49 || mousePos > 25) {
      target.style.transform = `translateY(${middleHeight}dvh)`;
      backdrop.style.opacity = "1";
      setMousePos(middleHeight);
    }
    if (mousePos < 25) {
      target.style.transform = `translateY(0dvh)`;
      setMousePos(0);
    }
  }

  useEffect(() => {
    function handleMouseUp() {
      setDraggable(false);
    }
    document.body.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggable]);

  useEffect(() => {
    const target = document.getElementsByClassName(
      "Home_main__EtNt2"
    )[0] as HTMLDivElement;

    function dragging(e: MouseEvent<HTMLDivElement>) {
      if (draggable) {
        // const clientHeight = document.getElementsByClassName(
        //   "Home_main__EtNt2"
        // )[0] as HTMLDivElement;
        const container = document.getElementsByClassName(
          "Drawer_container__MW58C"
        )[0] as HTMLDivElement;
        // const y = Math.round((100 * e.clientY) / e.currentTarget.clientHeight);
        // const y = Math.round((100 * e.clientY) / target.clientHeight);
        const y = Math.round((100 * e.clientY) / window.innerHeight);
        // const y =
        //   (100 * (window.innerHeight === 673 ? e.clientY - 50 : e.clientY)) /
        //   window.innerHeight;
        setMousePos(y);
        container.style.transform = `translateY(${Math.max(
          Math.round(mousePos),
          0
        )}dvh)`;

        // ⚠️This makes jumping issue when scrolling from content Bottom
        //(only solved in deskop still left in mobile) Not sure it happen when devtools open
        //Now it only happed when devtools opend. Problem solved. ⚠️

        // target.style.transition = `transform .05s ease`;
        container.style.transition = `unset`;
      }
    }

    function dragStop() {
      if (openDrawer && draggable) {
        setDraggable(false);
        console.log("dragStop");
        const target = document.getElementsByClassName(
          "Drawer_container__MW58C"
        )[0] as HTMLDivElement;
        const backdrop = document.getElementsByClassName(
          "Drawer_backdrop__C9y4o"
        )[0] as HTMLDivElement;

        target.style.transition = `transform .3s ease-in-out`;
        // target.style.transition = `all .3s ease`;

        // Snapping
        if (mousePos > 49 && mousePos < 100) {
          target.style.transform = `translateY(100dvh)`;
          setMousePos(middleHeight);
          backdrop.style.opacity = "0";
          // backdrop.style.backdropFilter = "blur(0)";
          target.style.transition = `transform .3s ease-in-out`;
          setTimeout(() => {
            setOpenDrawer(false);
          }, 250);
        } else if (mousePos < 49 || mousePos > 25) {
          target.style.transform = `translateY(${middleHeight}dvh)`;
          backdrop.style.opacity = "1";
          setMousePos(middleHeight);
        }
        if (mousePos < 25) {
          target.style.transform = `translateY(0dvh)`;
          setMousePos(0);
        }
      }
    }

    target.addEventListener("pointermove", dragging);
    target.addEventListener("pointerup", dragStop);
    target.addEventListener("pointercancel", () => {
      if (openDrawer) {
        dragStop();
        console.log("cancle");
      }
    });
    return () => {
      target.removeEventListener("pointermove", dragging);
      target.removeEventListener("pointerup", dragStop);
      target.removeEventListener("pointercancel", () => {
        if (openDrawer) {
          dragStop();
        }
      });
    };
  }, [draggable, mousePos, openDrawer, setOpenDrawer]);

  const drawerClass = `${s.drawer} ${openDrawer ? s.open : ""}`;
  // const fillingHeight = Math.max(Math.round(95 - mousePos), 45) + "dvh";
  return (
    <div
      draggable="false"
      style={{ userSelect: draggable ? "none" : "initial" }}
      className={drawerClass}
      // onPointerUp={() => {
      //   if (openDrawer) {
      //     dragStop();
      //   }
      // }}
      // onPointerCancel={() => {
      //   if (openDrawer) {
      //     dragStop();
      //   }
      // }}
      // onPointerMove={dragging}
    >
      <Backdrop
        setOpenDrawer={setOpenDrawer}
        openDrawer={openDrawer}
        draggable={draggable}
        mousePos={mousePos}
      />
      <div
        style={{
          transform: openDrawer
            ? `translateY(${middleHeight}dvh)`
            : `translateY(100dvh)`,
        }}
        className={`${s.container} ${openDrawer ? s.open : ""}`}
      >
        <div className={s.topBar} onPointerDown={dragStart}>
          <div onClick={toggleFullscreen} className={s.phill}></div>
          <div className={s.topBarContent}>
            <h3>Comments</h3>
            <button onClick={() => setOpenDrawer(false)}>Close</button>
            {/* <button
              style={{ display: "flex" }}
              onClick={() => setOpenDrawer(false)}
            >
              Close
            </button>
            <button
              style={{ display: "flex" }}
              onClick={() => setOpenDrawer(false)}
            >
              Close
            </button>
            <button
              style={{ display: "flex" }}
              onClick={() => setOpenDrawer(false)}
            >
              Close
            </button> */}
          </div>
        </div>
        <div
          className={s.content}
          style={{
            height: Math.round(90 - mousePos) + "dvh",
            // height: Math.max(Math.round(95 - mousePos), 45) + "dvh",
            // height:100* mousePos / 100 + "px",
            transition: !draggable ? "all .3s ease" : "initial",
          }}
        >
          {children}
        </div>
        {/* {React.cloneElement(children, { draggable })} */}
        {/* {React.Children.map(children, (child) => {
          return React.cloneElement(child, { draggable });
        })} */}
      </div>
    </div>
  );
}
