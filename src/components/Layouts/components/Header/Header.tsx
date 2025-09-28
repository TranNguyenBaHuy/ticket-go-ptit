import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [count, setCount] = useState(0);

  return (
    <header className="w-full bg-[#2dc275] shadow-sm">
      <div className="mx-30">
        {/* Main nav */}
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="text-3xl font-bold text-white">
            <Link to="/">TicketGo</Link>
          </div>

          <div className="Search-Bar">
            <input
              type="text "
              placeholder="Bạn tìm gì hôm nay?"
              className="bg-white px-4 py-2.5 rounded-md"
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

          {/* Icons */}
          <div className="flex gap-4 items-center">
            {/* Cart */}
            <button
              className="relative text-3xl text-[#81C408] hover:text-[#198754]"
              onClick={() => setCount(count + 1)}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </button>
            {/* User */}
            <button className="text-3xl text-[#81C408] hover:text-[#198754]">
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
