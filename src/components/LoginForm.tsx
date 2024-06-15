import { useForm } from "react-hook-form";

import { Colors } from "@/constants/Colors";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Suitability } from "@/constants/Suitability";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(() => console.log("hi"))}
    >
      <Input
        type="text"
        autoComplete="username"
        label="ID"
        register={register}
      />
      <Input
        type="password"
        autoComplete="current-password"
        label="PW"
        register={register}
      />
      <Button
        type="submit"
        label="로그인"
        color={Colors.info}
        suitability={Suitability.full}
      />
      <Button
        label="가입하기"
        color={Colors.neutral}
        suitability={Suitability.full}
      />
    </form>
  );
}
