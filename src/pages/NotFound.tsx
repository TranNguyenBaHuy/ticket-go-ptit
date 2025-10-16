import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen text-center bg-[#27272A] text-white">
      <img
        src="not-found.png"
        alt="404 not found"
        className="max-w-full w-100"
      />

      <p className="text-md font-semibold">
        Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên, hoặc tạm thời
        không khả dụng. Vui lòng quay về trang trước hoặc đi đến Trang chủ
      </p>

      <Link
        to={"/"}
        className="inline-block px-20 py-3 mt-6 font-medium transition shadow-md bg-[#2dc275] hover:bg-[#2dc275]-700 rounded-md text-white"
      >
        Trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
