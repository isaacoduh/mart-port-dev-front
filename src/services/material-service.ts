import axios from "axios";
import { IMaterial } from "../types/Material";

export class MaterialService {
  API_URL = process.env.VUE_APP_API_URL;
  async archive(materialId: number) {
    let result = await axios.patch(`${this.API_URL}/material/${materialId}`);
    return result.data;
  }

  async save(newMaterial: IMaterial) {
    let result = await axios.post(`${this.API_URL}/material/`, newMaterial);
    return result.data;
  }
}
