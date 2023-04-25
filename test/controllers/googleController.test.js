import googleController from "../../controllers/googleController.js";

/**
 * Descripción breve de la prueba.
 * @private
 * @group GoogleController
 */
describe("Google controller", () => {
  /**
   * Prueba para obtener resultados de búsqueda.
   * @private
   * @async
   * @function
   * @param {number} timeout - Tiempo máximo de espera en milisegundos.
   */
  it("Debería obterner resultados de la busqueda", async () => {
    const query = "stackoverflow";
    const links = await googleController.searchLinks(query);
    expect(links).toContain("https://stackoverflow.com/");
  }, 10000);
});
