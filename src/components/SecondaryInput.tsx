import { count } from "console";
import { ReactNode, useState } from "react";
import s from "@/styles/Home.module.css";
// type ICounter ={
//   // counter: number;
//   children:ReactNode , 
//   setCounter: React.Dispatch<React.SetStateAction<number>>;
// }
type InputProps = {
  handleInput : ()=> void
}
export function SecondaryInput({ handleInput  }:InputProps) {
  return (
    <div className={s.secondaryInput}>
      <input type="text" />
      <button className={s.cancelBtn} onClick={handleInput}>
        Cancel
      </button>
      <button className={s.replyBtn}>Reply</button>
    </div>
  );
}
