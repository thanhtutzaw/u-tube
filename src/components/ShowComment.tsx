import s from "@/styles/Home.module.css";

export function ShowComment({ setOpenDrawer }: any) {
    return (
        <div
            className={s.showComment}
            onClick={() => {
                setOpenDrawer((prev: any) => !prev); // inputRef.current?.focus()
            }}
        >
            Comments 10
            <input type="text" readOnly placeholder="Add Comment" />
        </div>
    );
}
