import React from "react";
import Header from "../components/header/Header";

const Home = () => {
  return (
    <>
      {/* HEADER */}
      <div className="px-15 ">
        <Header />
      </div>
      {/* BODY */}
      <div className="flex justify-center items-center">BODY HERE</div>
    </>
  );
};

export default Home;
