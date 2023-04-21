import googleController from "../../controllers/googleController.js";

describe("Google controller", () => {
  it("Debería obterner resultados de la busqueda", async () => {
    const query = "stackoverflow";
    const links = await googleController.searchLinks(query);
    expect(links).toContain("https://stackoverflow.com/");
  }, 10000);
});
