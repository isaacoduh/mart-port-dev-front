<template>
  <div>
    <h1 id="customersTitle">Manage Customers</h1>
    <hr />
    <div class="customer-actions">
      <base-button @button:click="showCreateCustomerModal"
        >Create New Customer</base-button
      >
    </div>
    <table id="customers" class="table">
      <tr>
        <th>Customer</th>
        <th>Address</th>
        <th>State</th>
        <th>Since</th>
        <th>Delete</th>
      </tr>
      <tr v-for="(customer, index) in customers" :key="index">
        <td>
          {{ customer.firstName + " " + customer.lastName }}
        </td>
        <td>
          {{ customer.customerDetail.primaryAddress }}
        </td>
        <td>
          {{ customer.customerDetail.state }}
        </td>
        <td>
          {{ customer.createdAt | humanizeDate }}
        </td>
        <td>
          <div
            class="lni-cross-circle customer-delete"
            @click="deleteCustomer(customer.id)"
          >
            Delete
          </div>
        </td>
      </tr>
    </table>

    <create-customer-modal
      @close="closeModal"
      @save:customer="saveNewCustomer"
      v-if="isCustomerModalVisible"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ICustomer } from "../types/Customer";
import BaseButton from "@/components/BaseButton.vue";
import CustomerService from "../services/customer-service";
import CreateCustomerModal from "@/components/modals/CreateCustomerModal.vue";

const customerService = new CustomerService();

@Component({
  name: "Customers",
  components: { BaseButton, CreateCustomerModal }
})
export default class Customers extends Vue {
  customers: ICustomer[] = [];
  isCustomerModalVisible: boolean = false;

  showCreateCustomerModal() {
    this.isCustomerModalVisible = true;
  }

  closeModal() {
    this.isCustomerModalVisible = false;
  }

  async saveNewCustomer(newCustomer: ICustomer) {
    await customerService.addCustomer(newCustomer);
    this.isCustomerModalVisible = false;
    await this.initialize();
  }

  async deleteCustomer(id: number) {
    await customerService.deleteCustomer(id);
    await this.initialize();
  }

  async initialize() {
    this.customers = await customerService.getCustomers();
  }

  async created() {
    await this.initialize();
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/global.scss";
.customer-actions {
  display: flex;
  margin-bottom: 0.8rem;
  div {
    margin-right: 0.8rem;
  }
}
.customer-delete {
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  color: $solar-red;
}
</style>
