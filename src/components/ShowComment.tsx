import s from "@/styles/Home.module.css";

export function ShowComment({ setOpenDrawer , hashRoute }: any) {
    return (
        <div
            className={s.showComment}
            onClick={() => {
                window.location.hash = hashRoute;
                // setOpenDrawer((prev: any) => !prev);
                setOpenDrawer(true);

                // inputRef.current?.focus()
            }}
        >
            Comments 10
            <input type="text" readOnly placeholder="Add Comment" />
        </div>
    );
}
