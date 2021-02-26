<template>
  <div class="inventory-container">
    <h1 id="inventoryTitle">Dashboard</h1>
    <hr />
    <stock-chart />
    <div class="inventory-actions">
      <base-button @button:click="showCreateMaterialModal" id="addNewBtn"
        >Add New Material Information</base-button
      >
      <base-button @button:click="showShipmentModal" id="recieveShipmentBtn"
        >Recieve Shipment</base-button
      >
    </div>

    <table id="inventoryTable" class="table">
      <tr>
        <th>Item</th>
        <th>Available Quantity</th>
        <th>Unit Price</th>

        <th>Delete</th>
      </tr>
      <tr v-for="item in stock" :key="item.id">
        <td>
          {{ item.material.name }}
        </td>
        <td
          v-bind:class="
            `${applyColor(item.availableQuantity, item.idealQuantity)}`
          "
        >
          {{ item.availableQuantity }}
        </td>
        <td>
          {{ item.material.price | price }}
        </td>
        <td>
          <div
            class="lni-cross-circle product-archive"
            @click="archiveMaterial(item.material.id)"
          >
            Archive
          </div>
        </td>
      </tr>
    </table>

    <create-material-modal
      v-if="isCreateMaterialVisible"
      @save:material="saveNewMaterial"
      @close="closeModals"
    />

    <shipment-modal
      v-if="isShipmentVisible"
      :stock="stock"
      @save:shipment="saveNewShipment"
      @close="closeModals"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IMaterial, IMaterialStock } from "../types/Material";
import { IShipment } from "../types/Shipment";
import { StockService } from "../services/stock-service";

import { MaterialService } from "../services/material-service";
import BaseButton from "@/components/BaseButton.vue";
import CreateMaterialModal from "@/components/modals/CreateMaterialModal.vue";
import ShipmentModal from "@/components/modals/ShipmentModal.vue";
import StockChart from "@/components/charts/StockChart.vue";

const stockService = new StockService();
const materialService = new MaterialService();

@Component({
  name: "Stock",
  components: { BaseButton, CreateMaterialModal, ShipmentModal, StockChart }
})
export default class Stock extends Vue {
  isCreateMaterialVisible: boolean = false;
  isShipmentVisible: boolean = false;

  stock: IMaterialStock[] = [];
  async archiveMaterial(materialId: number) {
    await materialService.archive(materialId);
    await this.initialize();
  }

  async saveNewMaterial(newMaterial: IMaterial) {
    await materialService.save(newMaterial);
    this.isCreateMaterialVisible = false;
    await this.initialize();
  }

  applyColor(current: number, target: number) {
    if (current <= 0) {
      return "red";
    }
    if (target > current) {
      return "yellow";
    }
    return "green";
  }

  closeModals() {
    this.isCreateMaterialVisible = false;
    this.isShipmentVisible = false;
  }

  showCreateMaterialModal() {
    this.isCreateMaterialVisible = true;
  }

  showShipmentModal() {
    this.isShipmentVisible = true;
  }

  async saveNewShipment(shipment: IShipment) {
    await stockService.updateStockQuantity(shipment);
    this.isShipmentVisible = false;
    await this.initialize();
  }
  async initialize() {
    this.stock = await stockService.getStock();
    await this.$store.dispatch("assignSnaphots");
  }
  async created() {
    await this.initialize();
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/global.scss";
.green {
  font-weight: bold;
  color: $solar-green;
}
.yellow {
  font-weight: bold;
  color: $solar-yellow;
}
.red {
  font-weight: bold;
  color: $solar-red;
}
.inventory-actions {
  display: flex;
  margin-bottom: 0.8rem;
}
.product-archive {
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  color: $solar-red;
}
</style>
