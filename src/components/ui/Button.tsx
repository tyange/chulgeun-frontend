import classNames from "classnames";

import { Colors } from "@/constants/Colors";
import { Sizes } from "@/constants/Sizes";

const PaddingX: { [Key in Sizes]: string } = {
  [Sizes.xs]: "px-3",
  [Sizes.sm]: "px-5",
  [Sizes.md]: "px-10",
  [Sizes.lg]: "px-15",
};

const BtnColors: { [Key in Colors]: string } = {
  [Colors.primary]: "btn-primary",
  [Colors.secondary]: "btn-secondary",
  [Colors.accent]: "btn-accent",
  [Colors.success]: "btn-success",
  [Colors.warning]: "btn-warning",
  [Colors.error]: "btn-error",
  [Colors.neutral]: "btn-neutral",
};

type ButtonProps = {
  isShow?: boolean;
  label?: string;
  color?: Colors;
  size?: Sizes;
  onClick?: () => void;
};

export default function Button({
  isShow = true,
  label = "Button",
  color = Colors.primary,
  size = Sizes.sm,
  onClick,
}: ButtonProps) {
  if (!isShow) {
    return null;
  }

  const cName = classNames([
    "btn",
    "btn-square",
    "w-fit",
    BtnColors[color],
    PaddingX[size],
  ]);

  return (
    <button className={cName} onClick={onClick}>
      {label}
    </button>
  );
}
