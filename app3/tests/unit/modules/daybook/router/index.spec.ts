import daybookRouter from "@/modules/daybook/router";
import { ensure } from "@/modules/daybook/utils/ensure";
// import { RouteRecordRaw } from "vue-router";
// import { RouteComponent } from 'vue-router';
// import { default } from '../../../../../src/modules/daybook/store/state';

describe("pruebas en el router modulo daybook", () => {
  test("el router debe de tener esta configuracion", async () => {
    expect(daybookRouter).toMatchObject({
      path: "/daybook",
      name: "daybook",
      component: expect.any(Function),

      children: [
        {
          path: "",
          name: "no-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });

    const promisesRoutes: any[] = [];

    if (daybookRouter.children) {
      daybookRouter.children.forEach((child) =>
        promisesRoutes.push(child.component())
      );
    }

    const routes = (await Promise.all(promisesRoutes)).map(
      (r) => r.default.name
    );

    expect(routes).toContain("NoEntrySelected");
    expect(routes).toContain("EntryView");

    // expect((await daybookRouter?.children[0].component()).default.name);
  });

  test("debe de retornar el id de la ruta", () => {
    const route = {
      params: {
        id: "ABC-123",
      },
    };

    // if (daybookRouter.children[1].props) {
    //   expect(daybookRouter.children[1].props(route)).toEqual({ id: "ABC-123" });
    // }
    if (daybookRouter.children) {
      const entryRoute = daybookRouter.children.find(
        (route) => route.name === "entry"
      );

      const props = ensure(entryRoute?.props);

      expect(props(route)).toEqual({ id: "ABC-123" });
    }
  });
});
