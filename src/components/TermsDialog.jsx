import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TermsAndConditions from "./TermsAndConditions";

const TermsDialog = ({ handleAcceptTerms }) => {
  const { t } = useTranslation();

  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  const onScrollEnd = () => {
    setScrolledToEnd(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="font-semibold p-0 h-auto">
          {t("Accept terms and conditions.1")}
        </Button>
      </DialogTrigger>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="max-w-[92%] sm:max-w-[675px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{t("Terms and Condition.1")}</DialogTitle>
        </DialogHeader>
        <TermsAndConditions className="border-input border-y-[1px]" onScrollEnd={onScrollEnd} />
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={!scrolledToEnd} onClick={handleAcceptTerms}>
              {t("Accept")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsDialog;
