import { make } from "vuex-pathify";

import { IStockTimeline } from "@/types/StockGraph";
import { StockService } from "@/services/stock-service";

class GlobalStore {
  snapshotTimeline: IStockTimeline = {
    materialStockSnapshots: [],
    timeline: []
  };

  isTimelineBuilt: boolean = false;
}

const state = new GlobalStore();

const mutations = make.mutations(state);

const actions = {
  async assignSnapshots({ commit }) {
    const stockService = new StockService();
    let res = await stockService.getSnapshotHistory();
    let timeline: IStockTimeline = {
      materialStockSnapshots: res.materialStockSnapshots,
      timeline: res.timeline
    };
    commit("SET_SNAPSHOT_TIMELINE", timeline);
    commit("SET_IS_TIMELINE_BUILT", true);
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
