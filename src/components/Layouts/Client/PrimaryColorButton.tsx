interface Props {
  title: string;
  fullSize?: boolean;
  onClick: () => void;
}

const BuyTicketButton = ({ title, fullSize, onClick }: Props) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${
          fullSize ? "w-full" : "w-auto"
        } bg-[#2dc275] hover:bg-white hover:text-black transition-colors duration-500 text-white font-bold py-2 px-6 rounded`}
      >
        <p>{title}</p>
      </button>
    </>
  );
};

export default BuyTicketButton;
