import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Ticket, Search } from "lucide-react";

const Header = () => {
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
              width="127"
              height="41"
            ></img>
          </Link>
          {/* Search */}
          <div className="flex items-center py-0.5 bg-white rounded-md">
            {/* search icon */}
            <button className=" py-2.5 px-4 h-full">
              <Search size={22} className="text-[#828BA0]" />
            </button>
            {/* search input */}
            <input
              type="text "
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
          <nav className="flex gap-6 font-semibold">
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
            <Link
              to="/products"
              className="hover:text-black transition-colors duration-500 text-white"
            >
              Đăng nhập | Đăng ký
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
