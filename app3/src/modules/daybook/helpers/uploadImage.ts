import { cloudinaryApi } from "@/api/cloudinaryApi";
import { ImageAPI } from "@/api/interfaces/ImageApi";
import { AxiosError } from "axios";

export async function uploadImage(file: File): Promise<void> {
  // if (!file) return "no hay imagen";

  try {
    const formData = new FormData();

    formData.append("upload_preset", "curso-vue");
    formData.append("file", file);

    const { data } = await cloudinaryApi.post<ImageAPI>(
      "/dlgvxohur/image/upload",
      formData
    );

    console.log(data);

    // return data.secure_url;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
}
