import type { PropsWithChildren } from "react";
import Header from "../components/Header/Header";

const SelectTicketLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </>
  );
};

export default SelectTicketLayout;
