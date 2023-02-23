import { ReactNode, Ref, useRef } from "react";
import Backdrop from "./Backdrop";
import Close from "../../../assets/Close.jsx";
import s from "@/styles/Drawer.module.css";
import { CSSTransition } from "react-transition-group";
// import { useDrag } from "./useDrag";
type DrawerProps = {
    children: ReactNode;
    openDrawer: boolean;
    draggable: boolean;
    ignoreClick: boolean;
    setOpenDrawer: Function;
    backdropRef: React.RefObject<HTMLDivElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    fullScreenRef: React.RefObject<HTMLDivElement>;
    mousePos: number;
    newPos: number;
};
export interface BackdropProps {
    draggable: boolean;
    mousePos: number;
    openDrawer: boolean;
    setOpenDrawer: Function;
    backdropRef: Ref<HTMLDivElement>;
}
export const Drawer = ({
    children,
    openDrawer,
    setOpenDrawer,
    containerRef,
    fullScreenRef,
    draggable,
    backdropRef,
    mousePos,
    ignoreClick,
    newPos,
}: DrawerProps) => {
    // const [overflow, setoverflow] = useState("initial");

    // const drawerClass = `${s.drawer} ${openDrawer ? s.open : ""}`;
    // const fillingHeight = Math.max(Math.round(95 - mousePos), 45) + "dvh";
    return (
        <div
            // draggable="false"
            className={s.drawer}
            style={{
                pointerEvents: openDrawer ? "auto" : "none",
                userSelect: draggable ? "none" : "initial",
            }}
        >
            <Backdrop
                backdropRef={backdropRef}
                setOpenDrawer={setOpenDrawer}
                openDrawer={openDrawer}
                draggable={draggable}
                mousePos={mousePos}
            />

            <CSSTransition
                classNames={s}
                in={openDrawer}
                timeout={350}
                unmountOnExit
                nodeRef={containerRef}
            >
                <div
                    // onPointerDown={(e: PointerEvent) => {
                    //     dragStart(e);
                    // }}
                    // onPointerDown={(event) => dragStart}
                    ref={containerRef}
                    // style={{
                    //     transform: openDrawer
                    //         ? "translateY(0dvh)"
                    //         : "translateY(100dvh)",
                    // }}
                    style={{
                        transform: openDrawer ? "" : "translateY(100dvh)",
                    }}
                    // style={{
                    // transform: openDrawer
                    //     ? `translateY(${middleHeight}dvh)`
                    //     : `translateY(100dvh)`,
                    // transform: openDrawer ? `` : `translateY(100dvh)`,
                    // }}
                    className={s.container}
                    // className={`${s.container} ${openDrawer ? s.open : ""}`}
                >
                    <div className={s.topBarContent}>
                        <div
                            ref={fullScreenRef}
                            // onClick={toggleFullscreen}
                            className={`${s.phill} ${
                                ignoreClick ? s.ignoreClick : ""
                            }`}
                        ></div>
                        <h3>Comments</h3>
                        <button
                            className={ignoreClick ? s.ignoreClick : ""}
                            onClick={() => {
                                setOpenDrawer(false);
                                // window.location.href = "";
                                window.location.hash = "";
                            }}
                        >
                            <Close />
                        </button>
                    </div>
                    <div
                        className={s.content}
                        style={{
                            height: 61 - newPos + "dvh",
                            // overflow:draggable && newPos > 0?'initial' : 'auto',
                            // overflow: overflow,

                            // height: 61  + "dvh",

                            // height: (95 - mousePos) + "dvh",
                            // height: Math.max(Math.round(95 - mousePos), 45) + "dvh",
                            // height:100* mousePos / 100 + "px",
                            transition: !draggable ? "all .3s ease" : "initial",
                        }}
                    >
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};
