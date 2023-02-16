import s from "@/styles/Drawer.module.css";
import { BackdropProps } from "./Drawer.jsx";

export default function Backdrop(props: BackdropProps) {
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
