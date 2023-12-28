import React, { useEffect, useState } from "react"
import { validateSiteCode } from "@/actions/siteActions"
import { Loader2 } from "lucide-react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  // DialogOverlay,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Loader from "./Loader"

const CreateSiteModal = ({ children }) => {
  const history = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [code, setCode] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [error, setError] = useState(false)
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const siteDetails = useSelector((state) => state.site)
  const { siteValidation } = siteDetails

  const register = () => {
    if (code.length < 1) {
      setError(true)
      return
    }

    dispatch(validateSiteCode(code))
  }

  useEffect(() => {
    if (!openModal) {
      setCode("")
    }
  }, [openModal])

  useEffect(() => {
    setIsLoading(siteValidation.loading)
    if (siteValidation.error) {
      toast.error(siteValidation.error.data.title)
    } else if (siteValidation.validated == true) {
      setOpenModal((open) => !open)
      history("/dashboard/siteDetail")
    } else if (siteValidation.validated == false) {
      toast.error("Site code does not validate.")
    }
  }, [siteValidation])

  return (
    <Dialog
      open={openModal}
      onOpenChange={setOpenModal}
    >
      <DialogTrigger>
        {" "}
        {/* <Button className="gap-4">
          <Plus />
          <span>{t("Create Site.1")}</span>
        </Button> */}
        {children}
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
                setCode(e.target.value)
                setError(false)
              }}
            />
            {error && (
              <span className="flex flex-start text-red-500">
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
          <Button
            type="button"
            onClick={register}
          >
            {isLoading && <Loader2 className="mr-2 h-8 w-8 animate-spin" />}{" "}
            {t("Register")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

CreateSiteModal.propTypes = {
  children: PropTypes.node,
}

export default CreateSiteModal
