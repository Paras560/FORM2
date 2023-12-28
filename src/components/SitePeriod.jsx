import React from 'react'
import { ChevronRight } from 'lucide-react';

const SitePeriod = ({ startDate, endDate }) => {
  return (
    <div className="flex items-center gap">
      <span className="text-sm leading-5 text-muted-foreground px-[2px] bg-background-subtle rounded-sm">
        {startDate}
      </span>
      <ChevronRight size="12" />
      <span className="text-sm leading-5 text-muted-foreground px-[2px] bg-background-subtle rounded-sm">
        {endDate}
      </span>
    </div>
  );
}

export default SitePeriod