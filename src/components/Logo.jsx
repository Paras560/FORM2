import { LanguageContext } from "@/context/LanguageContext";
import React, { useContext } from "react";
import { cn } from "@/lib/utils";

import LogoEn from "@/assets/Svgs/logo.svg?react";
import LogoJp from "@/assets/Svgs/logo-jp.svg?react";

const Logo = ({ className }) => {
  const { language } = useContext(LanguageContext);

  const LogoComponent = language === "ja" ? LogoJp : LogoEn;

  return (
    <div className={cn("auth-logo", className)}>
      <LogoComponent className="max-h-[inherit] max-w-max" />
    </div>
  );
};

export default Logo;
