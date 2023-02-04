import { count } from "console";
import { ElementRef, ReactNode, useRef, useState } from "react";
import s from "@/styles/Home.module.css";
// type ICounter ={
//   // counter: number;
//   children:ReactNode ,
//   setCounter: React.Dispatch<React.SetStateAction<number>>;
// } className={s.replyBtn}

export function PrimaryInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [OpenCommentAction, setOpenCommentAction] = useState(false);
  function handleCommentAction() {
    setOpenCommentAction((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  return (
    <div className={s.primaryInput}>
      <input
        ref={inputRef}
        placeholder="Add comment"
        type="text"
        onFocus={() => {
          setOpenCommentAction(true);
        }}
      />
      {OpenCommentAction && (
        <div className={s.commentActions}>
          <button className={s.cancelBtn} onClick={handleCommentAction}>
            Cancel
          </button>
          <button className={s.commentBtn}>Comment</button>
        </div>
      )}
    </div>
  );
}
