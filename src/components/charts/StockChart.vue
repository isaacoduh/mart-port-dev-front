<template>
  <div v-if="isTimelineBuilt">
    <apexchart
      type="area"
      :width="'100%'"
      height="300"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IStockTimeline } from "../../types/StockGraph";
import { Get, Sync } from "vuex-pathify";

import moment from "moment";

import VueApexCharts from "vue-apexcharts";
Vue.component("apexchart", VueApexCharts);

@Component({
  name: "InventoryChart",
  components: {}
})
export default class StockChart extends Vue {
  @Sync("snapshotTimeline")
  snapshotTimeline: IStockTimeline;

  @Get("isTimelineBuilt")
  isTimelineBuilt: boolean;

  get options() {
    return {
      dataLabels: { enabled: false },
      fill: {
        type: "gradient"
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        categories: this.snapshotTimeline.timeline,
        type: "datetime"
      }
    };
  }

  get series() {
    return this.snapshotTimeline.materialStockSnapshots.map(snapshot => ({
      name: snapshot.materialId,
      data: snapshot.availableQuantity
    }));
  }

  async created() {
    await this.$store.dispatch("assignSnapshots");
  }
}
</script>
