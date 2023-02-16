import { Item } from "./Comment";

export default function Comments() {
    return (
        <ul>
            {Array.from(Array(10), (_, i) => (
                <Item key={i} />
            ))}
        </ul>
    );
}
