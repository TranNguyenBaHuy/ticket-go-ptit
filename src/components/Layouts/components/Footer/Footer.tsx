import React from "react";
import { Link } from "react-router-dom";
import bctLogo from "../../../../assets/bct-registered.svg";

const Footer = () => {
  return (
    <>
      <div className="w-full mx-auto bg-[#1d1d1d]">
        <div className="mx-30 py-10 items-center flex flex-row justify-between">
          <div>
            <Link to="/">
              <img
                src="https://salt.tkbcdn.com/ts/ds/32/dc/a2/7871f1207e8c4c2747698b5aa6d15a56.png"
                alt="tkbvnpay"
                width="127"
                height="41"
              ></img>
            </Link>
          </div>
          <div className="text-sm text-[#b3b3b3] flex flex-col gap-1">
            <p>Công ty TNHH TicketBox Clone</p>
            <p>Đại diện theo pháp luật: Trịnh Trần Phương Tuấn</p>
          </div>
          <div>
            <a
              target="_blank"
              href="http://online.gov.vn/Home/WebDetails/23180"
            >
              <img src={bctLogo} width={150} alt="confirm" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
