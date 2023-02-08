import { PropsWithChildren } from "react";

// type DrawerProps = {
//   children: ReactNode;
// };
export function Comment({ children }: PropsWithChildren) {
  return (
    <ul>
      {children}
    </ul>
  );
}
