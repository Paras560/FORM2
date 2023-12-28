import { cn } from "@/lib/utils";
import React, { useState } from "react";

function LangSwitch({ lang, setLang }) {
  return (
    <div className="flex gap-2 text-sm  items-center font-normal font-open-sans text-left text-14 leading-20 tracking-normal">
      <div></div>
      <div className="flex  gap-2 bg-gray-400 p-[1px]">
        <div
          className={cn("p-1", lang === "jpn" ? "bg-white" : "")}
          onClick={() => setLang("jpn")}
        >
          jpn
        </div>
        <div
          onClick={() => setLang("eng")}
          className={cn("p-1", lang === "eng" ? "bg-white" : "")}
        >
          Eng
        </div>
      </div>
    </div>
  );
}

export default LangSwitch;
