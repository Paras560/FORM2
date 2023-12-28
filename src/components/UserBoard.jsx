import React from "react";
import Logo from "./../assets/Images/lochosm.png";
import LangSwitch from "./LangSwitch";
import Frame from "./../assets/Images/Frame 114.png";
import { Checkbox } from "./ui/checkbox";
import todaytemp from "./../assets/Images/Temp.png";
import { Dialog } from "@radix-ui/react-dialog";

function UserBoard() {
  return (
    <div className="p-4">
      <div className="flex  justify-between p-8">
        <img className="w-52" src={Logo}></img>
        <div>
          <LangSwitch size={300} />
        </div>
      </div>
      <div className="flex flex-col gap-1 lg:flex-row lg:justify-between lg:p-8 lg:rounded-xl lg:shadow-md lg:bg-gray-100">
        <div className="text-3xl font-semibold font-montserrat text-2xl leading-7 tracking-normal text-left">
          User Board
        </div>
        <div className="text-sm font-normal font-open-sans text-base leading-5 tracking-normal text-left">
          Today's Date: 2023/05/20
        </div>
      </div>
      <div className="lg:flex   ">
        <div className=" flex flex-col gap-6 ">
          <div className="flex  rounded-lg shadow-md ">
            <img src={Frame} className="flex gap-6"></img>
            <div className="flex flex-col gap-1 p-2">
              <div className=" font-normal font-open-sans leading-4 tracking-normal text-left">
                Site Name
              </div>
              <div className="text-xl font-semibold font-open-sans  leading-8 tracking-normal text-left">
                Mirai Site
              </div>
            </div>
          </div>
          <div className="flex  rounded-lg shadow-md ">
            <img src={Frame} className="flex gap-6"></img>
            <div className="flex flex-col gap-1 p-2">
              <div className="text-xs font-normal font-open-sans text-xs leading-4 tracking-normal text-left">
                Browse Time
              </div>
              <div className="text-xl font-semibold font-open-sans text-lg leading-8 tracking-normal text-left">
                6:00 am to 6:00 pm
              </div>
            </div>
          </div>
          <div className="flex  rounded-lg shadow-md ">
            <img src={Frame} className="flex gap-6"></img>
            <div className="flex flex-col gap-1 p-2">
              <div className="text-xs font-normal font-open-sans text-xs leading-4 tracking-normal text-left">
                Site Time period
              </div>
              <div className="text-xl font-semibold font-open-sans text-lg leading-8 tracking-normal text-left">
                2080-12-23 to 2081-12-24
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 rounded-xl shadow-md">
          <div className="text-xl font-semibold font-open-sans text-base leading-8 tracking-normal text-left ">
            Site Safety Rules
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row  gap-3 bg-yellow-100">
              <Checkbox />
              <div className="text-base font-normal font-open-sans leading-3 tracking-normal ">
                Always wear PPE
              </div>
            </div>
            <div className="flex flex-row  gap-3 pr-8 bg-yellow-100">
              <Checkbox />
              <div className="text-base font-normal font-open-sans leading-3 tracking-normal ">
                Keep Site Tidy
              </div>
            </div>
            <div className="flex flex-row  gap-3 pr-8 bg-yellow-100">
              <Checkbox />
              <div className="text-base font-normal font-open-sans leading-3 tracking-normal ">
                Follow Rules and Regulation
              </div>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="flex bg-green-100  rounded-xl shadow-md">
            <img src={todaytemp} size={40}></img>
          </div>
        </div>
      </div>
      <div className="flex flex-row pt-4 justify-items-center ">
        Chourey 1 Chourey 2 Distruction
      </div>
    </div>
  );
}

export default UserBoard;
