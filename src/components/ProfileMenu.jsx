import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getProfile } from "@/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/actions/userActions";

const ProfileMenu = ({ children }) => {
  const history = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("User");

  const { userInfo } = useSelector((state) => state.user);
  const { detail } = useSelector((state) => state.profile);

  useEffect(() => {
    if (userInfo !== undefined) {
      dispatch(getProfile(userInfo?.id));
    }
  }, [userInfo]);

  let counter = 0;
  useEffect(() => {
    if (detail?.userDetail != null) {
      if (Object.keys(detail?.userDetail).length === 0 && counter == 0) {
        if (userInfo != undefined) {
          dispatch(getProfile(userInfo?.id));
          counter++;
        }
      } else {
        if (
          detail?.userDetail?.familyName_Chinese !== undefined &&
          detail?.userDetail?.givenName_Chinese != undefined
        ) {
          var name =
            detail.userDetail.familyName_Chinese.toString() +
            " " +
            detail.userDetail.givenName_Chinese.toString();
          setUserName(name);
        }
      }
    }
  }, [detail?.userDetail]);
  const logoutHandler = () => {
    dispatch(logout());
    history("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children || (
          <div className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-background-subtle">
            <span className="text-sm whitespace-nowrap">{userName}</span>
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={12} align="end">
        <DropdownMenuLabel className="text-base">
          {userName}
          <div className="font-normal text-sm text-muted-foreground">
            {detail.userDetail?.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            to={
              userInfo.role === "Admin"
                ? "/dashboard/profile"
                : userInfo.role === "User"
                  ? "/userDashboard/profile"
                  : "/profile"
            }
            className="block px-2 py-1 transition rounded-md hover:bg-gray-100 text-base md:text-sm"
          >
            {t("Profile.1")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logoutHandler}
          className="flex justify-between items-center py-3"
        >
          <span className="text-base md:text-sm">{t("Logout.1")}</span>
          <LogOut className="mr-2 h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

ProfileMenu.propTypes = {
  children: PropTypes.node,
};

export default ProfileMenu;
