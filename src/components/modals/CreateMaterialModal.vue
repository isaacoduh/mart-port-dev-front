<template>
  <base-modal>
    <template v-slot:header>
      Add New Material
    </template>
    <template v-slot:body>
      <ul class="newProduct">
        <li>
          <label for="materialName">Name</label>
          <input type="text" id="materialName" v-model="newMaterial.name" />
        </li>
        <li>
          <label for="materialDesc">Description</label>
          <input
            type="text"
            id="materialDescription"
            v-model="newMaterial.description"
          />
        </li>
        <li>
          <label for="materialPrice">Price (NGN)</label>
          <input type="number" id="materialPrice" v-model="newMaterial.price" />
        </li>
      </ul>
    </template>
    <template v-slot:footer>
      <base-button
        type="button"
        @click.native="save"
        aria-label="save new material"
        >Save Material</base-button
      >
      <base-button type="button" @click.native="close" aria-label="close modal"
        >Close</base-button
      >
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/modals/BaseModal.vue";
import { IMaterial, IMaterialStock } from "../../types/Material";

@Component({
  name: "CreateMaterialModal",
  components: { BaseButton, BaseModal }
})
export default class CreateMaterialModal extends Vue {
  newMaterial: IMaterial = {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0,
    description: "",
    name: "",
    price: 0,
    isArchived: false
  };

  close() {
    this.$emit("close");
  }

  save() {
    this.$emit("save:material", this.newMaterial);
  }
}
</script>

<style scoped lang="scss">
.newProduct {
  list-style: none;
  padding: 0;
  margin: 0;
  input {
    width: 100%;
    height: 1.8rem;
    margin-bottom: 1.2rem;
    font-size: 1.1rem;
    line-height: 1.3rem;
    padding: 0.2rem;
    color: #555;
  }
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.3rem;
  }
}
</style>
