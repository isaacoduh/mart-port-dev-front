<template>
  <div class="side-menu-container">
    <router-link to="/">
      <img
        id="imgLogo"
        alt="mart port logo"
        src="../assets/images/martapplogo.jpg"
      />
    </router-link>
    <h1>MartPort App</h1>
    <base-button
      id="menuInventory"
      is-full-width
      @button:click="goToRoute('/stock')"
      >Manage Stock</base-button
    >
    <base-button
      id="menuCustomers"
      is-full-width
      @button:click="goToRoute('/customers')"
      >Manage Customers</base-button
    >
    <base-button
      id="menuInvoice"
      is-full-width
      @button:click="goToRoute('/invoice/new')"
      >Create Invoice</base-button
    >
    <base-button
      id="menuOrders"
      is-full-width
      @button:click="goToRoute('/orders')"
      >Orders</base-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
@Component({
  name: "SideNav",
  components: { BaseButton }
})
export default class SideNav extends Vue {
  async goToRoute(route: string) {
    await this.$router.push(route);
  }
}
</script>
<style scoped lang="scss">
@import "@/scss/global.scss";
.side-menu-container {
  background-color: #fcfcfc;
  height: 100vh;
  width: $menu-width;
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
}
#imgLogo {
  width: 100%;
}
h1 {
  font-size: 1.2rem;
  margin: 1rem 0;
}
</style>
