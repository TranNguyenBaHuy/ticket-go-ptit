import { useState } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";

const Header = () => {
  const [count, setCount] = useState(0);
  const email = "huydev@gmail.com";
  const location = "PTITHCM";

  return (
    <header className="w-full sticky top-[-44px] bg-white shadow-sm">
      <div className="mx-20">
        <div className="flex justify-between items-center py-3 px-2 bg-[#81C408] text-white rounded-b-xl">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <LocationOnIcon fontSize="small" /> {location}
            </span>
            <span className="flex items-center gap-1">
              <EmailIcon fontSize="small" /> {email}
            </span>
          </div>
          <div className="flex gap-4 text-sm font-medium">
            <Link to="/terms" className="hover:text-amber-400">
              Điều khoản sử dụng
            </Link>
            <Link to="/support" className="hover:text-amber-400">
              Hỗ trợ
            </Link>
          </div>
        </div>
        {/* Main nav */}
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="text-3xl font-bold text-[#81C408]">
            <Link to="/">Laptopshop</Link>
          </div>

          {/* Nav menu */}
          <nav className="flex gap-6 font-semibold">
            <Link to="/" className="hover:text-amber-400">
              Trang chủ
            </Link>
            <Link to="/products" className="hover:text-amber-400">
              Sản phẩm
            </Link>
            <Link to="/about" className="hover:text-amber-400">
              Giới thiệu
            </Link>
            <Link to="/contact" className="hover:text-amber-400">
              Liên hệ
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex gap-4 items-center">
            {/* Cart */}
            <button
              className="relative text-3xl text-[#81C408] hover:text-[#198754]"
              onClick={() => setCount(count + 1)}
            >
              <ShoppingCartIcon fontSize="inherit" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </button>

            {/* User */}
            <button className="text-3xl text-[#81C408] hover:text-[#198754]">
              <PersonIcon fontSize="inherit" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
