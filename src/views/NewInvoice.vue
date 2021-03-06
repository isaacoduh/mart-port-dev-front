<template>
  <div>
    <h1 id="invoiceTitle">
      New Invoice
    </h1>
    <hr />
    <div class="invoice-step" v-if="invoiceStep === 1">
      <h2>Step 1: Select Customer</h2>
      <div class="invoice-step-detail" v-if="customers.length">
        <label for="customer">Customer:</label>
        <select
          id="customer"
          v-model="selectedCustomerId"
          class="invoice-customers"
        >
          <option disabled value="">Please select a customer</option>
          <option v-for="c in customers" :value="c.id" :key="c.id">
            {{ c.firstName + " " + c.lastName }}
          </option>
        </select>
      </div>
    </div>
    <div class="invoice-step" v-if="invoiceStep === 2">
      <h2>Step 2: Create Order</h2>
      <div class="invoice-step-detail" v-if="stock.length">
        <label for="material">Material:</label>
        <select
          v-model="newItem.material"
          class="invoiceLineItem"
          id="material"
        >
          <option disabled value="">Select a material</option>
          <option v-for="i in stock" :value="i.material" :key="i.material.id">
            {{ i.material.name }}
          </option>
        </select>
        <label for="quantity">Quantity</label>
        <input type="number" v-model="newItem.quantity" id="quantity" min="0" />
      </div>
      <div class="invoice-item-actions">
        <base-button
          :disabled="!newItem.material || !newItem.quantity"
          @button:click="addLineItem"
          >Add Line Item
        </base-button>
        <base-button :disabled="!lineItems.length" @button:click="completeOrder"
          >Complete Order</base-button
        >
      </div>
      <div class="invoice-order-list" v-if="lineItems.length">
        <div class="runningTotal">
          <h3>Running Total:</h3>
          {{ runningTotal | price }}
        </div>
        <hr />
        <table class="table">
          <thead>
            <tr>
              <th>Material</th>
              <th>Description</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tr
            v-for="lineItem in lineItems"
            :key="`index_${lineItem.material.id}`"
          >
            <td>{{ lineItem.material.name }}</td>
            <td>{{ lineItem.material.description }}</td>
            <td>{{ lineItem.quantity }}</td>
            <td>{{ lineItem.material.price }}</td>
            <td>{{ (lineItem.material.price * lineItem.quantity) | price }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="invoice-step" v-if="invoiceStep === 3">
      <h2>Step 3: Review and Submit Order</h2>
      <base-button @button:click="submitInvoice">Submit Invoice</base-button>
      <hr />
      <div class="invoice-step-detail" id="invoice" ref="invoice">
        <div class="invoice-logo">
          <img
            id="imgLogo"
            alt="app logo"
            src="../assets/images/martapplogo.jpg"
          />
          <h3>3, Walter Way</h3>
          <h3>VI, Lagos, 100232</h3>
          <h3>Nigeria</h3>

          <div class="invoice-order-list" v-if="lineItems.length">
            <div class="invoice-header">
              <h3>Invoice: {{ new Date() | humanizeDate }}</h3>
              <h3>
                Customer:
                {{
                  this.selectedCustomer.firstName +
                    " " +
                    this.selectedCustomer.lastName
                }}
              </h3>
              <h3>
                Address:
                {{ this.selectedCustomer.customerDetail.primaryAddress }}
              </h3>
              <h3>
                {{ this.selectedCustomer.customerDetail.city }},
                {{ this.selectedCustomer.customerDetail.state }},
                {{ this.selectedCustomer.customerDetail.postalCode }}
              </h3>
              <h3>
                {{ this.selectedCustomer.customerDetail.country }}
              </h3>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tr
                v-for="lineItem in lineItems"
                :key="`index_${lineItem.material.id}`"
              >
                <td>{{ lineItem.material.name }}</td>
                <td>{{ lineItem.material.description }}</td>
                <td>{{ lineItem.quantity }}</td>
                <td>{{ lineItem.material.price }}</td>
                <td>
                  {{ (lineItem.material.price * lineItem.quantity) | price }}
                </td>
              </tr>
              <tr>
                <th colspan="4"></th>
                <th>Grand Total</th>
              </tr>
              <tfoot>
                <tr>
                  <td colspan="4" class="due">
                    Balance due on receipt of goods
                  </td>
                  <td class="price-final">{{ runningTotal | price }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="invoice-steps-actions">
      <base-button @button:click="prev" :disabled="!canGoPrev"
        >Previous</base-button
      >
      <base-button @button:click="next" :disabled="!canGoNext"
        >Next</base-button
      >
      <base-button @button:click="startOver">Start Over</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IInvoice, ILineItem } from "../types/IInvoice";
import { ICustomer } from "../types/Customer";
import { IMaterialStock } from "../types/Material";
import CustomerService from "../services/customer-service";
import { StockService } from "../services/stock-service";
import InvoiceService from "../services/invoice-service";
import BaseButton from "../components/BaseButton.vue";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const customerService = new CustomerService();
const stockService = new StockService();
const invoiceService = new InvoiceService();

@Component({ name: "NewInvoice", components: { BaseButton } })
export default class NewInvoice extends Vue {
  invoiceStep: number = 1;
  invoice: IInvoice = {
    createdAt: new Date(),
    customerId: 0,
    lineItems: [],
    updatedAt: new Date()
  };
  customers: ICustomer[] = [];
  selectedCustomerId: number = 0;
  stock: IMaterialStock[] = [];
  lineItems: ILineItem[] = [];
  newItem: ILineItem = { material: undefined, quantity: 0 };

  get canGoNext() {
    if (this.invoiceStep === 1) {
      return this.selectedCustomerId !== 0;
    }
    if (this.invoiceStep === 2) {
      return this.lineItems.length;
    }
    if (this.invoiceStep === 3) {
      return false;
    }
    return false;
  }

  get canGoPrev() {
    return this.invoiceStep !== 1;
  }

  get runningTotal() {
    return this.lineItems.reduce(
      (a, b) => a + b["material"]["price"] * b["quantity"],
      0
    );
  }

  get selectedCustomer() {
    return this.customers.find(c => c.id == this.selectedCustomerId);
  }

  async submitInvoice(): Promise<void> {
    this.invoice = {
      customerId: this.selectedCustomerId,
      lineItems: this.lineItems
    };
    await invoiceService.createInvoice(this.invoice);
    this.downloadPdf();
    await this.$router.push("/orders");
  }

  downloadPdf() {
    let pdf = new jsPDF("p", "pt", "a4", true);
    let invoice = document.getElementById("invoice");
    let width = this.$refs.invoice.clientWidth;
    let height = this.$refs.invoice.clientHeight;

    html2canvas(invoice).then(canvas => {
      let image = canvas.toDataURL("image/png");
      pdf.addImage(image, "PNG", 0, 0, width * 0.55, height * 0.55);
      pdf.save("invoice");
    });
  }
  addLineItem() {
    let newItem: ILineItem = {
      material: this.newItem.material,
      quantity: Number(this.newItem.quantity)
    };
    let existingItems = this.lineItems.map(item => item.material.id);
    if (existingItems.includes(newItem.material.id)) {
      let lineItem = this.lineItems.find(
        item => item.material.id === newItem.material.id
      );
      let currentQuantity = Number(lineItem.quantity);
      let updatedQuantity = (currentQuantity += newItem.quantity);
      lineItem.quantity = updatedQuantity;
    } else {
      this.lineItems.push(this.newItem);
    }

    this.newItem = { material: undefined, quantity: 0 };
  }
  startOver(): void {
    this.invoice = { customerId: 0, lineItems: [] };
    this.invoiceStep = 1;
  }
  completeOrder() {
    this.invoiceStep = 3;
  }

  prev(): void {
    if (this.invoiceStep === 1) {
      return;
    }
    this.invoiceStep -= 1;
  }
  next(): void {
    if (this.invoiceStep === 3) {
      return;
    }
    this.invoiceStep += 1;
  }
  async initialize(): Promise<void> {
    this.customers = await customerService.getCustomers();
    this.stock = await stockService.getStock();
  }

  async created() {
    await this.initialize();
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/global.scss";
.invoice-steps-actions {
  display: flex;
  width: 100%;
}
.invoice-step {
}
.invoice-step-detail {
  margin: 1.2rem;
}
.invoice-order-list {
  margin-top: 1.2rem;
  padding: 0.8rem;
  .line-item {
    display: flex;
    border-bottom: 1px dashed #ccc;
    padding: 0.8rem;
  }
  .item-col {
    flex-grow: 1;
  }
}
.invoice-item-actions {
  display: flex;
}
.price-pre-tax {
  font-weight: bold;
}
.price-final {
  font-weight: bold;
  color: $solar-green;
}
.due {
  font-weight: bold;
}
.invoice-header {
  width: 100%;
  margin-bottom: 1.2rem;
}
.invoice-logo {
  padding-top: 1.4rem;
  text-align: center;
  img {
    width: 280px;
  }
}
</style>
