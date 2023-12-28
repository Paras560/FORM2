import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getMenuList } from "@/actions/menuActions";
import LogoIcon from "@/assets/Svgs/logo-icon.svg?react";
import { SidebarContext } from "@/context/SidebarContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  AlertTriangle,
  Construction,
  FileSpreadsheet,
  MenuSquare,
  Printer,
  ShieldCheck,
  Users2,
  UserSquare,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
// import IconButton from "../screens/elements/IconButton";
import MenuItem from "./MenuItem";
import { TooltipProvider } from "./ui/tooltip";

const Sidebar = ({ userRole }) => {
  const { t, i18n } = useTranslation();
  const { isMinimized, toggleSidebar } = useContext(SidebarContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuList(localStorage.getItem("siteId")));
  }, []);

  const menuDetails = useSelector((state) => state.menu);

  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!isDesktop && !isMinimized) {
      toggleSidebar();
    }

    if (isDesktop && isMinimized) {
      toggleSidebar();
    }
  }, [isDesktop]);

  const sidebarRef = useClickOutside(() => {
    if (!isMinimized) {
      toggleSidebar();
    }
  });

  const dynamicMenu = menuDetails?.menuList?.menuList;

  const reportSubMenu = [
    { path: "/dashboard/report/ua", title: t("User Access") },
    { path: "/dashboard/report/sd", title: t("Safety Declaration.1") },
    { path: "/dashboard/report/sua", title: t("Site User SmartPhone") },
    { path: "/dashboard/report/spsd", title: t("Safety Declaration.1") },
    { path: "/dashboard/report/susp", title: t("Site User SmartPhone") },
    { path: "/dashboard/report/ol", title: t("Operation Log") },
  ];

  const reportSubMenuSuperAdmin = [
    { path: "/adminDashboard/report/ad", title: t("Admin") },
    { path: "/adminDashboard/report/sba", title: t("Sub Admin.1") },
    { path: "/adminDashboard/report/liul", title: t("Logged in User List") },
    { path: "/adminDashboard/report/dl", title: t("Device List") },
  ];

  const getDynamicMenuName = (name, elseName) => {
    const isEnglish = i18n.language === "en";
    if (!dynamicMenu) return t(elseName);

    switch (name) {
      case "chourey1":
        return isEnglish
          ? dynamicMenu["chourey1"]
          : dynamicMenu["chourey1Japanese"];

      case "chourey2":
        return isEnglish
          ? dynamicMenu["chourey2"]
          : dynamicMenu["chourey2Japanese"];

      case "disaster":
        return isEnglish
          ? dynamicMenu["disaster"]
          : dynamicMenu["disasterJapanese"];
      default:
        t(elseName);
        break;
    }

    return t(elseName);
  };

  const AdminMenu = [
    {
      id: "0",
      title: t("Dashboard.1"),
      notifications: false,
      path: "/dashboard",
      icon: <Construction size={20} strokeWidth={1.33} />,
    },
    {
      id: "1",
      title: t("User Board.1"),
      notifications: false,
      path: "/dashboard/userboard",
      icon: <UserSquare size={20} strokeWidth={1.33} />,
    },
    {
      id: "2",
      title: t("Menu Name.1"),
      notifications: false,
      path: "/dashboard/menu",
      icon: <MenuSquare size={20} strokeWidth={1.33} />,
    },
    {
      id: "3",
      title: getDynamicMenuName("chourey1", "Chourey 1"),
      notifications: false,
      path: "/dashboard/choureyOne",
      icon: <Users2 size={20} strokeWidth={1.33} />,
    },
    {
      id: "4",
      title: getDynamicMenuName("chourey2", "Chourey 2"),
      notifications: false,
      path: "/dashboard/choureyTwo",
      icon: <Users2 size={20} strokeWidth={1.33} />,
    },
    {
      id: "5",
      title: getDynamicMenuName("disaster", "Disaster"),
      notifications: false,
      path: "/dashboard/disaster",
      icon: <AlertTriangle size={20} strokeWidth={1.33} />,
    },
    {
      id: "6",
      title: t("Safety Declaration.1"),
      notifications: false,
      path: "/dashboard/safetyDeclaration",
      icon: <ShieldCheck size={20} strokeWidth={1.33} />,
    },
    {
      id: "7",
      title: t("Report.1"),
      notifications: false,
      path: "/dashboard/report",
      icon: <FileSpreadsheet size={20} strokeWidth={1.33} />,
      submenus: reportSubMenu,
    },
    {
      id: "8",
      title: t("CHOUREY Print.1"),
      notifications: false,
      path: "/dashboard/print",
      icon: <Printer size={20} strokeWidth={1.33} />,
    },
  ];

  const SuperAdminMenus = [
    {
      id: "0",
      title: t("Dashboard.1"),
      notifications: false,
      path: "/adminDashboard",
      icon: <UserSquare size={20} strokeWidth={1.33} />,
    },
    {
      id: "1",
      title: t("Device Mapping.1"),
      notifications: false,
      path: "/adminDashboard/mapping",
      icon: <UserSquare size={20} strokeWidth={1.33} />,
    },
    {
      id: "2",
      title: t("Sites Storage.1"),
      notifications: false,
      path: "/adminDashboard/siteStorage",
      icon: <UserSquare size={20} strokeWidth={1.33} />,
    },
    {
      id: "3",
      title: t("Common Contents.1"),
      notifications: false,
      path: "/adminDashboard/commonContents",
      icon: <UserSquare size={20} strokeWidth={1.33} />,
    },
    {
      id: "4",
      title: t("Report.1"),
      notifications: false,
      path: "/adminDashboard/report",
      icon: <UserSquare size={20} strokeWidth={1.33} />,
      submenus: reportSubMenuSuperAdmin,
    },
    {
      id: "5",
      title: t("User List.1"),
      notifications: false,
      path: "/adminDashboard/userList",
      icon: <UserSquare size={20} strokeWidth={1.33} />,
    },
  ];

  const subAdminMenu = [];

  const menuList =
    userRole == "Admin"
      ? AdminMenu
      : userRole == "SubAdmin"
        ? subAdminMenu
        : SuperAdminMenus;

  return (
    <>
      {!isMinimized && (
        <div className="fixed inset-0 z-10 bg-foreground-subtle/50 md:hidden"></div>
      )}
      <div className="mobile-bg-overlay "></div>
      <div
        className={cn(
          "sidebar transition-width flex min-h-screen w-[var(--sidebar-width)] flex-col justify-between bg-background px-4 pb-4 pt-6 shadow-md duration-500",
          isMinimized && "is-minimized",
        )}
        ref={isMobile ? sidebarRef : null}
      >
        <div className="flex flex-col items-start gap-8 overflow-y-hidden">
          <div className="sidebar-logo flex justify-between">
            {isMinimized ? (
              <LogoIcon className="h-[34px] w-10" />
            ) : (
              <Logo className="max-h-[34px] w-full" />
            )}
          </div>
          <nav className="z-0 flex w-full flex-col gap-2">
            <TooltipProvider delayDuration={100}>
              <ol>
                {menuList.map((item) => (
                  <li key={item.id}>
                    <MenuItem item={item} isMinimized={isMinimized} />
                  </li>
                ))}
              </ol>
            </TooltipProvider>
          </nav>
        </div>
        <LanguageSwitcher className="self-center" />
      </div>
    </>
  );
};

export default Sidebar;
