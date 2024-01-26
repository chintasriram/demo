import { Social } from ".";

export default {
  title: "Components/Social",
  component: Social,
  argTypes: {
    property1: {
      options: ["youtube", "tiktok", "insta", "multiple", "people"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "youtube",
    propertyInstaClassName: {},
  },
};
