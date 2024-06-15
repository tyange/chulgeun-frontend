import { ReactNode } from "react";

type BoxProps = {
  comingSoon?: boolean;
  children?: ReactNode;
};

export default function Box({ comingSoon = false, children }: BoxProps) {
  return (
    <div className="flex w-fit items-center justify-center rounded-lg border border-gray-300 bg-white bg-opacity-90 p-10 text-black shadow-md">
      {comingSoon ? "Coming Soon!" : children}
    </div>
  );
}
