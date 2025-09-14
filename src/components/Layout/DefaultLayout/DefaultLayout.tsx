import type { PropsWithChildren } from "react";
import Header from "../components/Header/Header";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default DefaultLayout;
