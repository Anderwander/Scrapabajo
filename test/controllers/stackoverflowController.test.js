import stackoverflowController from "../../controllers/stackoverflowController.js";
import Parser from "../../utils/parser.js";
import Scraper from "../../utils/scraper.js";

describe("stackoverflow controller", () => {
  it("Debería mostrar el contenido de la página", async () => {
    const query = "Error: Failed to lookup view in Express";
    const { title /*links, paragraphs, images*/ } =
      await stackoverflowController.getContent(query);
    expect(title).toContain("Error: Failed to lookup view in Express");
    //expect(links).toContain("/wiki/Felis_silvestris");
    //expect(paragraphs[0]).toContain("El gato doméstico");
    /*expect(images).toContain(
      "upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Gato_Siam%C3%A9s_ojos_azules.JPG/220px-Gato_Siam%C3%A9s_ojos_azules.JPG"
    );*/
  }, 20000);
});
