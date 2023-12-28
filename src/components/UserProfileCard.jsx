import React from 'react'
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import StorageInfo from "@/components/StorageInfo";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogOverlay,
} from "@/components/ui/dialog";

const UserProfileCard = ({
  firstName,
  lastName,
  phoneNumber,
  email,
  dob,
  dateOfRegister,
  address,
}) => {
  const { t } = useTranslation();

  return (
    <div className="profile-card lg:max-w-[268px] px-2 pt-4 pb-6 flex flex-col gap-4 bg-background shadow-strong w-full rounded-card">
      <div className="px-2 text-xl font-semiBold leading-8">
        {`${firstName} ${lastName}`}
      </div>
      <div className="gap-4 flex justify-between flex-col md:flex-row lg:flex-col ">
        <div className="px-2 space-y-2">
          <div className="info-row flex lg:block md:gap-6">
            <div className="text-sm leading-5 text-muted-foreground min-w-[100px]">
              Email
            </div>
            <div className="text-sm">{email}</div>
          </div>
          <div className="info-row flex lg:block md:gap-6">
            <div className="text-sm leading-5 text-muted-foreground min-w-[100px]">
              Registerd On:
            </div>
            <div className="text-sm">
              {moment(dateOfRegister).format("Do MMMM, YYYY")}
            </div>
          </div>
          {address && (
            <div className="info-row flex lg:block md:gap-6">
              <div className="text-sm leading-5 text-muted-foreground min-w-[100px]">
                Address
              </div>
              <div className="text-sm">{address}</div>
            </div>
          )}
          {phoneNumber && (
            <div className="info-row flex lg:block md:gap-6">
              <div className="text-sm leading-5 text-muted-foreground min-w-[100px]">
                Contact:
              </div>
              <div className="text-sm">{phoneNumber}</div>
            </div>
          )}
          {dob && (
            <div className="info-row flex lg:block md:gap-6">
              <div className="text-sm leading-5 text-muted-foreground min-w-[100px]">
                Date of Birth:
              </div>
              <div className="text-sm">{dob}</div>
            </div>
          )}
        </div>
        <Separator
          orientation="vertical"
          className="self-stretch h-auto hidden md:block lg:hidden"
        />
        <div className="space-y-2">
          <StorageInfo />
          <div className="px-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs font-semibold"
                >
                  Privacy Policy
                </Button>
              </DialogTrigger>
              <DialogOverlay className="bg-foreground/50" />
              <DialogContent className="max-w-[92%] sm:max-w-[675px] md:px-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">
                    Privacy Policy
                  </DialogTitle>
                </DialogHeader>
                <PrivacyPolicy className="max-h-[70vh] overflow-y-auto" />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>{t("Close.1")}</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard