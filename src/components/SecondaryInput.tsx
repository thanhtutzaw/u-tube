import { count } from "console";
import { LegacyRef, MutableRefObject, ReactNode, useRef, useState } from "react";
import s from "@/styles/Home.module.css";
// type ICounter ={
//   // counter: number;
//   children:ReactNode , 
//   setCounter: React.Dispatch<React.SetStateAction<number>>;
// }
type InputProps = {
  handleInput: () => void;
  // ReplyInputRef: LegacyRef<HTMLInputElement>
  // ReplyInputRef: MutableRefObject<HTMLInputElement | undefined>;
};
export function SecondaryInput({ handleInput }:InputProps) {
  // const ReplyInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={s.secondaryInput}>
      <input autoFocus type="text" />
      {/* <input ref={ReplyInputRef} type="text" /> */}
      <button className={s.cancelBtn} onClick={handleInput}>
        Cancel
      </button>
      <button className={s.replyBtn}>Reply</button>
    </div>
  );
}
