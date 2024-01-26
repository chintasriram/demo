import { Like } from ".";

export default {
  title: "Components/Like",
  component: Like,
  argTypes: {
    property1: {
      options: ["variant-3", "hover", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "variant-3",
    className: {},
  },
};
