const TicketCard = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div>Vé</div>
        <div className="hidden md:flex flex-col absolute justify-center items-center top-0 bottom-0 left-[36%] -translate-x-1/2">
          <div className="w-18 h-10 rounded-b-full bg-[#27272A]"></div>
          <svg
            width="4"
            height="100%"
            viewBox="0 0 4 415"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="vertical-dashed"
          >
            <path
              stroke="#27272A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="4 10"
              d="M2 2v411"
            ></path>
          </svg>
          <div className="w-18 h-10 rounded-t-full bg-black"></div>
        </div>
        <div>Mời</div>
      </div>
    </>
  );
};

export default TicketCard;
