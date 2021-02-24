<template>
  <base-modal>
    <template v-slot:header>Add a new Customer</template>
    <template v-slot:body>
      <ul class="newCustomer">
        <li>
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="customer.firstName" />
        </li>
        <li>
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="customer.lastName" />
        </li>
        <li>
          <label for="primaryAddress">Primary Address</label>
          <input
            type="text"
            id="primaryAddress"
            v-model="customer.customerDetail.primaryAddress"
          />
        </li>
        <li>
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="customer.customerDetail.email"
          />
        </li>
        <li>
          <label for="phone">Phone</label>
          <input
            type="text"
            id="phone"
            v-model="customer.customerDetail.phone"
          />
        </li>
        <li>
          <label for="primaryAddress">Alternate Address</label>
          <input
            type="text"
            id="alternateAddress"
            v-model="customer.customerDetail.alternateAddress"
          />
        </li>
        <li>
          <label for="city">City</label>
          <input type="text" id="city" v-model="customer.customerDetail.city" />
        </li>
        <li>
          <label for="city">State</label>
          <input
            type="text"
            id="state"
            v-model="customer.customerDetail.state"
          />
        </li>
        <li>
          <label for="city">PostalCode</label>
          <input
            type="text"
            id="postalCode"
            v-model="customer.customerDetail.postalCode"
          />
        </li>
        <li>
          <label for="city">Country</label>
          <input
            type="text"
            id="country"
            v-model="customer.customerDetail.country"
          />
        </li>
      </ul>
    </template>
    <template v-slot:footer>
      <base-button
        type="button"
        @button:click="save"
        aria-label="Save new customer"
        >Save New Customer Details</base-button
      >
      <base-button type="button" @button:click="close" aria-label="Close Modal"
        >Close</base-button
      >
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/modals/BaseModal.vue";
import { ICustomer } from "../../types/Customer";

@Component({
  name: "CreateCustomerModal",
  components: { BaseButton, BaseModal }
})
export default class CreateCustomerModal extends Vue {
  customer: ICustomer = {
    customerDetail: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: "",
    lastName: ""
  };

  save() {
    this.$emit("save:customer", this.customer);
  }

  close() {
    this.$emit("close");
  }
}
</script>
<style scoped lang="scss">
.newCustomer {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  input {
    width: 80%;
    height: 1.8rem;
    margin: 0.8rem 2rem 0.8rem 0.8rem;
    font-size: 1.1rem;
    line-height: 1.3rem;
    padding: 0.2rem;
    color: #555;
  }
  label {
    font-weight: bold;
    margin: 0.8rem;
    display: block;
  }
}
</style>
