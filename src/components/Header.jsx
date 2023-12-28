import React, { useContext, useEffect, useState } from "react";
import { getMenuList } from "@/actions/menuActions";
import { listSiteCode, validateSiteCode } from "@/actions/siteActions";
import LogoIcon from "@/assets/Svgs/logo-icon.svg?react";
import { SidebarContext } from "@/context/SidebarContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Plus, SidebarClose, SidebarOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "./Loader";
import ProfileMenu from "./ProfileMenu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  // DialogOverlay,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

const Header = ({ load, setLoad, userRole }) => {
  const { isMinimized, toggleSidebar } = useContext(SidebarContext);

  const isMobile = useMediaQuery("(max-width: 768px)");
  let history = useNavigate();

  const [code, setCode] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const isAdmin = userInfo.role === "Admin" || "superAdmin";

  useEffect(() => {
    if (isAdmin) {
      dispatch(listSiteCode(userInfo?.id));
    }
  }, []);

  const siteDetails = useSelector((state) => state.site);
  const { siteValidation, userSiteList } = siteDetails;

  const [isLoading, setIsLoading] = useState(true);

  const register = () => {
    if (code.length < 1) {
      setError(true);
      return;
    }

    dispatch(validateSiteCode(code));
  };

  useEffect(() => {
    if (!openModal) {
      setCode("");
    }
  }, [openModal]);

  useEffect(() => {
    setIsLoading(siteValidation.loading);
    if (siteValidation.error) {
      toast.error(siteValidation.error.data.title);
    } else if (siteValidation.validated == true) {
      setOpenModal((open) => !open);
      history("/dashboard/siteDetail");
    } else if (siteValidation.validated == false) {
      toast.error("Site code does not validate.");
    }
  }, [siteValidation]);

  const [selectedSite, setSelectedSite] = useState("");

  const sortedArr = userSiteList?.siteList?.sort((a, b) =>
    a.siteName.localeCompare(b.siteName),
  );

  useEffect(() => {
    if (userSiteList.siteList) {
      if (userSiteList.siteList.length > 0) {
        if (selectedSite == "") {
          if (localStorage.getItem("siteId") != undefined) {
            setSelectedSite(localStorage.getItem("siteId"));
          } else {
            setSelectedSite(userSiteList.siteList[0].id);
            localStorage.setItem("siteId", userSiteList.siteList[0].id);
          }
        }
      }
    }
  }, [userSiteList, userSiteList?.siteList?.length]);

  const selectSite = (value) => {
    setLoad(true);
    setSelectedSite(value);
    localStorage.setItem("siteId", value);
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  };

  return (
    <div className="header z-[1] flex items-center justify-between border-s-[1px] border-input bg-background px-4 py-2 shadow-strong md:px-6 lg:px-8">
      <div className="flex w-full items-center gap-4 md:gap-8">
        {userRole !== "User" && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isMinimized ? <SidebarOpen /> : <SidebarClose />}
          </Button>
        )}

        <LogoIcon className="max-h-8 w-[60px] md:hidden" />

        <div className="flex w-full items-center gap-4">
          {isAdmin && (
            <Select onValueChange={(e) => selectSite(e)} value={selectedSite}>
              <SelectTrigger className="h-12 w-full bg-background-elevated text-lg font-semibold md:max-w-[400px]">
                <SelectValue placeholder="Site Name" />
              </SelectTrigger>
              <SelectContent>
                {sortedArr?.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.siteName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {isAdmin && (
            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <DialogTrigger asChild className="hidden md:inline-flex">
                <Button className="gap-4">
                  <Plus />
                  <span>{t("Create Site.1")}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="mb-2">
                    {" "}
                    {t("Site Code Registration")}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input
                      value={code}
                      placeholder="Enter site code"
                      className={error ? "border-destructive" : ""}
                      onChange={(e) => {
                        setCode(e.target.value);
                        setError(false);
                      }}
                    />
                    {error && (
                      <span className="flex-start flex text-red-500">
                        Site code cant be empty
                      </span>
                    )}
                  </div>
                </div>
                <DialogFooter className="sm:justify-end">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setOpenModal((open) => !open)}
                    >
                      {t("Cancel")}
                    </Button>
                  </DialogClose>
                  <Button type="button" onClick={register}>
                    {isLoading && <Loader />} {t("Register")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      {!isMobile && <ProfileMenu />}
    </div>
  );
};

export default Header;
