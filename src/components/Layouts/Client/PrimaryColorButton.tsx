interface Props {
  title: string;
  fullSize?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const PrimaryColorButton = ({ title, fullSize, onClick, disabled }: Props) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${fullSize ? "w-full" : "w-auto"} ${
          disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#2dc275] hover:bg-white hover:text-black transition-colors duration-500 text-white "
        } font-bold py-2 px-6 rounded`}
      >
        <p>{title}</p>
      </button>
    </>
  );
};

export default PrimaryColorButton;
