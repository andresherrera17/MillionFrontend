import { Outlet } from "react-router-dom";
import { Sidebar } from "../_feacture/Home/Sidebar";

export default function MainLayout() {
  return (
    <div className="relative lg:flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
