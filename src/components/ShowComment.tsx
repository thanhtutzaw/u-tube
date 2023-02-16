import styles from "@/styles/Home.module.css";

export function ShowComment({ setOpenDrawer }: any) {
    return (
        <div
            className={styles.showComment}
            onClick={() => {
                setOpenDrawer((prev: any) => !prev); // inputRef.current?.focus()
            }}
        >
            Add Comment
        </div>
    );
}
