import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { match } from "ts-pattern";
import axios from "axios";

import Box from "@/components/ui/Box";
import { useEffect } from "react";

export default function GoogleAuthPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  const mutation = useMutation({
    mutationFn: (c: string) =>
      axios.post("http://localhost:8080/auth/google", { code: c }),
    // TODO: 성공일 때의 처리
    // TODO: 에러 발생했을 때의 처리 (code가 만료됐을 경우, 실제 네트워크 오류인 경우를 분리)
  });

  useEffect(() => {
    if (code) {
      mutation.mutate(code);
    }
  }, []);

  return (
    <Box>
      <p>
        {match(mutation)
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
