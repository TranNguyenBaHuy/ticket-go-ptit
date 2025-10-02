import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="w-full bg-[#2dc275] shadow-sm">
      <div className="mx-40">
        {/* Main nav */}
        <div className="flex justify-between items-center py-5">
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
          <div className="relative items-center bg-white rounded-md">
            {/* search icon */}
            <button className=" py-2.5 px-4 h-full text-2xl">
              <FontAwesomeIcon icon={faMagnifyingGlass} color="#828BA0" />
            </button>
            {/* search input */}
            <input
              type="text "
              placeholder="Bạn tìm gì hôm nay?"
              className="text-md bg-white px-2 py-2.5 rounded-md w-[20rem] focus:outline-none"
            />
            {/* search button */}
            <button
              className="border-l border-black px-3.5"
              onClick={() => {
                alert("Tìm kiếm");
              }}
            >
              Tìm kiếm
            </button>
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
