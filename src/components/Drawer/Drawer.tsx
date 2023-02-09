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
        backgroundColor: `rgba(0 0 0 / ${
          props.draggable
            ? Math.min(1.02 - props.mousePos / 100, 0.5) //1.02 decrease the space
            : props.openDrawer
            ? ".5"
            : "0"
        })`,
        transition: !props.draggable ? "all .3s ease-out" : "",
      }}
      className={s.backdrop}
    ></div>
  );
}

export function Drawer({ children, openDrawer, setOpenDrawer }: DrawerProps) {
  const [draggable, setDraggable] = useState(false);
  const [mousePos, setMousePos] = useState(50);

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
      console.log(window.innerHeight);
      const y = Math.round((100 * e.clientY) / e.currentTarget.clientHeight);
      console.log(y);
      // const y =
      //   (100 * (window.innerHeight === 673 ? e.clientY - 50 : e.clientY)) /
      //   window.innerHeight;
      setMousePos(y);
      // console.log(1 - mousePos / 100);
      target.style.transform = `translateY(${Math.round(mousePos)}vh)`;
      // target.style.setProperty(
      //   "--mousepos",
      //   `translateY(${Math.round(mousePos)}vh)`
      // );
      target.style.transition = `transform .05s ease`;
    }
  }
  function dragStop() {
    setDraggable(false);
    const target = document.getElementsByClassName(
      "Drawer_container__MW58C"
    )[0] as HTMLDivElement;

    target.style.transition = `transform .3s ease-in-out`;

    // snapping
    if (mousePos > 59 && mousePos < 100) {
      target.style.transform = `translateY(100dvh)`;
      target.style.transition = `transform .3s ease-in-out`;
      setTimeout(() => {
        setOpenDrawer(false);
      }, 250);
      // target.addEventListener('transitionend', ()=>{
      //   if(draggable){
      //     setOpenDrawer(false);
      //   }
      // })
      // if (mousePos >90 && mousePos < 100) setOpenDrawer(false);
      setMousePos(50);
    } else if (mousePos < 59 || mousePos > 25) {
      target.style.transform = `translateY(50dvh)`;
      setMousePos(50);
    }
    if (mousePos < 25) {
      target.style.transform = `translateY(0dvh)`;
      setMousePos(0);
    }
    // target.addEventListener("ontransitionend",() => {
    //   setOpenDrawer(false)
    // });
  }

  useEffect(() => {
    function handleMouseUp() {
      setDraggable(false);
      console.log("up and mouse-up");
    }
    document.body.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("pointerUp", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("pointerUp", handleMouseUp);
    };
  }, []);
  const drawer = `${s.drawer} ${openDrawer ? s.open : ""}`;
  const fillingHeight = Math.max(Math.round(95 - mousePos), 45) + "dvh";
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
      onPointerUp={() => {
        if (openDrawer) {
          dragStop();
        }
      }}
      onPointerCancel={() => {
        if (openDrawer) {
          dragStop();
        }
      }}
      // onMouseUp={() => {
      //   if (openDrawer) {
      //     dragStop();
      //   }
      // }}
      // onTouchStart={(e) => {
      //   if (openDrawer) {
      //     dragStop(e);
      //   }
      // }}
      // onMouseMove={dragging}
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
        // onTransitionEnd={()=>{
        //   if(draggable === false && openDrawer === true){
        //     setOpenDrawer(false);
        //   }
        // }}
      >
        <div
          className={s.topBar}
          // onMouseDown={dragStart}
          onPointerDown={dragStart}
        >
          <div className={s.phill}></div>
        </div>
        {/* {730-673} */}
        {/* {window.innerHeight} */}
        {/* {self.innerHeight} */}
        <div
          className={s.content}
          style={{
            height: fillingHeight,
            // transition: !draggable ? "all .3s ease" : "unset",
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
