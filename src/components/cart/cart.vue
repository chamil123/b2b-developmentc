<template>
  <button class="btn cart-btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="bi bi-cart"></i>
    <span class="position-absolute cart-count top-0 start-100 translate-middle badge rounded-pill">
      {{ this.$store.state.cartsData.data.length }}
    </span>
  </button>
  <ul class="dropdown-menu mini-cart dropdown-menu-lg-end">
    <h4 class="item-count mx-auto" v-if="this.$store.state.cartsData.data.length > 0">
      {{ this.$store.state.cartsData.data.length }} ITEMS
    </h4>
    <h4 class="item-count mx-auto" v-else>NO ITEMS</h4>
    <div class="items" v-if="this.$store.state.cartsData.data.length > 0">
      <div class="row w-100 mx-0 item py-2" v-for="item in this.$store.state.cartsData.data" v-bind:key="item.product_id">
        <div class="col-1 pe-0 ps-1 d-flex align-items-center justify-content-center">
          <button class="btn p-0 remove-btn" @click="removeFromCart(item.product.id)">
            <i class="bi bi-x-square-fill"></i>
          </button>
        </div>
        <div class="col-8 pe-0 ps-1 item-details d-flex align-items-center justify-content-center">
          <img v-if="item.product.images[0]" :src="item.product.images[0]" class="image" alt="" />
          <img v-else src="../../assets/images/no-image-available.jpg" class="image" alt="" />
          <h5 class="name">{{ item.product.name }} x {{ item.quantity }}</h5>
        </div>
        <div class="col-3 d-flex align-items-center justify-content-end">
          <h5 class="price">${{ (item.product.selling_price * item.quantity).toFixed(2) }}</h5>
        </div>
      </div>
    </div>
    <div class="totals py-3" v-if="this.$store.state.cartsData.data.length > 0">
      <div class="row w-100 mx-0">
        <div class="col-6 d-flex align-items-center justify-content-start">
          <h6 class="">SUB TOTAL</h6>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end">
          <h6 class="">${{ cartTotal.toFixed(2) }}</h6>
        </div>
      </div>
    </div>
    <div class="buttons" v-if="this.$store.state.cartsData.data.length > 0">
      <div class="row w-100 mx-0">
        <div class="col-6 d-flex align-items-center justify-content-start">
          <!-- <button class="btn btn-sm w-100 view-cart-btn">View Cart</button> -->
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end">
          <router-link :to="{ name: 'checkout' }" class="btn btn-sm w-100 checkout-btn">Checkout</router-link>
        </div>
      </div>
    </div>
  </ul>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {};
  },
  components: {},
  mounted() {

    if (!this.$store.state.productsData.deliveryDate) {
      const today = new Date();
      this.$store.state.cartsData.deliveryDate = today.toISOString().split("T")[0];
    } else {
      this.$store.state.cartsData.deliveryDate = this.$store.state.productsData.deliveryDate;
    }

    this.$store.dispatch("cartsData/getCartData");
  },
  computed: {
    cartTotal() {
      let total = 0;
      const products = this.$store.state.cartsData.data;

      products.forEach((product) => {
        total += product.product.selling_price * product.quantity;
      });
      return total;
    },

  },
  methods: {
    removeFromCart(productId) {
      this.$store.dispatch("cartsData/removeCart", { productId: productId });

      
    },
  },
};
</script>

<style lang="scss">
.mini-cart {
  min-width: 340px !important;
  margin-right: -50px !important;
  margin-top: 10px !important;
  border-radius: 12px;
  z-index: 99999999;

  .item-count {
    width: fit-content;
    font-size: 16px;

    &:before {
      content: "";
      position: absolute;
      height: 2px;
      width: 80px;
      background-color: #494444;
      top: 16px;
      right: auto;
      left: 45px;
    }

    &:after {
      content: "";
      position: absolute;
      height: 2px;
      width: 80px;
      background-color: #494444;
      top: 16px;
      right: 45px;
      left: auto;
    }
  }

  .item {
    border-bottom: 1px solid #62626261;

    .remove-btn {
      color: #ea0a2a;

      .btn {
        width: 13px;
        height: 12px;
        color: #fff;
      }
    }

    .item-details {
      .image {
        max-width: 60px;
      }

      .name {
        font-size: 13px;
        font-weight: 500;
      }
    }

    .price {
      font-size: 16px;
      font-weight: 500;
    }
  }

  .totals {
    font-size: 16px;
  }

  .buttons {
    .view-cart-btn {
      border-radius: 50px;
      border: 1px solid #0033a0;
    }

    .checkout-btn {
      border-radius: 50px;
      background-color: #0033a0;
      border: 1px solid #0033a0;
      color: #facd01;
    }
  }
}
</style>
