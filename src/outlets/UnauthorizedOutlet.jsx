import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthUserContext } from "../context/AuthUserProvider";
import { CommonProgress } from "../components/common/CommonProgress";

const UnauthorizedOutlet = () => {
  const { userFound } = useAuthUserContext();

  if (userFound) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div>
      <Suspense fallback={<CommonProgress />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default UnauthorizedOutlet;
