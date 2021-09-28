import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("counter component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });
  // test("debe de hacer match con snapshot", () => {
  //   const wrapper = shallowMount(Counter);
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  test('debe tener el valor por defecto', () => {

    expect(wrapper.find("h2").exists()).toBeTruthy();

    const $h2 = wrapper.find("h2").text();

    expect($h2).toBe("Counter")
  });

  test('el valor por defecto de ser 100', () => {

    const $p = wrapper.find("[data-test-id='counter']").text();
    
    expect($p).toBe("100");

  });
  
  test('debe de incrementar y decrementar en uno el valor del contador', async () => {
    const [$btnIncrease, $btnDecrease] = wrapper.findAll("button");
    
    await $btnIncrease.trigger("click"); // esperar renderizacion del componente
    await $btnIncrease.trigger("click");
    await $btnIncrease.trigger("click"); 
    
    await $btnDecrease.trigger("click")
    await $btnDecrease.trigger("click")

    const $p = wrapper.find("[data-test-id='counter']").text();

    expect($p).toBe("101")
  });
});
