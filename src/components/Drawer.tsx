import { ReactNode } from "react";
import s from "@/styles/Drawer.module.css";
type DrawerProps = {
  children: ReactNode;
  openDrawer:boolean
};
export default function Drawer({ children, openDrawer }: DrawerProps) {
  return (
    <div className={`${s.drawer} ${openDrawer ? s.open : ""}`}>
      <div className={`${s.drawerContainer} ${openDrawer ? s.open : ""}`}>
        <div className={s.topBar}>
          <div className={s.phill}></div>
        </div>
        {children}
      </div>
    </div>
  );
}
