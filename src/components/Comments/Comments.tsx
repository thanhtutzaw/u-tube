import { PropsWithChildren } from "react";
import { Comment } from "./Comment";

export default function Comments() {
    // export default function Comments({ children }: PropsWithChildren) {
    return (
        <ul>
            <Comment />
        </ul>
    );
}
