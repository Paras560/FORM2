import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  listAllSiteCode,
  listSiteCode,
  getSiteSpaceDetail,
} from "@/actions/siteActions";

import CircularProgress from "./CircularProgress";
import { HardDrive } from "lucide-react";

const site_id = "bd5610ad-6df1-4f51-b1e4-cf2d35724220";

const StorageInfo = () => {
  

  const [allocated, setAllocated] = useState(0);
  const [used, setUsed] = useState(0);
  const [usedPercent, setUsedPercent] = useState(50);

  const [selectedSite, setSelectedSite] = useState("");

  const { siteSpaceDetail } = useSelector((state) => state.site);
  const { userInfo } = useSelector((state) => state.user);


  const { userSiteList } = useSelector((state) => state.site);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSiteSpaceDetail(site_id));
    console.log(userInfo, siteSpaceDetail)
  }, []);

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
  }, [userSiteList]);

  useEffect(() => {
    if (siteSpaceDetail.detail) {
      setAllocated(siteSpaceDetail.detail.allocatedSpace);
      setUsed(siteSpaceDetail.detail.usedSpaceInMb);
      setUsedPercent(
        (siteSpaceDetail.detail.usedSpaceInMb /
          siteSpaceDetail.detail.allocatedSpace) *
          100
      );
    }
  }, [siteSpaceDetail]);

  return (
    <div className="storage p-2 flex md:flex-col lg:flex-row gap-2 bg-background-subtle rounded-sm justify-between md:min-w-[280px]">
      <div>
        <div className="text-sm leading-5 text-muted-foreground">Storage</div>
        <div className="text-sm">
          {used.toFixed(1)}MB of {allocated}MB used
        </div>
      </div>
      <div className="w-10 h-10 bg-background rounded-full relative md:order-first lg:order-none">
        <CircularProgress
          progress={usedPercent && usedPercent.toFixed(1)}
          size={40}
          strokeWidth={4}
        />
        <HardDrive
          size={20}
          strokeWidth={1.33}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default StorageInfo;
