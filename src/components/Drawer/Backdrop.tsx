import s from "@/styles/Drawer.module.css";
import { BackdropProps } from "./Drawer.jsx";
import { CSSTransition } from "react-transition-group";

export default function Backdrop(props: BackdropProps) {
    // const backdropClass = `${s.backdrop} ${props.openDrawer ? s.open : ""}`;
    return (
        <CSSTransition
            classNames={s}
            in={props.openDrawer}
            timeout={200}
            unmountOnExit
            nodeRef={props.backdropRef}
        >
            <div
                className={s.backdrop}
                onClick={() => {
                    props.setOpenDrawer(false);
                }}
                ref={props.backdropRef}
                style={{
                    backgroundColor: `rgba(0 0 0 / ${
                        props.draggable
                            ? Math.min(0.6 - props.mousePos / 100, 0.5)
                            : // : props.openDrawer ? 0.5 : 0
                              0.5
                        // props.draggable ? Math.min(1.02 - props.mousePos / 100, 0.5) : 0.5
                        //1.02 decrease the space
                    })`,
                    // backdropFilter: `blur(${
                    //   Math.min(1.5 - (props.mousePos * 2) / 100, 1) * 3 + "px"
                    // })`,

                    // opacity: props.openDrawer ? "1" : "0",
                    // userSelect: props.openDrawer ? "initial" : "unset",
                }}
            ></div>
        </CSSTransition>
    );
}
