import { useEffect, useState, useRef, useCallback } from "react";

export function useDrag(
    containerRef: React.RefObject<HTMLDivElement>,
    fullScreenRef: React.RefObject<HTMLDivElement>,
    hashRoute = "drawer"
) {
    const [draggable, setDraggable] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [ignoreClick, setignoreClick] = useState(false);
    const middleHeight = 0;
    const fullHeight = -26.7;
    const [mousePos, setMousePos] = useState(0);
    const [startY, setStartY] = useState(0);
    const [prev, setPrev] = useState(0);
    const [newPos, setnewPos] = useState(0);
    const [fullscreen, setfullscreen] = useState(false);
    const backdropRef = useRef<HTMLDivElement>(null);
    const backdrop = backdropRef.current;
    function resetStates(value: number) {
        setMousePos(value);
        setStartY(value);
        setPrev(value);
        setnewPos(value);
    }

    const getValue = useCallback(
        (e: PointerEvent) => {
            const vhValue = (100 * e.clientY) / window.innerHeight;
            const forFullScreen_Minus40vh = vhValue - 26.7;
            return Math.round(Math.max(forFullScreen_Minus40vh, fullHeight));
            // return Math.round((100 * e.clientY) / window.innerHeightfullHeight);
        },
        [fullHeight]
    );

    useEffect(() => {
        const container = containerRef?.current;
        const phill = fullScreenRef?.current;
        const main = document.getElementsByClassName(
            "Home_main__EtNt2"
        )[0] as HTMLDivElement;
        if (openDrawer) {
            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    setOpenDrawer(false);
                    window.location.hash = "#";
                }
            });
            window.location.hash === `#${hashRoute}`;
        } else {
            window.location.hash === "#";
        }
        window.onpopstate = async (e) => {
            console.log(e, openDrawer);
            if (openDrawer || window.location.hash === "#") {
                setOpenDrawer(false);
            } else if (window.location.hash === `#${hashRoute}`) {
                setOpenDrawer(true);
            }
        };
        // window.pos/

        function dragStart(e: PointerEvent) {
            setDraggable(true);
            setStartY(getValue(e));
            setMousePos(getValue(e));
        }
        function toggleFullscreen() {
            // alert("toggle");
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

                // container.style.transition = `transform .05s ease`;
                container.style.transition = `unset`;
                setignoreClick(true);
            } else {
                setignoreClick(false);
            }
        }

        function dragStop() {
            if (openDrawer && draggable) {
                if (mousePos === 0) return;
                setPrev(newPos);
                setDraggable(false);
                snappHandle();
            } else {
                resetStates(0);
            }
        }
        function snappHandle() {
            // if (!container || newPos === 0 || newPos === -26.7) return;
            if (!container) return;
            container.style.transition = `transform .3s ease-in-out`;

            const middle = newPos >= -12 && newPos <= 20;
            const close = newPos > 20;
            const full = newPos < -12;

            if (middle) {
                // if(newPos === 0) return
                middleSnap();
                // console.log("middleSnap");
                setfullscreen(false);
            } else if (close) {
                closeSnap(100);
            } else if (full) {
                setfullscreen(true);
                fullSnap(fullHeight);
            }
        }

        function fullSnap(y: number) {
            // console.log("fullSnapped");
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
            // console.log("closeSnapped");
            if (!container || !backdrop) return;
            container.style.transform = `translateY(${y}dvh)`;
            // setMousePos(middleHeight);
            resetStates(middleHeight);
            backdrop.style.opacity = "0";
            backdrop.style.transition = `opacity .3s ease-in-out`;
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

        container?.addEventListener("pointerdown", dragStart);
        window.addEventListener("pointermove", dragging);
        main.addEventListener("pointerup", dragStop);
        main.addEventListener("pointercancel", dragStop);
        window.addEventListener("pointerup", handleWindowEvent);
        phill?.addEventListener("click", toggleFullscreen);
        return () => {
            container?.removeEventListener("pointerdown", dragStart);
            window.removeEventListener("pointermove", dragging);
            main.removeEventListener("pointerup", dragStop);
            main.removeEventListener("pointercancel", dragStop);

            phill?.removeEventListener("click", toggleFullscreen);
            window.removeEventListener("pointerup", handleWindowEvent);
        };
    }, [
        setDraggable,
        setignoreClick,
        setMousePos,
        backdrop,
        containerRef,
        draggable,
        ignoreClick,
        fullHeight,
        fullscreen,
        getValue,
        mousePos,
        newPos,
        openDrawer,
        prev,
        startY,
        fullScreenRef,
        hashRoute,
    ]);
    return {
        openDrawer,
        setOpenDrawer,
        draggable,
        backdropRef,
        mousePos,
        ignoreClick,
        newPos,
        // openDrawer,
        // setOpenDrawer,
        // draggable,
        // backdropRef,
        // mousePos,
        // ignoreClick,
        // newPos,
        // setStartY,
        // setMousePos,
        // getValue,
    };
}
