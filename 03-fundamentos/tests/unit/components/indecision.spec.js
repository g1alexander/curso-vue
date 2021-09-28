import Indecision from "@/components/Indecision.vue"
import { shallowMount } from "@vue/test-utils"

describe('componente Indecision.vue', () => {
  let wrapper = shallowMount(Indecision);
  let clgSpy;
  let getWtfSpy;
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      "answer": "yes",
      "forced": false,
      "image": "https://yesno.wtf/assets/yes/2.gif"
    })
  }));

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, 'log');
    getWtfSpy = jest.spyOn(wrapper.vm, 'getWtf'); //.vm accede al script de vue

    jest.clearAllMocks() //limpia mock por cada test
  })

  
  test('match con snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  });


  test('escribir en el input no debe disparar nada (console.log)', async () => {

    const $input = wrapper.find("input");
    await $input.setValue("hola mundo")

    expect(clgSpy).toHaveBeenCalled()
    expect(getWtfSpy).not.toHaveBeenCalled()
    
  });
  
  test('escribir simbolo de interrogacion dispara getWtf', async () => {
    const $input = wrapper.find("input");
    await $input.setValue("hola?");
    
    expect(clgSpy).toHaveBeenCalled()
    expect(getWtfSpy).toHaveBeenCalled();
  });

  test('pruebas getWtf', async () => {
    await wrapper.vm.getWtf();
    
    const $img = wrapper.find("img");
    
    expect($img).toBeTruthy()
    expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif");
    expect(wrapper.vm.answer).toBe("yes")
  });
  
  test('fallo en el api', async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    
    await wrapper.vm.getWtf();
    const $img = wrapper.find("img");
    expect($img.exists()).toBeFalsy()
    expect(wrapper.vm.answer).toBe("no se pudo cargar el api")
  });
});