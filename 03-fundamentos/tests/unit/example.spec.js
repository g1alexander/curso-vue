describe("Example component", () => {
  test("debe ser mayor a 10", () => {
    // arreglar
    let value = 5;

    //estimulo
    value += 6;

    //observar resultado
    expect(value).toBeGreaterThan(10);
  });
});
