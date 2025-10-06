import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTicket, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const UserSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: faUser,
      title: "Cài đặt tài khoản",
      subItems: [{ name: "Thông tin tài khoản", path: "/account-info" }],
    },
    {
      icon: faTicket,
      title: "Vé của tôi",
      path: "/my-tickets",
    },
    {
      icon: faCalendarDays,
      title: "Sự kiện của tôi",
      path: "/my-events",
    },
  ];

  return (
    <div className="w-64 bg-[#27272A] text-white p-6 rounded-lg">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-600">
        <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/48"
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div>
          <p className="text-xs text-gray-400">Tài khoản của</p>
          <p className="font-semibold">Trần Nguyễn Bá Huy</p>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.path ? (
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-[#2dc275] text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span className="text-sm">{item.title}</span>
              </Link>
            ) : (
              <div>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <FontAwesomeIcon icon={item.icon} />
                  <span className="text-sm">{item.title}</span>
                </div>
                {item.subItems && (
                  <div className="ml-9 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="block px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default UserSidebar;