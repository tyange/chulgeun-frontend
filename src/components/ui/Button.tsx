import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

import { Colors } from "@/constants/Colors";
import { Sizes } from "@/constants/Sizes";
import { Suitability } from "@/constants/Suitability";

const Width: { [Key in Suitability]: string } = {
  [Suitability.fit]: "w-fit",
  [Suitability.full]: "w-full",
};

const PaddingX: { [Key in Sizes]: string } = {
  [Sizes.xs]: "px-3",
  [Sizes.sm]: "px-5",
  [Sizes.md]: "px-10",
  [Sizes.lg]: "px-14",
};

const BtnColors: { [Key in Colors]: string } = {
  [Colors.primary]: "btn-primary",
  [Colors.secondary]: "btn-secondary",
  [Colors.accent]: "btn-accent",
  [Colors.success]: "btn-success",
  [Colors.warning]: "btn-warning",
  [Colors.error]: "btn-error",
  [Colors.info]: "btn-info",
  [Colors.neutral]: "btn-neutral",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isShow?: boolean;
  label?: string;
  color?: Colors;
  size?: Sizes;
  suitability?: Suitability;
  onClick?: () => void;
}

export default function Button({
  type = "button",
  isShow = true,
  label = "Button",
  color = Colors.primary,
  size = Sizes.sm,
  suitability = Suitability.fit,
  onClick,
}: ButtonProps) {
  if (!isShow) {
    return null;
  }

  const cName = classNames([
    "btn",
    "btn-square",
    "shadow-md",
    Width[suitability],
    BtnColors[color],
    PaddingX[size],
  ]);

  return (
    <button type={type} className={cName} onClick={onClick}>
      {label}
    </button>
  );
}
