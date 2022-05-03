import axios from "axios";
import cloudinary from "cloudinary";

import { uploadImage } from "@/modules/daybook/helpers/uploadImage";

cloudinary.v2.config({
  cloud_name: "dlgvxohur",
  api_key: "417778494232396",
  api_secret: "7FG9HtG2AbDA48mY6SVUuuolllk",
});
describe("pruebas en el uploadImage", () => {
  test("debe de cargar un archivo y retornar el url", async (done) => {
    const { data } = await axios.get(
      "https://res.cloudinary.com/dlgvxohur/image/upload/v1642734059/proyectos/peqvhnhihwtxa7asucnl.jpg",
      {
        responseType: "arraybuffer",
      }
    );

    const file = new File([data], "photo.jpg");

    const url = await uploadImage(file);

    expect(url.includes("https://res.cloudinary.com")).toBeTruthy();

    // Tomar el ID
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    cloudinary.v2.api.delete_resources(
      imageId as unknown as string[],
      {},
      () => {
        done();
      }
    );
  });
});
