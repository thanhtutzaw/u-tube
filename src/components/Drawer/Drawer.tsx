import {
  MouseEvent,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import s from "@/styles/Drawer.module.css";
import Close from "../../../assets/Close.jsx";
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
  backdropRef: Ref<HTMLDivElement>;
}
function Backdrop(props: BackdropProps) {
  return (
    <div
      ref={props.backdropRef}
      // onClick={() => props.setOpenDrawer(false)}
      style={{
        backgroundColor: `rgba(0 0 0 / ${
          props.draggable ? Math.min(0.6 - props.mousePos / 100, 0.5) : 0.5
          // props.draggable ? Math.min(1.02 - props.mousePos / 100, 0.5) : 0.5
          //1.02 decrease the space
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
  const fullHeight = -26.7;
  const [mousePos, setMousePos] = useState(0);
  const [startY, setStartY] = useState(0);
  const [prev, setPrev] = useState(0);
  const [newPos, setnewPos] = useState(0);
  const [fullscreen, setfullscreen] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const backdrop = backdropRef.current;
  const containerRef = useRef<HTMLDivElement>(null);
  const container = containerRef.current;
  // const [overflow, setoverflow] = useState("initial");

  function resetStates(value: number) {
    setMousePos(value);
    setStartY(value);
    setPrev(value);
    setnewPos(value);
  }

  function toggleFullscreen() {
    setfullscreen((prev) => !prev);
    const target = document.getElementsByClassName(
      "Drawer_container__MW58C"
    )[0] as HTMLDivElement;
    setDraggable(false);
    target.style.transform = `translateY(${fullHeight}dvh)`;
    resetStates(fullHeight);
    if (fullscreen) {
      target.style.transform = `translateY(${middleHeight}dvh)`;
      resetStates(middleHeight);
      // console.log("setMiddle");
      // target.style.transform = `translateY(${middleHeight}dvh)`;
    }
  }
  useEffect(() => {
    function handleMouseUp() {
      if (openDrawer && draggable) {
        setDraggable(false);
        if (newPos >= 15 && newPos <= 60) {
          closeSnap(60);
        } else if ((newPos > -20 && newPos < 0) || newPos <= 15) {
          // else if (mousePos < -20 || mousePos > -25) {
          middleSnap();
        }
        if (newPos <= -12) {
          fullSnap(fullHeight);
        }
      }
    }
    function fullSnap(y: number) {
      if (!container) return;
      container.style.transform = `translateY(${y}dvh)`;
      resetStates(y);
    }
    function middleSnap() {
      if (!container || !backdrop) return;
      container.style.transform = `translateY(${0}dvh)`;
      resetStates(0);
      backdrop.style.opacity = "1";
    }
    function closeSnap(y: number) {
      if (!container || !backdrop) return;
      container.style.transform = `translateY(${y}dvh)`;
      // setMousePos(middleHeight);
      resetStates(middleHeight);
      backdrop.style.opacity = "0";
      container.style.transition = `transform .3s ease-in-out`;
      setTimeout(() => {
        setOpenDrawer(false);
      }, 250);
    }
    window.addEventListener("pointerup", handleMouseUp);
    document.body.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("pointerup", handleMouseUp);
      document.body.removeEventListener("mouseup", handleMouseUp);
      // window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    backdrop,
    container,
    draggable,
    fullHeight,
    newPos,
    openDrawer,
    setOpenDrawer,
  ]);
  const getValue = useCallback(
    (e: MouseEvent | PointerEvent) => {
      const vhValue = (100 * e.clientY) / window.innerHeight;
      const forFullScreen_Minus40vh = vhValue - 26.7;
      return Math.round(Math.max(forFullScreen_Minus40vh, fullHeight));
      // return Math.round((100 * e.clientY) / window.innerHeightfullHeight);
    },
    [fullHeight]
  );
  function dragStart(e: MouseEvent) {
    setDraggable(true);
    setStartY(getValue(e));
    setMousePos(getValue(e));
  }
  useEffect(() => {
    const target = document.getElementsByClassName(
      "Home_main__EtNt2"
    )[0] as HTMLDivElement;
    // if(openDrawer){
    //   document.body.style.overflow = 'hidden'
    // }else{
    //   document.body.style.overflow = 'initial'

    // }

    function dragging(e: PointerEvent) {
      // const getElement_transform_Value_With_Minus = +container.style.transform.replace(/[^-?\d.]/g, "");
      if (draggable && container) {
        setMousePos(getValue(e));
        const dragFromMouseDownPosition = mousePos - startY;
        setnewPos(prev + dragFromMouseDownPosition);

        container.style.transform = `translateY(${Math.max(
          Math.min(newPos, 100),
          fullHeight
        )}dvh)`;
        // ⚠️This makes shaking issue when scrolling from content Bottom
        //(only solved in deskop still left in mobile) Not sure it happen when devtools open
        //Now it only happened when devtool is opened. Problem solved. ⚠️

        // target.style.transition = `transform .05s ease`;
        container.style.transition = `unset`;
        console.log(newPos);
      }
    }

    function dragStop(e: PointerEvent) {
      if (openDrawer && draggable) {
        if (mousePos === 0 || !container) return;
        setPrev(newPos);
        setDraggable(false);
        container.style.transition = `transform .3s ease-in-out`;
        // Snapping
        // console.log(newPos, mousePos);
        // if (mousePos >= 30 && mousePos <= 60) {
        if (newPos >= 15 && newPos <= 60) {
          closeSnap(60);
        } else if ((newPos > -20 && newPos < 0) || newPos <= 15) {
          // else if (mousePos < -20 || mousePos > -25) {
          middleSnap();
        }
        if (newPos <= -12) {
          fullSnap(fullHeight);
        }
      } else {
        resetStates(0);
      }

      function fullSnap(y: number) {
        if (!container) return;
        container.style.transform = `translateY(${y}dvh)`;
        resetStates(y);
      }
      function middleSnap() {
        if (!container || !backdrop) return;
        container.style.transform = `translateY(${0}dvh)`;
        resetStates(0);
        backdrop.style.opacity = "1";
      }
      function closeSnap(y: number) {
        if (!container || !backdrop) return;
        container.style.transform = `translateY(${y}dvh)`;
        // setMousePos(middleHeight);
        resetStates(middleHeight);
        backdrop.style.opacity = "0";
        container.style.transition = `transform .3s ease-in-out`;
        setTimeout(() => {
          setOpenDrawer(false);
        }, 250);
      }
    }
    openDrawer
      ? (target.style.touchAction = "none")
      : (target.style.touchAction = "auto");

    target.addEventListener("pointermove", dragging);
    target.addEventListener("pointerup", dragStop);
    target.addEventListener("pointercancel", dragStop);
    return () => {
      target.removeEventListener("pointermove", dragging);
      target.removeEventListener("pointerup", dragStop);
      target.removeEventListener("pointercancel", dragStop);
    };
  }, [
    backdrop,
    container,
    draggable,
    fullHeight,
    getValue,
    mousePos,
    newPos,
    openDrawer,
    prev,
    setOpenDrawer,
    startY,
  ]);

  const drawerClass = `${s.drawer} ${openDrawer ? s.open : ""}`;
  // const fillingHeight = Math.max(Math.round(95 - mousePos), 45) + "dvh";
  return (
    <div
      draggable="false"
      style={{ userSelect: draggable ? "none" : "initial" }}
      className={drawerClass}
    >
      <Backdrop
        backdropRef={backdropRef}
        setOpenDrawer={setOpenDrawer}
        openDrawer={openDrawer}
        draggable={draggable}
        mousePos={mousePos}
      />
      <div
        onPointerDown={dragStart}
        ref={containerRef}
        style={{
          transform: openDrawer
            ? `translateY(${middleHeight}dvh)`
            : `translateY(100dvh)`,
        }}
        className={`${s.container} ${openDrawer ? s.open : ""}`}
      >
        <div className={s.topBar}>
          <div onClick={toggleFullscreen} className={s.phill}></div>
          <div className={s.topBarContent}>
            <h3>Comments</h3>
            <button onClick={() => setOpenDrawer(false)}>
              <Close />
            </button>
          </div>
        </div>
        <div
          className={s.content}
          style={{
            height: 61 - newPos + "dvh",
            // overflow:draggable && newPos > 0?'initial' : 'auto',
            // overflow: overflow,

            // height: 61  + "dvh",
            // height: Math.round(middleHeight+fullHeight) + "dvh",

            // height: (95 - mousePos) + "dvh",
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
