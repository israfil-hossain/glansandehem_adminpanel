import React, { Fragment, Suspense, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CommonProgress } from "../components/common/CommonProgress";
import Sidebar from "../components/layouts/sidebar/Sidebar";
import { useAuthUserContext } from "../context/AuthUserProvider";
import { MenuContext } from "../context/MenuContext";

const AuthorizedOutlet = () => {
  const { userFound } = useAuthUserContext();
  const { pathname } = useLocation();
  const { toggleMenu } = useContext(MenuContext);

  if (!userFound) {
    return <Navigate to={"/login"} state={{ authSuccessRedirect: pathname }} />;
  }

  return (
    <Fragment>
      <div className="flex h-screen overflow-hidden bg-[#f5f7fa]">
        <Sidebar />
        <div className="flex flex-col w-full overflow-y-auto">
          {/* <Navbar toggleMenu={toggleMenu} /> */}
          <main className="flex-grow  overflow-y-auto">
            <div className="mx-auto px-5 py-5">
              <Suspense fallback={<CommonProgress />}>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default AuthorizedOutlet;
