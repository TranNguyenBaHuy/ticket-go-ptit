import type { PropsWithChildren } from "react";
import Header from "../components/Header/Header";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div>
        <Header />
        <div>{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
