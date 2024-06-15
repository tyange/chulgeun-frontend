import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "@/components/ui/Button";

import { Sizes } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "radio",
      options: [...Object.values(Colors)],
    },
    size: {
      control: "radio",
      options: [...Object.values(Sizes)],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
