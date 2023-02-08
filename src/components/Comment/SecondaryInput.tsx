import s from "@/styles/Home.module.css";
type InputProps = {
  handleInput: () => void;
};
export function SecondaryInput({ handleInput }: InputProps) {
  return (
    <div className={s.secondaryInput}>
      <input autoFocus type="text" />
      <button className={s.cancelBtn} onClick={handleInput}>
        Cancel
      </button>
      <button className={s.replyBtn}>Reply</button>
    </div>
  );
}
