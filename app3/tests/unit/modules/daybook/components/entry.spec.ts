import { shallowMount } from "@vue/test-utils";
import EntryVue from "@/modules/daybook/components/Entry.vue";
import { journalState } from "../../../mocks/journal-state";

describe("tests componet Entry", () => {
  const $router = {
    push: jest.fn(),
  };

  const wrapper = shallowMount(EntryVue, {
    props: {
      entry: journalState.entries[0],
    },
    global: {
      mocks: {
        $router,
      },
    },
  });

  test("debe de hacer to match snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de redireccionar al hacer click en el entry-container", () => {
    const div = wrapper.find(".entry-container");
    div.trigger("click");

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: journalState.entries[0].id },
    });
  });

  test("pruebas en las propiedades computadas", () => {
    const date = journalState.entries[0].date;
    // console.log(date); //Tue Mar 22 2022
    expect(wrapper.vm.day).toBe(22);
    expect(wrapper.vm.mouth).toBe("Marzo");
    expect(wrapper.vm.yearDay).toBe("2022, Martes");
  });
});
