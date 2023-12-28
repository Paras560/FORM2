import React, { useEffect, useState } from "react";
import logo from "./../assets/Images/lochosm.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function Registration() {
  const [shown, setshown] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "example@email.com",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const registrationMutatiom = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("/api/Account/register", newTodo);
    },
  });

  useEffect(() => {
    clearErrors();
  }, [watch("email"), watch("password"), watch("confirmPassword")]);

  const registerFunction = async () => {
    registrationMutatiom.mutate({
      email: watch("email"),
      password: watch("password"),
      confirmPassword: watch("confirmPassword"),
    });
  };

  if (registrationMutatiom.isPending) {
    return <>pending</>;
  }

  return (
    <div>
      <div className="flex pt-8 gap-4 flex-col items-center">
        <img className="w-48" src={logo} />
        <div className="flex flex-col gap-4 shadow-md rounded-lg p-4 mt-16 lg:p-10 lg:shadow-lg ">
          <div>
            <div className="text-3xl font-medium font-montserrat text-30 font-semibold leading-42 tracking-normal text-left">
              Registration
            </div>
          </div>
          <div className="w-full h-[22px]  gap-4">Email</div>
          <div>
            <Input
              value={watch("email")}
              onChange={(e) => setValue("email", e.target.value)}
              type="text"
              placeholder="info@smartchouery.com"
              className={errors?.email ? "border-destructive" : ""}
            />
            <span className={errors?.email ? "text-red-500" : ""}>
              {errors?.email?.message}
            </span>
          </div>
          <div className="w-full h-[22px]  gap-4"> Password</div>
          <div className="relative">
            <div
              className="  absolute right-0 p-2"
              onClick={() => setshown(!shown)}
            >
              {shown ? <EyeOff /> : <Eye />}
            </div>
            <Input
              value={watch("password")}
              onChange={(e) => setValue("password", e.target.value)}
              type={shown ? "password" : "text"}
              className={errors?.password ? "border-destructive" : ""}
            />
            <span className={errors?.email ? "text-red-500" : ""}>
              {errors?.password?.message}
            </span>
          </div>
          <div className="w-full h-[22px]  gap-4">Confirm password</div>
          <div className="relative">
            <div
              className="absolute right-1 p-1"
              onClick={() => setshown(!shown)}
            >
              {shown ? <EyeOff /> : <Eye />}
            </div>
            <Input
              value={watch("confirmPassword")}
              onChange={(e) => setValue("confirmPassword", e.target.value)}
              type={shown ? "password" : "text"}
              className={errors?.confirmPassword ? "border-destructive" : ""}
            />
            <span className={errors?.email ? "text-red-500" : ""}>
              {errors?.confirmPasswords?.message}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox />
            <div>Accept terms and condition</div>
          </div>
          <div className="flex  items-center  place-content-center">
            <Button onClick={handleSubmit(registerFunction)}> Register</Button>
          </div>
          <div className="flex  items-center  place-content-center">
            Already registered? Login here.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
