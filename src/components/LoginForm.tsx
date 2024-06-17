import { useForm } from "react-hook-form";

import { Colors } from "@/constants/Colors";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Suitability } from "@/constants/Suitability";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();

  const googleLoginParams = new URLSearchParams({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: "http://localhost:5173/auth/google/callback",
    scope: "https://www.googleapis.com/auth/userinfo.email",
    include_granted_scopes: "true",
    response_type: "code",
  });

  const googleLoginUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    googleLoginParams.toString();

  return (
    <div className="flex flex-col gap-5">
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
      </form>
      <Button
        type="submit"
        label="가입하기"
        color={Colors.accent}
        suitability={Suitability.full}
      />
      <a href={googleLoginUrl}>
        <Button
          label="구글 로그인"
          color={Colors.neutral}
          suitability={Suitability.full}
        />
      </a>
    </div>
  );
}
