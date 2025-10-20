import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderAdmin from "./HeaderAdmin";

export default function LayoutAdmin() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HeaderAdmin setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} />
      <div className="p-4 sm:ml-64 mt-16">
        <Outlet />
      </div>
    </div>
  );
}
