import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="w-full bg-[#2dc275] shadow-sm">
      <div className="mx-30">
        {/* Main nav */}
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="text-3xl font-bold text-white">
            <Link to="/">TicketGo</Link>
          </div>

          {/* Search */}
          <div className="">
            <input
              type="text "
              placeholder="Bạn tìm gì hôm nay?"
              className="bg-white px-4 py-2.5 rounded-md w-[20rem]"
            />
          </div>

          {/* Nav menu */}
          <nav className="flex gap-6 font-semibold">
            <Link to="/my-tickets" className="hover:text-amber-400 text-white">
              Vé của tôi
            </Link>
            <Link to="/about" className="hover:text-amber-400 text-white">
              Về chúng tôi
            </Link>
            <Link to="/products" className="hover:text-amber-400 text-white">
              Đăng nhập | Đăng ký
            </Link>{" "}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
