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
      // onClick={(e)=>console.log(e.target)}
      onClick={() => props.setOpenDrawer(false)}
      style={{
        // backgroundColor: `rgba(0 0 0 / ${props.openDrawer ? ".5" : "0"})`,
        backgroundColor: `rgba(0 0 0 / ${
          props.draggable ? Math.min(1.02 - props.mousePos / 100, 0.5) : 0.5 //1.02 decrease the space
          // : props.openDrawer
          // ? ".5"
          // : "0"
        })`,
        backdropFilter: `blur(${
          Math.min(2 - (props.mousePos * 2) / 100, 1) * 3 + "px"
        })`,
        opacity: props.openDrawer ? "1" : "0",
        // transition: !props.draggable ? "all .3s ease-out width 0s" : "",
      }}
      className={s.backdrop}
    ></div>
  );
}

export function Drawer({ children, openDrawer, setOpenDrawer }: DrawerProps) {
  const [draggable, setDraggable] = useState(false);
  const [mousePos, setMousePos] = useState(50);
  const [fullscreen, setfullscreen] = useState(false);
  function fullscreenHandle() {
    setfullscreen((prev) => !prev);
    const target = document.getElementsByClassName(
      "Drawer_container__MW58C"
    )[0] as HTMLDivElement;
    // if (!fullscreen) {
    target.style.transform = `translateY(0dvh)`;
    setMousePos(0);

    if (fullscreen) {
      target.style.transform = `translateY(50dvh)`;
      setMousePos(50);
    }
    // }
    // if(mousePos !== 50){
    //   target.style.transform = `translateY(100dvh)`;
    //   setMousePos(100);
    // }
  }
  function dragStart(e: MouseEvent<HTMLDivElement>) {
    setDraggable(true);
  }
  function dragging(e: MouseEvent<HTMLDivElement>) {
    // console.log(e);
    if (draggable) {
      const target = document.getElementsByClassName(
        "Drawer_container__MW58C"
      )[0] as HTMLDivElement;
      const clientHeight = document.getElementsByClassName(
        "Home_main__EtNt2"
      )[0] as HTMLDivElement;
      // console.log(clientHeight.clientHeight);
      const y = Math.round((100 * e.clientY) / e.currentTarget.clientHeight);
      // const y = Math.round((100 * e.clientY) / e.currentTarget.clientHeight);
      // const y =
      //   (100 * (window.innerHeight === 673 ? e.clientY - 50 : e.clientY)) /
      //   window.innerHeight;
      setMousePos(y);
      // console.log(1 - mousePos / 100);
      target.style.transform = `translateY(${Math.round(mousePos)}dvh)`;

      //  This makes jumping issue when scrolling from content Bottom
      //(only solved in deskop still left in mobile) Not sure it happen when devtools open

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

    // snapping
    if (mousePos > 59 && mousePos < 100) {
      target.style.transform = `translateY(100dvh)`;
      setMousePos(50);
      backdrop.style.opacity = "0";
      backdrop.style.backdropFilter = "blur(0)";
      target.style.transition = `transform .3s ease-in-out`;
      // target.style.transition = `all .3s ease`;
      setTimeout(() => {
        setOpenDrawer(false);
      }, 250);
    } else if (mousePos < 59 || mousePos > 25) {
      target.style.transform = `translateY(50dvh)`;
      backdrop.style.opacity = "1";
      setMousePos(50);
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

  // useEffect(() => {
  //   function handleMouseUp() {
  //     setDraggable(false);
  //   }
  //   document.body.addEventListener("mouseup", handleMouseUp);
  //   document.body.addEventListener("pointerUp", handleMouseUp);
  //   return () => {
  //     window.removeEventListener("mouseup", handleMouseUp);
  //     window.removeEventListener("pointerUp", handleMouseUp);
  //   };
  // }, []);
  const drawer = `${s.drawer} ${openDrawer ? s.open : ""}`;
  // const fillingHeight = Math.max(Math.round(95 - mousePos), 45) + "dvh";
  return (
    <div
      draggable="false"
      style={{ userSelect: draggable ? "none" : "initial" }}
      className={drawer}
      onPointerUp={() => {
        if (openDrawer) {
          console.log("pointer up");
          dragStop();
        }
      }}
      onPointerCancel={() => {
        if (openDrawer) {
          console.log("pointer cancel");
          dragStop();
        }
      }}
      onPointerMove={dragging}
    >
      <Backdrop
        setOpenDrawer={setOpenDrawer}
        openDrawer={openDrawer}
        draggable={draggable}
        mousePos={mousePos}
      />
      <div
        style={{
          transform: openDrawer ? "translateY(50dvh)" : "translateY(100dvh)",
        }}
        className={`${s.container} ${openDrawer ? s.open : ""}`}
      >
        <div className={s.topBar} onPointerDown={dragStart}>
          <div onClick={fullscreenHandle} className={s.phill}></div>
        </div>
        {/* {730-673} */}
        {/* {window.innerHeight} */}
        {/* {self.innerHeight} */}
        <div
          className={s.content}
          style={{
            height: Math.max(Math.round(95 - mousePos), 45) + "dvh",
            // height:100* mousePos / 100 + "px",
            transition: !draggable ? "all .3s ease" : "initial",
            // transition: !draggable ? "all .05s ease" : "initial",
            // transition: !draggable ? "all .05s ease" : "unset",
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
