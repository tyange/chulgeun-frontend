import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useMutationState } from "@tanstack/react-query";
import { match } from "ts-pattern";
import axios from "axios";

import Box from "@/components/ui/Box";

export default function GoogleAuthPage() {
  const initialized = useRef(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  const mutation = useMutation({
    mutationKey: ["googleLogin"],
    mutationFn: async (c: string) =>
      await axios.post("http://localhost:8080/auth/google", { code: c }),
    // TODO: 성공일 때의 처리
    onSuccess: () => console.log("hi"),
    // TODO: 에러 발생했을 때의 처리 (code가 만료됐을 경우, 실제 네트워크 오류인 경우를 분리)
    onError: () => console.log("bye"),
  });

  const [mutationState] = useMutationState({
    filters: { mutationKey: ["googleLogin"] },
    select: (mutation) => mutation.state,
  });

  useEffect(() => {
    if (code && !initialized.current) {
      mutation.mutate(code);
      initialized.current = true;
    }
  }, []);

  return (
    <Box>
      <p>
        {match(mutationState)
          .with({ status: "pending" }, () => "구글 로그인을 시도하는 중입니다.")
          .with({ status: "error" }, () => "구글 로그인에 실패했습니다.")
          .with(
            { status: "success" },
            () => "구글 로그인에 성공했습니다. 페이지를 벗어납니다.",
          )
          .otherwise(() => "")}
      </p>
    </Box>
  );
}
