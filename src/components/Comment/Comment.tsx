import { PropsWithChildren } from "react";

export function Comment({ children }: PropsWithChildren) {
  return (
    <ul>
      {children}
    </ul>
  );
}
