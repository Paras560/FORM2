import React, { useState } from "react";
import { NavLink } from "react-router-dom";



import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";


const commonClasses =
  "flex px-3 py-2 gap-2 items-center rounded-lg bg-background hover:bg-background-subtle text-foreground-subtle h-10 whitespace-nowrap"

const MenuItem = ({ item: { title, path, icon, submenus }, isMinimized }) => {
  const hassubmenus = !!submenus

  const Submenu = () =>
    submenus?.map(({ title, path }, i) => (
      <NavLink
        key={i}
        end
        to={path} // Consider making this dynamic if needed
        className={cn(commonClasses, "relative ml-8 text-base active:bg-background-elevated active:border-b-[1px] active:border-input")}
      >
        <span className="absolute left-[-11px] top-[-6px]">
          <svg
            width="11"
            height="44"
            viewBox="0 0 11 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {i === submenus.length - 1 ? (
              <path
                d="M1 0C1 0 1 4 1 14C1 24 1 28 10.944 28"
                stroke="#D4D4D8"
              />
            ) : (
              <path
                d="M1 0L1 14M1 44V14M1 14C1 23 1 28 10.944 28"
                stroke="#D4D4D8"
              />
            )}
          </svg>
        </span>
        <span>{title}</span>
      </NavLink>
    ))

  const header = hassubmenus ? (
    isMinimized ? (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-background px-3 py-2 text-foreground-subtle hover:bg-background-subtle">
            {isMinimized && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="shrink-0">{icon}</span>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={16}
                >
                  <p>{title}</p>
                </TooltipContent>
              </Tooltip>
            )}
            {!isMinimized && <span className="shrink-0">{icon}</span>}

            {!isMinimized && <span>{title}</span>}
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-4 w-fit pb-4 pl-0 pr-4 pt-[5px]">
          {Submenu()}
        </PopoverContent>
      </Popover>
    ) : (
      <Accordion
        collapsible
        className="w-full"
      >
        <AccordionItem
          value="item-1"
          className="border-none"
        >
          <AccordionTrigger className={cn(commonClasses, "hover:no-underline")}>
            <div className="flex items-center gap-2 font-normal">
              <span className="shrink-0">{icon}</span>
              <span>{title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">{Submenu()}</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  ) : (
    <NavLink
      end
      to={path}
      className="flex h-10 items-center gap-2 whitespace-nowrap rounded-lg bg-background px-3 py-2 text-foreground-subtle hover:bg-background-subtle"
    >
      {isMinimized && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="shrink-0">{icon}</span>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={16}
          >
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      )}

      {!isMinimized && <span className="shrink-0">{icon}</span>}

      {!isMinimized && <span>{title}</span>}
    </NavLink>
  )

  return <>{header}</>
}

export default MenuItem