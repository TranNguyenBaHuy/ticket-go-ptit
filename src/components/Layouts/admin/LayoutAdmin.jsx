import { useState } from "react";
import SideBar from "./SideBar";
import HeaderAdmin from "./HeaderAdmin";

const LayoutAdmin = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HeaderAdmin setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} />
      <div className="p-4 sm:ml-64 mt-16">{children}</div>
    </div>
  );
};

export default LayoutAdmin;
