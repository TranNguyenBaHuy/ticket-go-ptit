import { useState } from "react";
import { Link } from "react-router-dom";
import { Ticket, Search, Menu } from "lucide-react";
import AuthContainer from "../../../../Auth/AuthContainer";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="w-full bg-[#2dc275] shadow-sm">
      <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-40">
        {/* Main nav */}
        <div className="flex justify-between items-center py-4.5 flex-wrap md:flex-nowrap">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://salt.tkbcdn.com/ts/ds/32/dc/a2/7871f1207e8c4c2747698b5aa6d15a56.png"
              alt="tkbvnpay"
              width="100"
              height="33"
              className="w-[90px] sm:w-[110px] md:w-[127px] md:h-[41px]"
            />
          </Link>

          {/* Search */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Nav menu */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 font-semibold">
            <Link
              to="/my-tickets"
              className="flex items-center gap-2 hover:text-black transition-colors duration-500 text-white text-sm lg:text-base"
            >
              <Ticket size={22} className="hidden lg:block" />
              Vé của tôi
            </Link>
            <Link
              to="/about"
              className="hover:text-black transition-colors duration-500 text-white text-sm lg:text-base"
            >
              Về chúng tôi
            </Link>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hover:text-black transition-colors duration-500 text-white text-sm lg:text-base"
            >
              Đăng nhập | Đăng ký
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#828BA0]"
            />
            <input
              type="text"
              placeholder="Bạn tìm gì hôm nay?"
              className="bg-white pl-10 pr-4 py-2.5 rounded-md w-full text-sm"
            />
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2 font-semibold bg-[#2dc275]/10 rounded-lg p-3">
            <Link
              to="/my-tickets"
              className="hover:text-amber-400 text-white py-2 border-b border-white/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Vé của tôi
            </Link>
            <Link
              to="/about"
              className="hover:text-amber-400 text-white py-2 border-b border-white/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Về chúng tôi
            </Link>
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="hover:text-amber-400 text-white py-2 text-left"
            >
              Đăng nhập | Đăng ký
            </button>
          </nav>
        )}
      </div>

      {/* Auth Modal */}
      <AuthContainer
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </header>
  );
};

export default Header;
