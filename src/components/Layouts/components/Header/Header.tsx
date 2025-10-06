import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#2dc275] shadow-sm">
      <div className="mx-4 md:mx-30">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <Link to="/">
            <img
              src="https://salt.tkbcdn.com/ts/ds/32/dc/a2/7871f1207e8c4c2747698b5aa6d15a56.png"
              alt="tkbvnpay"
              width="100"
              height="33"
              className="md:w-[127px] md:h-[41px]"
            />
          </Link>

          {/* Search - ẩn trên mobile */}
          <div className="hidden md:block relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Bạn tìm gì hôm nay?"
              className="bg-white pl-10 pr-4 py-2.5 rounded-md w-[20rem]"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 font-semibold">
            <Link to="/my-tickets" className="hover:text-amber-400 text-white">
              Vé của tôi
            </Link>
            <Link to="/about" className="hover:text-amber-400 text-white">
              Về chúng tôi
            </Link>
            <Link to="/products" className="hover:text-amber-400 text-white">
              Đăng nhập | Đăng ký
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Bạn tìm gì hôm nay?"
              className="bg-white pl-10 pr-4 py-2.5 rounded-md w-full"
            />
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3 font-semibold">
            <Link
              to="/my-tickets"
              className="hover:text-amber-400 text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Vé của tôi
            </Link>
            <Link
              to="/about"
              className="hover:text-amber-400 text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Về chúng tôi
            </Link>
            <Link
              to="/products"
              className="hover:text-amber-400 text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Đăng nhập | Đăng ký
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;