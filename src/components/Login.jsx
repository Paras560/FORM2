import React, { useEffect, useState } from "react";
import Logo from "./../assets/Images/lochosm.png";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import LangSwitch from "./LangSwitch";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()

    .required("Password is required"),
});

function Login() {
  const url = "/api/Account/login";

  const [visible, setvisible] = useState(false);

  const [lang, setlang] = useState("jpn");

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: "example@email.com",
      password: "defaultPassword",
    },
    resolver: yupResolver(schema),
  });
  console.log(errors);

  const loginmutation = useMutation({
    mutationFn: (item) => axios.post(url, item),
  });

  const submitFunction = async () => {
    loginmutation.mutate({
      email: watch("email"),
      password: watch("password"),
    });
  };
  useEffect(() => {
    clearErrors();
  }, [watch("email"), watch("password")]);

  return (
    <div className="flex flex-col gap-4 items-center pt-10">
      <img className="w-48" src={Logo}></img>

      <div className="flex flex-col gap-4  shadow-md   rounded-lg p-4 mt-16  lg:p-10 lg:shadow-lg ">
        <div className="text-4xl font-medium font-montserrat text-left text-36 leading-48 tracking-normal">
          Login
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-sm font-semibold font-open-sans text-left text-14 leading-20 tracking-normal ">
            Email Address
          </div>
          <Input
            value={watch("email")}
            type="text"
            placeholder="your.email@example.com"
            onChange={(e) => {
              setValue("email", e.target.value);
            }}
            className={errors.email ? "border-destructive" : ""}
          />
          <span
            className="text-red-400
          "
          >
            {errors.email?.message}
          </span>
        </div>

        <div className="flex flex-col gap-4 ">
          {/* <Eye/> */}

          <div className="text-sm font-semibold font-open-sans text-left text-14 leading-20 tracking-normal">
            Password
          </div>

          <div className="relative">
            <div
              className="absolute right-1 top-2"
              onClick={() => setvisible(!visible)}
            >
              {visible ? <EyeOff /> : <Eye />}
            </div>

            <Input
              value={watch("password")}
              type={visible ? "password" : "text"}
              onChange={(e) => {
                setValue("password", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4  text-sm font-semibold font-open-sans text-left text-14 leading-20 tracking-normal">
          <div className="flex gap-2 items-center">
            <Checkbox />
            Remember password
          </div>
          <div className="underline">Forget password</div>
        </div>
        <Button onClick={handleSubmit(submitFunction)}>
          Login
          {loginmutation.isPending ? <Loader2 className="animate-spin" /> : ""}
        </Button>
        <div>
          Don’t have an account?{" "}
          <span className="text-blue-500">Register Now.</span>
        </div>
      </div>
      <LangSwitch lang={lang} setLang={setlang} />
    </div>
  );
}

export default Login;
