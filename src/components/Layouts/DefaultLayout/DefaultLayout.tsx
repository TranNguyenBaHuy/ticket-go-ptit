import type { PropsWithChildren } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div>
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
