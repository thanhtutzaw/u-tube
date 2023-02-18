import {
    MouseEvent,
    ReactNode,
    Ref,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import Backdrop from "./Backdrop";
import Close from "../../../assets/Close.jsx";
import s from "@/styles/Drawer.module.css";
import drawer from "@/styles/Drawer.module.css";
// import drawer from "@/styles/Drawer.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
type DrawerProps = {
    children: ReactNode;
    openDrawer: boolean;
    setOpenDrawer: Function;
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
}: DrawerProps) => {
    const [draggable, setDraggable] = useState(false);
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
    const drawerRef = useRef<HTMLDivElement>(null);
    // const [overflow, setoverflow] = useState("initial");

    function resetStates(value: number) {
        setMousePos(value);
        setStartY(value);
        setPrev(value);
        setnewPos(value);
    }

    function toggleFullscreen() {
        setfullscreen((prev) => !prev);
        if (!container) return;
        setDraggable(false);
        container.style.transform = `translateY(${fullHeight}dvh)`;
        resetStates(fullHeight);
        if (fullscreen) {
            container.style.transform = `translateY(${middleHeight}dvh)`;
            resetStates(middleHeight);
        }
    }
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
        const main = document.getElementsByClassName(
            "Home_main__EtNt2"
        )[0] as HTMLDivElement;
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
            }
        }

        function dragStop(e: PointerEvent) {
            // if(openDrawer === false && container){
            //     container.style.transform = `translateY(100dvh)`
            // }
            if (openDrawer && draggable) {
                if (mousePos === 0) return;
                setPrev(newPos);
                setDraggable(false);
                snappHandle();

                // console.log("snaphandle" , openDrawer , draggable)
            } else {
                resetStates(0);
                console.log("close");
            }
        }
        function snappHandle() {
            if (!container || newPos === 0 || newPos === -26.7) return;
            container.style.transition = `transform .3s ease-in-out`;

            const middle = newPos >= -12 && newPos <= 20;
            const close = newPos > 20;
            const full = newPos < -12;

            if (middle) {
                middleSnap();
            } else if (close) {
                closeSnap(100);
            } else if (full) {
                fullSnap(fullHeight);
            }
        }

        function fullSnap(y: number) {
            console.log("fullSnapped");
            if (!container) return;
            container.style.transform = `translateY(${y}dvh)`;
            resetStates(y);
        }
        function middleSnap() {
            console.log("middleSnapped");
            if (!container || !backdrop) return;
            container.style.transform = `translateY(${0}dvh)`;
            resetStates(0);
            backdrop.style.opacity = "1";
        }
        function closeSnap(y: number) {
            console.log("closeSnapped");
            if (!container || !backdrop) return;
            container.style.transform = `translateY(${y}dvh)`;
            // setMousePos(middleHeight);
            resetStates(middleHeight);
            backdrop.style.opacity = "0";
            container.style.transition = `transform .3s ease-in-out`;
            // setTimeout(() => {
            setOpenDrawer(false);
            // }, 250);
        }

        openDrawer
            ? (main.style.touchAction = "none")
            : (main.style.touchAction = "auto");
        function handleWindowEvent() {
            if (openDrawer && draggable) {
                setDraggable(false);
                snappHandle();
            }
        }

        window.addEventListener("pointermove", dragging);
        main.addEventListener("pointerup", dragStop);
        main.addEventListener("pointercancel", dragStop);
        window.addEventListener("pointerup", handleWindowEvent);

        return () => {
            window.removeEventListener("pointermove", dragging);
            main.removeEventListener("pointerup", dragStop);
            main.removeEventListener("pointercancel", dragStop);

            window.removeEventListener("pointerup", handleWindowEvent);
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

    // const drawerClass = `${s.drawer} ${openDrawer ? s.open : ""}`;
    // const fillingHeight = Math.max(Math.round(95 - mousePos), 45) + "dvh";
    return (
        <div
            ref={drawerRef}
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
                timeout={300}
                unmountOnExit
                nodeRef={containerRef}
            >
                <div
                    onPointerDown={dragStart}
                    ref={containerRef}
                    // style={{transform:openDrawer ? "" : "translateY(100dvh)"}}
                    // style={{
                    //     transform: openDrawer
                    //         ? ""
                    //         : "translateY(100dvh)",
                    // }}
                    // style={{
                    // transform: openDrawer
                    //     ? `translateY(${middleHeight}dvh)`
                    //     : `translateY(100dvh)`,
                    // transform: openDrawer ? `` : `translateY(100dvh)`,
                    // }}
                    className={s.container}
                    // className={`${s.container} ${openDrawer ? s.open : ""}`}
                >
                    {/* <div className={s.topBar}> */}
                    <div className={s.topBarContent}>
                        <div
                            onClick={toggleFullscreen}
                            className={s.phill}
                        ></div>
                        <h3>Comments</h3>
                        <button
                            onClick={() => {
                                setOpenDrawer(false);
                                // if (container) {
                                //     container.style.transform = `translateY(100dvh)`;
                                // }
                                // container?.style.transform = "translate
                            }}
                        >
                            <Close />
                        </button>
                    </div>
                    {/* </div> */}
                    <div
                        // onPointerDown={(e)=>{
                        //     // console.log("down")
                        //     e.stopPropagation();
                        //     e.preventDefault();
                        //     e.currentTarget.style.touchAction='none'
                        // }}
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
