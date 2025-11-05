import type { Category } from "@/constants/types/types";
import { useNavigate } from "react-router-dom";

type CategoryFilterBarProps = {
  data: Category[];
};

const CategoryFilterBar = ({ data }: CategoryFilterBarProps) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/search/${categoryId}`);
  };

  return (
    <div className="px-50 flex items-center gap-8 bg-black text-white">
      {data.map((da) => (
        <button
          key={da.id}
          onClick={() => handleCategoryClick(da.id)}
          className="font-medium py-6 text-white hover:text-[#2dc275] transition-colors"
        >
          {da.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilterBar;
