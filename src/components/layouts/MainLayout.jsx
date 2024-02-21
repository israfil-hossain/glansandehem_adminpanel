import React, {Fragment, useContext } from "react";
import { MenuContext } from "../../context/MenuContext";

import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";


const MainLayout = ({ children }) => {
  const { toggleMenu } = useContext(MenuContext);
  return (
    <Fragment>
    <div className="flex h-screen overflow-hidden bg-[#f5f7fa]">
      <Sidebar />
      <div className="flex flex-col w-full overflow-y-auto">
        {/* <Navbar toggleMenu={toggleMenu} /> */}
        <main className="flex-grow  overflow-y-auto">
          <div className="mx-auto px-5 py-5" >
          {children}
          </div>
        </main>
      </div>
    </div>
    </Fragment>
  );
};

export default MainLayout;
