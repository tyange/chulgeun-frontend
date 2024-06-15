import { ReactNode } from "react";

type BoxProps = {
  comingSoon?: boolean;
  children?: ReactNode;
};

export default function Box({ comingSoon = false, children }: BoxProps) {
  return (
    <div className="rounded-lg bg-white bg-opacity-90 p-10 text-black">
      {comingSoon ? "Coming Soon!" : children}
    </div>
  );
}
