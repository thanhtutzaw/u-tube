import { MouseEvent, ReactNode, useEffect, useState } from "react";
import s from "@/styles/Drawer.module.css";
type DrawerProps = {
  children: ReactNode;
  openDrawer: boolean;
  setopenDrawer: Function;
};
export default function Drawer({
  children,
  openDrawer,
  setopenDrawer,
}: DrawerProps) {
  const [draggable, setDraggable] = useState(false);
  const [pos, setpos] = useState({ y: 0, top: 0 });
  const [mousePos, setMousePos] = useState(50);
  function dragStart(e: MouseEvent<HTMLDivElement>) {
    const target = e.currentTarget;
    setDraggable(true);
    console.log("start");
    setpos({
      ...pos,
      y: e.clientY,
      top: target.scrollTop,
    });
    // console.log(e.currentTarget.scrollTop())
    // console.log(window.scrollY)
    // target.style.transform = "translateY(0vh)";
  }
  function dragging(e: MouseEvent<HTMLDivElement>) {
    // const target = e.currentTarget;
    // console.log("fd"+e.clientY);
    if (draggable) {
      const target = document.getElementsByClassName(
        "Drawer_container__MW58C"
      )[0] as HTMLDivElement;

      // console.log(e.currentTarget)
      // console.log(pos.top, pos.y);
      // console.log(window.innerHeight * e.clientY / 100 + 'vh')
      // console.log( 100* e.clientY/ window.innerHeight)
      // const y = (100 * mousePos) / window.innerHeight;

      const y = (100 * e.clientY) / window.innerHeight;
      setMousePos(y);
      // 0
      // 50 if
      // 100

      target.style.transform = `translateY(${Math.round(mousePos)}vh)`;
      target.style.transition = `initial`;
      // console.log((mousePos % 100).toFixed(1));

      // console.log(y)
      // target.style.transform = `translateY(${Math.round(y)}vh)`;

      // console.log(e.clientY % 100);

      // target.style.transform = `translateY(${100*e.clientY / window.innerHeight}vh)`;
      // const y = e.clientY % 100;
      // console.log(target.style.transform)
      // const matrix = new DOMMatrixReadOnly(target.style.transform);
      // const newY = target.style.transform.replace(/[^\d.]/g, "");
      // console.log("main"+mousePos);

      // if (y > 50 && y < 70) {
      //   target.style.transform = `translateY(50vh)`;
      // }
      // if (y < 50 && y > 25) {
      //   target.style.transform = `translateY(50vh)`;
      // }
      // if (y < 25) {
      //   // target.style.transform = `translateY(0vh)`;
      // }
      // if (y >= 70) {
      //   target.style.transform = `translateY(100vh)`;
      // }
      // target.style.transform = `translateY(${e.clientY % 100}vh)`;

      // if (y < 75 && y > 50) {
      //   // target.style.transform = `translateY(50vh)`;
      // } else if (y < 25) {
      //   // target.style.transform = `translateY(100vh)`;
      // }else{
      //   // target.style.transform = `translateY(50vh)`;

      // }
      // if(y < 50){

      //   // target.style.transform = `translateY(${e.clientY % 100}vh)`;
      //   target.style.transform = `translateY(50vh)`;
      // }else{

      //   target.style.transform = `translateY(0vh)`;
      // }
      // target.style.transform = `translateY(${e.clientY / 100 }vh)`;
      // console.log(target.);
    }
    // console.log(e.currentTarget.scrollTop())
    // console.log(window.scrollY)
    // target.style.transform = "translateY(0vh)";
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
      setopenDrawer(false);
    } else if (mousePos < 50 || mousePos < 59) {
      target.style.transform = `translateY(50vh)`;
    }
    setMousePos(50);
    // if(!openDrawer){
    //   target.style.re

    // }
    // console.log(e.currentTarget.scrollTop())
    // console.log(window.scrollY)
    // target.style.transform = "translateY(0vh)";
  }

  useEffect(() => {
    // console.log(draggable)
    function handleMouseUp() {
      // console.log("mouseup");
      setDraggable(false);
    }
    document.body.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggable]);

  return (
    <div
      style={{ userSelect: draggable ? "none" : "initial" }}
      className={`${s.backDrop} ${openDrawer ? s.open : ""}`}
      // className={`${openDrawer ? s.open : ""}`}
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
      {/* <div></div> */}
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
        className={s.other}
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
        {children}
      </div>
    </div>
  );
}
