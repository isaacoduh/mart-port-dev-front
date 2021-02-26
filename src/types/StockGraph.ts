export interface IStockTimeline {
  materialStockSnapshots: ISnapshot[];
  timeline: Date[];
}

export interface ISnapshot {
  materialId: number;
  availableQuantity: number[];
}
