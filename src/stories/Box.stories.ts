import type { Meta, StoryObj } from "@storybook/react";

import Box from "@/components/ui/Box";

const meta = {
  title: "Components/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      "The history and civilization of humanity have undergone continuous changes and developments. Thousands of years ago, humans lived a hunter-gatherer lifestyle, harmonizing with nature. During this time, the agricultural revolution occurred, leading humans to settle down and form the foundation of civilization. The development of agriculture increased food production, enabling population growth and the formation of cities. These changes altered social and economic structures, and humanity subsequently advanced various cultures and technologies.",
  },
};

export const ComingSoon: Story = {
  args: {
    comingSoon: true,
  },
};
