import type { Meta, StoryFn } from "@storybook/react";

import Input from "@/components/ui/Input";

import { useForm } from "react-hook-form";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

const Template: StoryFn = (args) => {
  const { register } = useForm();
  return <Input type={args.type} label={args.label} register={register} />;
};

export default meta;

export const Text = Template.bind({});
Text.args = {
  type: "text",
  label: "TEST",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  label: "PW",
};
