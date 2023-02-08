import React, {
  MouseEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import s from "@/styles/Drawer.module.css";
type DrawerProps = {
  // mousePos: number;
  // setMousePos: Function;
  // children: ReactElement;
  children: ReactNode;
  openDrawer: boolean;
  setOpenDrawer: Function;
};
export function Drawer({ children, openDrawer, setOpenDrawer }: DrawerProps) {
  const [draggable, setDraggable] = useState(false);
  const [mousePos, setMousePos] = useState(50);
  // const open = "";
  // const close = "";
  function dragStart(e: MouseEvent<HTMLDivElement>) {
    const target = e.currentTarget;
    setDraggable(true);
    console.log("start");
    // setpos({
    //   ...pos,
    //   y: e.clientY,
    //   top: target.scrollTop,
    // });
  }
  function dragging(e: MouseEvent<HTMLDivElement>) {
    if (draggable) {
      const target = document.getElementsByClassName(
        "Drawer_container__MW58C"
      )[0] as HTMLDivElement;

      // console.log(window.innerHeight * e.clientY / 100 + 'vh')
      // console.log( 100* e.clientY/ window.innerHeight)
      // const y = (100 * mousePos) / window.innerHeight;

      const y = (100 * e.clientY) / window.innerHeight;
      setMousePos(y);
      console.log(1 - mousePos / 100);

      // target.styl
      target.style.transform = `translateY(${Math.round(mousePos)}vh)`;
      target.style.transition = `unset`;
    }
  }
  function dragStop(e: MouseEvent<HTMLDivElement>) {
    // const target = e.currentTarget;
    console.log("stop");
    setDraggable(false);
    const target = document.getElementsByClassName(
      "Drawer_container__MW58C"
    )[0] as HTMLDivElement;

    target.style.transition = `all .3s ease`;

    if (mousePos > 59 && mousePos < 100) {
      target.style.transform = `translateY(100vh)`;
      setOpenDrawer(false);
      setMousePos(50);
    } else if (mousePos < 59 || mousePos > 25) {
      target.style.transform = `translateY(50vh)`;
      setMousePos(50);
    }
    if (mousePos < 25) {
      target.style.transform = `translateY(0vh)`;
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
  const drawer = `${s.drawer} ${openDrawer ? s.open : ""}`;
  // const fillingHeight = ;
  return (
    <div
    draggable="false"
      style={{ userSelect: draggable ? "none" : "initial" }}
      className={drawer}
      // onMouseMove={(e) => {
      //   // console.log(e.clientY);
      //   if (draggable) {
      //     // setMousePos(e.clientY);
      //     // console.log("main"+e.clientY)
      //   }
      // }}
      onMouseUp={(e) => {
        if (openDrawer) {
          dragStop(e);
        }
      }}
      // onTouchStart={(e) => {
      //   if (openDrawer) {
      //     dragStop(e);
      //   }
      // }}
      onMouseMove={dragging}
      // onTouchMove={dragging}
    >
      <div
        style={{
          backgroundColor: `rgba(0 0 0 / ${
            draggable
              ? Math.min(1 - mousePos / 100, 0.5)
              : openDrawer
              ? ".5"
              : "0"
          })`,
          transition: !draggable ? "all .3s ease-out" : "",
        }}
        className={s.backdrop}
      ></div>
      <div
        style={{
          transform: openDrawer ? "translateY(50vh)" : "translateY(100vh)",
        }}
        className={`${s.container} ${openDrawer ? s.open : ""}`}
      >
        <div className={s.topBar} onMouseDown={dragStart}>
          <div className={s.phill}></div>
        </div>
        <div
          className={s.content}
          style={{
            height: Math.max(Math.round(95 - mousePos), 45) + "vh",
            transition: !draggable ? "all .3s ease" : "initial",
            // transition: !draggable ? "all .3s ease" : "initial",
          }}
        >
          {/* {React.cloneElement(children, { draggable })} */}
          {children}
        </div>
        {/* {React.Children.map(children, (child) => {
          return React.cloneElement(child, { draggable });
        })} */}
      </div>
    </div>
  );
}
