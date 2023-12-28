import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const LanguageSwitcher = ({ className }) => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <RadioGroup
      defaultValue={language || "en"}
      onValueChange={setLanguage}
      className={cn(
        "flex p-1 items-center gap-1 rounded-md bg-background-strong flex-wrap self-center",
        className
      )}
    >
      <div className="flex items-center relative">
        <RadioGroupItem
          value="ja"
          id="ja"
          className="peer invisible h-0 w-0 absolute"
        />
        <Label
          role="radio"
          htmlFor="ja"
          className="w-[60px] cursor-pointer flex gap-1 items-center px-2 py-1 rounded-[2px] text-muted-foreground peer-aria-checked:bg-white peer-aria-checked:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="18"
            viewBox="0 0 25 18"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.833176 0H24.832V16H0.833176V0Z"
              fill="white"
            />
            <path
              d="M12.8328 12.9742C15.5793 12.9742 17.8059 10.7477 17.8059 8.00118C17.8059 5.25463 15.5793 3.02811 12.8328 3.02811C10.0862 3.02811 7.85971 5.25463 7.85971 8.00118C7.85971 10.7477 10.0862 12.9742 12.8328 12.9742Z"
              fill="#BC002D"
            />
            <path
              d="M1.33348 2C1.33348 1.17157 2.00505 0.5 2.83348 0.5H22.8335C23.6619 0.5 24.3335 1.17157 24.3335 2V13.9991C24.3335 14.8275 23.6619 15.4991 22.8335 15.4991H2.83348C2.00505 15.4991 1.33348 14.8275 1.33348 13.9991V2Z"
              stroke="#E4E4E7"
            />
          </svg>
          <span className="min-w-[18px] text-center">JP</span>
        </Label>
      </div>
      <div className="flex items-center">
        <RadioGroupItem
          value="en"
          id="en"
          className="peer invisible h-0 w-0 absolute"
        />
        <Label
          role="radio"
          htmlFor="en"
          className="w-[60px] cursor-pointer flex gap-1 items-center px-2 py-1 rounded-sm peer-aria-checked:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="18"
            viewBox="0 0 25 18"
            fill="none"
          >
            <g clipPath="url(#clip0_8_1266)">
              <path d="M1.83348 1H23.1668V17H1.83348V1Z" fill="#012169" />
              <path
                d="M4.33348 1L12.4668 7.03333L20.5668 1H23.1668V3.06667L15.1668 9.03333L23.1668 14.9667V17H20.5001L12.5001 11.0333L4.53348 17H1.83348V15L9.80015 9.06667L1.83348 3.13333V1H4.33348Z"
                fill="white"
              />
              <path
                d="M15.9668 10.3667L23.1668 15.6667V17L14.1335 10.3667H15.9668ZM9.83348 11.0333L10.0335 12.2L3.63348 17H1.83348L9.83348 11.0333ZM23.1668 1V1.1L14.8668 7.36667L14.9335 5.9L21.5001 1H23.1668ZM1.83348 1L9.80015 6.86667H7.80015L1.83348 2.4V1Z"
                fill="#C8102E"
              />
              <path
                d="M9.86681 1V17H15.2001V1H9.86681ZM1.83348 6.33333V11.6667H23.1668V6.33333H1.83348Z"
                fill="white"
              />
              <path
                d="M1.83348 7.43333V10.6333H23.1668V7.43333H1.83348ZM10.9335 1V17H14.1335V1H10.9335Z"
                fill="#C8102E"
              />
            </g>
            <path
              d="M3.83348 0.5C2.45277 0.5 1.33348 1.61929 1.33348 3V15C1.33348 16.3807 2.45277 17.5 3.83348 17.5H21.1668C22.5475 17.5 23.6668 16.3807 23.6668 15V3C23.6668 1.61929 22.5475 0.5 21.1668 0.5H3.83348Z"
              stroke="#E5E7EB"
            />
            <defs>
              <clipPath id="clip0_8_1266">
                <path
                  d="M1.83348 3C1.83348 1.89543 2.72891 1 3.83348 1H21.1668C22.2714 1 23.1668 1.89543 23.1668 3V15C23.1668 16.1046 22.2714 17 21.1668 17H3.83348C2.72891 17 1.83348 16.1046 1.83348 15V3Z"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
          <span className="min-w-[18px] text-center">EN</span>
        </Label>
      </div>
    </RadioGroup>
  );
};

export default LanguageSwitcher;
