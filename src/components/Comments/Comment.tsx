import { useState } from "react";
import { SecondaryInput } from "./SecondaryInput";
import s from "@/styles/Home.module.css";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

export function Item() {
    const [counter, setCounter] = useState<number>(0);
    const [openInput, setOpenInput] = useState(false);
    function handleInput() {
        setOpenInput((prev) => !prev);
    }
    // function focusInput(){

    // }

    return (
        <li>
            <div className={s.card}>
                <button
                    className={s.likeBtn}
                    onClick={() => setCounter((prev) => prev + 10)}
                >
                    <FiThumbsUp />
                </button>
                <h2>{counter}</h2>
                <button
                    className={s.dislikeBtn}
                    onClick={() => setCounter((prev) => prev - 10)}
                >
                    <FiThumbsDown />
                </button>
                <button className={s.replyBtn} onClick={handleInput}>
                    Reply
                </button>
            </div>
            {openInput && <SecondaryInput handleInput={handleInput} />}
        </li>
    );
}
