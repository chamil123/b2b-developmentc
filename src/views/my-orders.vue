<template>
  <div class="my-orders-page py-5">
    <div class="container-fluid">
      <h4 class="single-page-header mt-lg-5 mt-0 text-start">MY ORDERS</h4>
      <div class="row">
        <div class="col-md-12">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active px-5" id="pending-orders-tab" data-bs-toggle="tab"
                data-bs-target="#pending-orders-tab-pane" type="button" role="tab" aria-controls="pending-orders-tab-pane"
                aria-selected="true">
                Pending Orders
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link px-5" id="order-history-tab" data-bs-toggle="tab"
                data-bs-target="#order-history-tab-pane" type="button" role="tab" aria-controls="order-history-tab-pane"
                aria-selected="false">
                Order History
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <!-- my orders -->
            <div class="tab-pane fade show active card" id="pending-orders-tab-pane" role="tabpanel"
              aria-labelledby="pending-orders-tab" tabindex="0">
              <div class="table-responsive">
                <table class="table table-striped my-orders">
                  <thead>
                    <tr>
                      <th scope="col">Order Number</th>
                      <th scope="col">Delivery Date</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">More</th>
                      <th scope="col">Pay</th>
                    </tr>
                  </thead>
                  <tbody v-if="this.$store.state.orderData.isLoading">
                    <tr>
                      <td colspan="5">
                        <Loader></Loader>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr v-for="order in this.$store.state.orderData.data" :key="order.id">
                      <template v-if="order.order_status?.id !== 5">
                        <td>{{ order.no }}</td>
                        <td>{{ order.delivery_date }}</td>
                        <td>${{ order.amount_include_vat }}</td>
                        <td>
                          <button @click="openModal(order)">DETAIL</button>
                          <OrderItemModel v-if="isModalVisible" :order="selectedOrderItem" @close="closeModal" />
                        </td>
                        <td>
                          <a href="#" class="pay-link" v-if="order.payment_status == 0">PAY</a>
                        </td>
                      </template>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
            <div class="tab-pane fade card" id="order-history-tab-pane" role="tabpanel"
              aria-labelledby="order-history-tab" tabindex="0">
              <table class="table table-striped my-orders">
                <thead>
                  <tr>
                    <th scope="col">Order Number</th>
                    <th scope="col">Delivery Date</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">More</th>
                  </tr>
                </thead>
                <tbody v-if="this.$store.state.orderData.isLoading">
                  <tr>
                    <td colspan="5">
                      <Loader></Loader>
                    </td>
                  </tr>
                </tbody>

                <tbody v-else>
                  <!-- <tr v-if="orderHistory.order_status.id == 5"> -->
                  <tr v-for="orderHistory in this.$store.state.orderData.data" :key="orderHistory.id">
                    <td>{{ orderHistory.no }}</td>
                    <td>{{ orderHistory.delivery_date }}</td>
                    <td>${{ orderHistory.amount_include_vat }}</td>
                    <td>
                      <button @click="openModal(orderHistory)">DETAIL</button>
                      <OrderItemModel v-if="isModalVisible" :order="selectedOrderItem" @close="closeModal" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import SideFillter from "../components/products/SideFillter.vue";
import ProductCard from "../components/products/ProductCard.vue";
import OrderItemModel from "../components/orders/OrderItemModel.vue";
import Loader from "../components/loader/Loader.vue";
export default {
  name: "HomePage",
  components: {
    SideFillter,
    ProductCard,
    OrderItemModel,
    Loader
  },
  mounted() {
    this.$store.dispatch("orderData/getOrderData");
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    openModal(order) {
      this.selectedOrderItem = order.order_lines;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style lang="scss">
.my-orders-page {
  .nav-link {
    background-color: #a5a5a5;
    color: #fff;

    &.active {
      background-color: #0033a0;
      color: #fff;
    }
  }

  .tab-pane {
    border-radius: 25px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-top-left-radius: 0px;
  }

  .table {
    th {
      width: fit-content;
    }

    td {
      color: #878787;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }

  a.details-link {
    background-color: #fff;
    border: 1px solid #878787;
    color: #878787;
    padding: 2px 14px;
    font-size: 13px;
  }

  a.pay-link {
    background-color: #ea0a2a;
    border: 1px solid #ea0a2a;
    color: #fff;
    padding: 2px 14px;
    font-size: 13px;
  }
}
</style>
