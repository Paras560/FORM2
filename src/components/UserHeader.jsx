import React from "react";
import Logo from "@/assets/Svgs/logo.svg?react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ProfileMenu from "./ProfileMenu";
import { Input } from "./ui/input";

const UserHeader = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  let history = useNavigate();

  const { t } = useTranslation();

  return (
    <div className="header z-[1] flex items-center justify-between border-s-[1px] border-input bg-background px-4 py-2 shadow-strong md:px-6 lg:px-8">
      <div className="flex w-full items-center gap-4 md:gap-8">
        <Logo className="max-h-8 aspect-[394/90] w-auto" />
      </div>
      {!isMobile && <ProfileMenu />}
    </div>
  );
};

export default UserHeader;
