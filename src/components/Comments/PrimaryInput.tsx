import { useState } from "react";
import s from "@/styles/Home.module.css";

export function PrimaryInput() {
    const [OpenCommentAction, setOpenCommentAction] = useState(false);
    // useEffect(() => {
    //   inputRef.current?.focus()
    // }, [])

    function handleCommentAction() {
        setOpenCommentAction((prev) => !prev);
        // if (inputRef.current) {
        //   inputRef.current.value = "";
        // }
    }
    return (
        <div className={s.primaryInput}>
            <input
                // ref={inputRef}
                placeholder="Add comment"
                type="text"
                onFocus={() => {
                    setOpenCommentAction(true);
                }}
            />
            {OpenCommentAction && (
                <div className={s.commentActions}>
                    <button
                        className={s.cancelBtn}
                        onClick={handleCommentAction}
                    >
                        Cancel
                    </button>
                    <button className={s.commentBtn}>Comment</button>
                </div>
            )}
        </div>
    );
}
