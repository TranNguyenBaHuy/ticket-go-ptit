import {
  faChartPie,
  faUsers,
  faCartShopping,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem";

export default function SideBar({ open, setOpen }) {
  const handleOverlayClick = () => setOpen(false);
  return (
    <>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform
    ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-17 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col">
          <ul className="space-y-2 font-medium flex-1">
            <SidebarItem to="/admin" icon={faChartPie} label="Dashboard" />
            <SidebarItem to="/admin/users" icon={faUsers} label="Users" />
            <SidebarItem
              to="/admin/events"
              icon={faCartShopping}
              label="Events"
            />
            <SidebarItem to="/admin/orders" icon={faBox} label="Order" />
          </ul>
        </div>
      </aside>
      {open && (
        <div
          className="fixed top-16 inset-x-0 bottom-0 bg-black/40 backdrop-blur-sm z-30 sm:hidden"
          onClick={handleOverlayClick}
        />
      )}
    </>
  );
}
