import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("counter component", () => {
  test("debe de hacer match con snapshot", () => {
    const wrapper = shallowMount(Counter);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
