import { useState } from "react";
import { Link } from "react-router-dom";
import { Ticket, Search, Menu } from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import AuthContainer from "../../../Auth/AuthContainer";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { authState, logout } = useAuth();

  return (
    <header className="w-full bg-[#2dc275] shadow-sm">
      <div className="mx-40">
        {/* Main nav */}
        <div className="flex justify-between items-center py-4.5">
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
          {/* Search */}
          <div className="flex items-center py-0.5 bg-white rounded-md">
            {/* search icon */}
            <button className=" py-2.5 px-4 h-full">
              <Search size={22} className="text-[#828BA0]" />
            </button>
            {/* search input */}
            <input
              type="text"
              placeholder="Bạn tìm gì hôm nay?"
              className="items-center text-md bg-white py-3 h-full rounded-md w-[16rem] focus:outline-none"
            />
            {/* search button */}
            <button
              className="items-center border-l border-[#E6EBF5] px-3.5 text-[#2A2D34]"
              onClick={() => {
                alert("Tìm kiếm");
              }}
            >
              Tìm kiếm
            </button>
          </div>

          {/* Nav menu */}
          <nav className="flex items-center gap-6 font-semibold">
            <Link
              to="/my-tickets"
              className="flex items-center gap-2 hover:text-black transition-colors duration-500 text-white"
            >
              <Ticket size={24} />
              Vé của tôi
            </Link>
            <Link
              to="/about"
              className="hover:text-black transition-colors duration-500 text-white"
            >
              Về chúng tôi
            </Link>
            {authState.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-white">Xin chào, {authState.user?.name}</span>
                <button
                  onClick={logout}
                  className="hover:text-black transition-colors duration-500 text-white"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hover:text-black transition-colors duration-500 text-white"
              >
                Đăng nhập | Đăng ký
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search size={22} className="text-[#828BA0]" />
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
            {authState.isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <span className="text-white py-2">Xin chào, {authState.user?.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="hover:text-amber-400 text-white py-2 text-left"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="hover:text-amber-400 text-white py-2 text-left"
              >
                Đăng nhập | Đăng ký
              </button>
            )}
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
