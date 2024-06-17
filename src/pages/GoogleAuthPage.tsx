import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Box from "@/components/ui/Box";

export default function GoogleAuthPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  const runOnlyOnce = useRef(false);

  const postCode = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/google", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      console.log(data);
    } catch (err) {
      console.error(err);
      console.error("구글 인증 코드를 보내는데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!runOnlyOnce.current) {
      postCode();
    }

    return () => {
      runOnlyOnce.current = true;
    };
  }, []);
  return (
    <Box>
      <p>구글 로그인을 시도하는 중입니다...</p>
    </Box>
  );
}
