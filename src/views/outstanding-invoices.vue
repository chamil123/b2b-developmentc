<template>
  <div class="outstanding-invoices-page py-5">
    <div class="container-fluid">
      <h4 class="single-page-header mt-lg-5 mt-0 text-start">Outstanding Invoices</h4>
      <div class="row w-100 mx-0">
        <div class="col-md-12">
          <div class="card p-">
            <div class="table-responsive">
              <table class="table table-striped outstanding-invoices">
                <thead>
                  <tr>
                    <th scope="col">Invoice Number</th>
                    <th scope="col">Invoice Date</th>
                    <th scope="col">Balance Amount</th>
                    <th scope="col">Total Due</th>
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
                  <tr v-for="order in this.$store.state.orderData.data" v-bind:key="order.id" >
                    <template v-if="order.payment_status == 1">
                    <td>{{ order.no }}</td>
                    <td>{{ order.order_date }}</td>
                    <td>$4.78</td>
                    <td>$5.67</td>
                  </template>
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
import SideFillter from "../components/products/SideFillter.vue";
import ProductCard from "../components/products/ProductCard.vue";
import Loader from "../components/loader/Loader.vue";
export default {
  name: "HomePage",
  components: {
    SideFillter,
    ProductCard,
    Loader
  },
  mounted() {
    this.$store.dispatch("orderData/getOrderData");
  },
};
</script>

<style lang="scss">
.outstanding-invoices-page {
  .card {
    border-radius: 25px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .table {
    td {
      color: #878787;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
}
</style>
