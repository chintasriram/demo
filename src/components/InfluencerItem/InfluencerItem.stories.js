import { InfluencerItem } from ".";

export default {
  title: "Components/InfluencerItem",
  component: InfluencerItem,
  argTypes: {
    property1: {
      options: ["variant-2", "past-hire", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "variant-2",
    className: {},
    socialPropertyInstaClassName: {},
  },
};
