<template>
  <base-modal>
    <template v-slot:header>
      Receive Shipment
    </template>
    <template v-slot:body>
      <label for="material">Material Recieved:</label>
      <select v-model="selectedMaterial" class="shipmentItems" id="material">
        <option disabled value="">Please Select One</option>
        <option v-for="item in stock" :value="item" :key="item.material.id">
          {{ item.material.name }}
        </option>
      </select>
      <label for="quantityRecieved">Quantity Recieved:</label>
      <input type="number" id="quantityRecieved" v-model="quantityRecieved" />
    </template>
    <template v-slot:footer>
      <base-button
        type="button"
        @button:click="save"
        aria-label="Save Shipment Details"
        >Save Shipment</base-button
      >
      <base-button type="button" @button:click="close" aria-label="Close Modal"
        >Close</base-button
      >
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/modals/BaseModal.vue";
import { IMaterial, IMaterialStock } from "@/types/Material";
import { IShipment } from "@/types/Shipment";

@Component({
  name: "ShipmentModal",
  components: { BaseButton, BaseModal }
})
export default class ShipmentModal extends Vue {
  @Prop({ required: true, type: Array as () => IMaterialStock[] })
  stock!: IMaterialStock[];

  selectedMaterial: IMaterial = {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0,
    description: "",

    name: "",
    price: 0,
    isArchived: false
  };
  quantityRecieved: number = 0;
  close() {
    this.$emit("close");
  }
  save() {
    let shipment: IShipment = {
      materialId: this.selectedMaterial.id,
      adjustment: this.quantityRecieved
    };
    this.$emit("save:shipment", shipment);
  }
}
</script>
