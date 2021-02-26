import axios from "axios";

import { IMaterialStock } from "@/types/Material";
import { IShipment } from "@/types/Shipment";
import { IStockTimeline } from "@/types/StockGraph";
// timeline

export class StockService {
  API_URL = process.env.VUE_APP_API_URL;

  public async getStock(): Promise<IMaterialStock[]> {
    let result = await axios.get(`${this.API_URL}/stock/`);
    return result.data;
  }

  public async updateStockQuantity(shipment: IShipment) {
    let result = await axios.patch(`${this.API_URL}/stock/`, shipment);
    return result.data;
  }

  public async getSnapshotHistory(): Promise<IStockTimeline> {
    let result: any = await axios.get(`${this.API_URL}/stock/snapshot`);
    return result.data;
  }
}
