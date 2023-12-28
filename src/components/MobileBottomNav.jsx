import React from "react";
import { Home, PlusSquare, QrCode, User } from "lucide-react";
import { PropTypes } from "prop-types";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import CreateSiteModal from "@/components/CreateSiteModal";
import ProfileMenu from "./ProfileMenu";
import { ScanLine } from "lucide-react";

const BottomNavMenu = ({ title, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center gap-1 px-1">
      <Icon />
      <span className="text-foreground-muted px-1 text-xs">{title}</span>
    </div>
  );
};

BottomNavMenu.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.elementType,
};

const MobileBottomNav = ({ className, userRole }) => {
  const { t } = useTranslation();

  

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 flex items-center justify-around rounded-t-md border-t-[1px] border-input bg-background px-4 py-2.5 shadow-lg",
        className,
      )}
    >
      <NavLink
        text={console.log("first", userRole)}
        to={userRole === "User" ? "/userDashboard" : "/dashboard"}
        className="bottom-nav-item"
      >
        <BottomNavMenu title={t("Dashboard.1")} icon={Home} />
      </NavLink>

      {userRole === "Admin" ? (
        <CreateSiteModal>
          <BottomNavMenu title={t("Create Site.1")} icon={PlusSquare} />
        </CreateSiteModal>
      ) : userRole === "User" ? (
        <div className="flex flex-col items-center justify-end gap-1 px-1 relative h-[2.75rem]">
          <NavLink
            to="main"
            className="absolute top-[-3rem] flex aspect-square h-[4rem] items-center justify-center rounded-full bg-primary p-2 text-primary-foreground shadow-lg"
          >
            <QrCode size={24} />
            <ScanLine
              size={40}
              strokeWidth={1}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </NavLink>
          <span className="text-foreground-muted px-1 text-sm text-primary">
            Scan QR
          </span>
        </div>
      ) : null}

      <ProfileMenu userRole={userRole}>
        <BottomNavMenu title={t("Profile.1")} icon={User} />
      </ProfileMenu>
    </div>
  );
};

MobileBottomNav.propTypes = {
  className: PropTypes.string,
};

export default MobileBottomNav;
