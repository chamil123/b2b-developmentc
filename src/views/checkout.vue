<template>
  <div class="checkout-page py-5">
    <div class="container-fluid">
      <div class="row w-100 mx-0">
        <div class="col-lg-8 col-12">
          <div class="row w-100 mx-0">
            <div class="col-md-9 px-0 d-flex align-items-center justify-content-start">
              <h4 class="single-page-header mt-5 text-start">SHOPPING CART - CHECKOUT</h4>
            </div>
            <div class="col-md-3 px-0 d-flex align-items-center justify-content-start">
              <router-link :to="{ name: 'home-page' }" class="btn add-items mt-5 px-5">Add Items</router-link>
            </div>
            <div class="col-md-12">
              <div class="row w-100 mx-0 item-headers py-4 d-none d-lg-flex">
                <div class="col-md-4 text-start">
                  <h5 class="title">PRODUCT</h5>
                </div>
                <div class="col-md-2 text-start">
                  <h5 class="title">PRICE</h5>
                </div>
                <div class="col-md-1 text-start">
                  <h5 class="title">UOM</h5>
                </div>
                <div class="col-md-3 text-start">
                  <h5 class="title">QUANTITY</h5>
                </div>
                <div class="col-md-2 text-center">
                  <h5 class="title">TOTAL</h5>
                </div>
              </div>
              <!-- one item -->
              <div class="row w-100 mx-0 item py-2 mt-4 mt-lg-0" v-for="item in this.$store.state.cartsData.data"
                v-bind:key="item.product_id" :class="{ 'out-of-stock': !isStockAvailable(item) }">
                <div class="col-lg-4 col-12 pe-0 ps-1 item-details d-flex align-items-center justify-content-start">
                  <button class="btn p-0 remove-btn me-3" @click="removeFromCart(item.product.id)">
                    <i class="bi bi-x-square-fill"></i>
                  </button>
                  <div v-if="item.product">
                    <img v-if="item.product.images[0]" :src="item.product.images[0]" class="image" alt="" />

                    <img v-else src="../assets/images/no-image-available.jpg" class="image" alt="" />
                  </div>
                  <div class="row text-start pt-2">
                    <h5 class="name">{{ item.product ? item.product.name : '' }}</h5>
                    <p class="cat">{{ item.product ? item.product.slug : '' }}</p>
                  </div>
                </div>
                <div class="col-lg-2 col-2 ps-0 ps-lg-2 d-flex align-items-center justify-content-start">
                  <h5 class="price mb-0">${{ item.product ? parseFloat(item.product.selling_price).toFixed(2) : 0.00 }}
                  </h5>
                </div>
                <div class="col-lg-1 col-2 d-flex align-items-center justify-content-start">
                  <h5 class="uom mb-0">PKT</h5>
                </div>
                <div class="col-lg-3 col-5 d-flex">
                  <div class="qty mt-lg-3 mt-0 d-flex">
                    <div class="qty-function d-flex align-items-center justify-content-start">
                      <button class="qtybtn min" @click="decreaseByOne(item.product.id)">
                        -
                      </button>
                      <input type="text" readonly class="qty-input form-control" :value="item.quantity" />
                      <button class="qtybtn max" @click="increaseByOne(item.product.id)">
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-2 d-flex align-items-center justify-content-center">
                  <h5 class="total mb-0">
                    ${{ item.product ? (parseFloat(item.product.selling_price) * item.quantity).toFixed(2) : 0.00 }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12 right-panel">
          <h5 class="title mt-5 text-start mb-2">DELIVERY DATE</h5>
          <input type="date" :min="minDate" :value="this.$store.state.productsData.deliveryDate"
            @change="deliveryDateChange()" class="form-control" id="delivery_date" />
          <table border="1" class="table mt-4">
            <tr>
              <td class="text-start">MINIMUM SALES AMOUNT</td>
              <td class="text-end blue-color">${{ parseFloat(userDetails.min_sales_amt).toFixed(2) }}</td>
            </tr>
            <tr>
              <td class="text-start">TOTAL OUTSTANDING</td>
              <td class="text-end blue-color">${{ parseFloat(userDetails.balance_lcy).toFixed(2) }}</td>
            </tr>
          </table>

          <div class=" mt-4 mb-1 d-flex">
            <h5 class="title  text-start  mt-2 ">BILLING ADDRESS </h5>

            <AddressList @address-selected="setSelectedBillingAddress"
              v-if="this.$store.state.userProfileData.addressList.length > 0"></AddressList>
            <AddNewAddress @new-address_add="newAddressAdded('billing')"
              v-if="this.$store.state.userProfileData.addressList.length == 0"></AddNewAddress>
          </div>

          <!-- Billing Address -->
          <div v-if="selectedAddress" class="col-11  address-details">
            <span>
              {{ selectedAddress.first_name || 'N/A' }} {{ selectedAddress.last_name || 'N/A' }}
            </span>
            <span>
              {{ selectedAddress.address_line_1 || 'N/A' }}
              {{ selectedAddress.address_line_2 || 'N/A' }}
            </span>
            <span>
              {{ selectedAddress.city || '' }},
              {{ selectedAddress.state || 'N/A' }}
              {{ selectedAddress.postal_code || 'N/A' }}
            </span>
            <span>
              {{ selectedAddress.country || 'N/A' }}
            </span>

          </div>
          <div class=" mt-4 mb-1 d-flex">
            <h5 class="title  text-start  mt-2 ">SHIPPING ADDRESS</h5>
            <AddressList @address-selected="setSelectedShippingAddress"
              v-if="this.$store.state.userProfileData.addressList.length > 0"></AddressList>
            <AddNewAddress @new-address_add="newAddressAdded('shipping')"
              v-if="this.$store.state.userProfileData.addressList.length == 0"></AddNewAddress>
          </div>
          <!-- Shipping Address -->
          <div v-if="selectedShippingAddress" class="col-11  address-details">
            <span>
              {{ selectedShippingAddress.first_name || 'N/A' }} {{ selectedShippingAddress.last_name || 'N/A' }}
            </span>
            <span>
              {{ selectedShippingAddress.address_line_1 || 'N/A' }}
              {{ selectedShippingAddress.address_line_2 || 'N/A' }}
            </span>
            <span>
              {{ selectedShippingAddress.city || '' }},
              {{ selectedShippingAddress.state || 'N/A' }}
              {{ selectedShippingAddress.postal_code || 'N/A' }}
            </span>
            <span>
              {{ selectedShippingAddress.country || 'N/A' }}
            </span>

          </div>

          <div class="contact-details-form">
            <h5 class="title mt-4 text-start mb-2">CONTACT DETAILS</h5>
            <form class="row">
              <div class="mb-3 col-12">
                <input type="text" v-model="contactName" class="form-control" id="contact_name"
                  placeholder="Contact Name" />
              </div>
              <div class="mb-3 col-md-6">
                <input type="text" v-model="userDetails.last_name" class="form-control" id="mobile"
                  placeholder="Mobile Number" />
              </div>
              <div class="mb-3 col-md-6">
                <input type="email" v-model="userDetails.email" class="form-control" id="email"
                  placeholder="Email Address" />
              </div>
              <div class="col-md-12">
                <textarea name="remarks" v-model="remarks" class="form-control" id="remarks" cols="30" rows="2"
                  placeholder="Remarks"></textarea>
              </div>
            </form>
          </div>

          <div class="cart-totals">
            <h5 class="title mt-5 text-start mb-2">CART TOTALS</h5>
            <table border="1" class="table mt-4">
              <tr>
                <td class="text-start">TOTAL ITEMS</td>
                <td class="text-end blue-color">{{ this.$store.state.cartsData.data.length }}</td>
              </tr>
              <tr>
                <td class="text-start">SUB TOTAL</td>
                <td class="text-end blue-color">${{ subtotal.toFixed(2) }}</td>
              </tr>
              <tr>
                <td class="text-start">DELIVERY CHARGES</td>
                <!-- <td class="text-end blue-color">${{ this.userDetails.normal_del_charge ?? 0 }}</td> -->
                <td class="text-end blue-color">${{ this.deliveryCharges }}</td>
              </tr>
              <tr>
                <td class="text-start">WEEKEND DELIVERY CHARGES</td>
                <td class="text-end blue-color">${{ this.weeklyDeliveryCharger }}</td>
              </tr>
              <tr>
                <td class="text-start">AMOUNT</td>
                <td class="text-end blue-color">${{ this.amount }}</td>
              </tr>
              <tr>
                <td class="text-start">GST (8%)</td>
                <td class="text-end blue-color">${{ this.gstAmount }}</td>
              </tr>
              <tr>
                <td class="text-start ft-text pt-3"><b>TOTAL AMOUNT</b></td>
                <td class="text-end full-total py-3">${{ this.netTotal }}</td>
              </tr>
            </table>
          </div>
          <div v-if="isLoading">
            <CustomLoader></CustomLoader>
          </div>
          <button ref="modalBtn" hidden class="btn checkout-submit w-100 mt-2" data-bs-toggle="modal"
            data-bs-target="#checkoutConfirmModal">abc</button>
          <button type="submit" class="btn checkout-submit w-100 mt-2" @click="validationOrder">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Checkout confirm Modal -->
  <div class="modal fade" id="checkoutConfirmModal" tabindex="-1" aria-labelledby="checkoutConfirmModalLabel"
    style="display: none" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header text-center">

          <h1 class="modal-title fs-5 text-center w-100" id="checkoutConfirmModalLabel">
            Confirm your order
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5 class="title">Order Summary</h5>
          <!-- SW23-003454 -->
          <h5 class="order-title">{{ documentNumber }}</h5>
          <div class="contents">
            <table border="0" class="table mt-4">
              <tr>
                <td class="text-start bolder">Email Address:</td>
                <td class="text-end">{{ userDetails.email }}</td>
              </tr>
              <tr>
                <td class="text-start bolder">Contact Name:</td>
                <td class="text-end">{{ contactName }}</td>
              </tr>
              <tr>
                <td class="text-start bolder">Delivery Date:</td>
                <td class="text-end text-red delivary-date">{{ currentDay }}</td>
              </tr>
              <tr>
                <td class="text-start bolder">Total Items:</td>
                <td class="text-end">{{ this.$store.state.cartsData.data.length }}</td>
              </tr>
              <tr>
                <td class="text-start bolder">Sub Total:</td>
                <td class="text-end">${{ subtotal }}</td>
              </tr>
              <tr>
                <td class="text-start bolder">Delivery Charges:</td>
                <td class="text-end">${{ deliveryCharges }}</td>
              </tr>
              <tr>
                <td class="text-start bolder">Amount:</td>
                <td class="text-end">${{ amount }}</td>
              </tr>
              <tr>
                <td class="text-start bolder">GST:</td>
                <td class="text-end">${{ gstAmount }}</td>
              </tr>
              <tr>
                <td class="text-start bolder">Total Amount:</td>
                <td class="text-end text-red total-amount">${{ netTotal }}</td>
              </tr>
              <tr>
                <td class="text-start bolder">Remarks:</td>
                <td class="text-end">{{ remarks }}</td>
              </tr>
            </table>
            <button v-if="showConfirmButton" type="submit" class="btn checkout-submit w-100 mt-2" @click="confirmOrder"
              data-bs-dismiss="modal">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideFillter from "../components/products/SideFillter.vue";
import ProductCard from "../components/products/ProductCard.vue";

import { mapGetters } from 'vuex';
import AddressList from "../components/address/AddressList.vue";

import AddNewAddress from "../components/address/AddNewAddress.vue";
import CustomLoader from "../components/loader/CustomLoader.vue";
import { mapState } from 'vuex';
import 'vue3-toastify/dist/index'
import { toast } from "vue3-toastify/dist/index";
export default {
  name: "HomePage",

  components: {
    SideFillter,
    ProductCard,
    AddressList,
    AddNewAddress,
    CustomLoader
  },
  data() {
    return {
      userDetails: "",
      selectedAddress: null,
      selectedShippingAddress: null,
      contactName: '',
      mobile: '',
      email: '',
      remarks: '',
      orderNo: '',
      orderDate: '',
      deliveryCharges: 0.00,
      amount: 0.00,
      gstAmount: 0.00,
      grossTotal: 0.00,
      netTotal: 0.00,
      weeklyDeliveryCharger: 0.00,
      documentNumber: "",
      showConfirmButton: true,
      currentDay: ''
    };
  },
  props: {
    product: Object,
  },
  mounted() {
    // this.$store.dispatch("cartsData/getCartData");

    this.$store.dispatch('userProfileData/getUserData').then(() => {
      // Log the cart data after it has been fetchedyy
      this.userDetails = this.$store.state.userProfileData.data;
      this.contactName = this.userDetails.first_name ?? "" + " " + this.userDetails.last_name ?? "";
      this.totalDelivaryChages();
      this.cartTotal();
    }).catch((error) => {
      console.error('Error fetching cart data:', error);
    });


    if (!this.$store.state.cartsData.deliveryDate) {
      this.orderDate = new Date().toISOString().split('T')[0];

    } else {
      this.orderDate = this.$store.state.cartsData.deliveryDate;
    }

   let newDate = new Date(this.$store.state.cartsData.deliveryDate); // Convert the string to a Date object

    const dayOfWeek =newDate.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.currentDay = daysOfWeek[dayOfWeek]+"-"+this.orderDate;

    this.generateRandomDigits();

  },
  computed: {
    ...mapGetters('cartsData', ['subtotal']),
    ...mapState({
      isLoading: (state) => state.orderData.isLoading,
    }),

    minDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
  },
  methods: {

    deliveryDateChange() {
      this.$store.state.productsData.deliveryDate = event.target.value;
      this.$store.state.cartsData.deliveryDate = event.target.value;
      this.cartTotal();
    },

    removeFromCart(productId) {
      this.$store.dispatch("cartsData/removeCart", { productId: productId }).then(() => {
        this.cartTotal();
      });
    },

    decreaseByOne(productId) {
      this.$store.dispatch("cartsData/removeQtyByOne", { productId: productId }).then(() => {
        this.cartTotal();
      });;
    },

    increaseByOne(productId) {
      this.$store.dispatch("cartsData/addQtyByOne", { productId: productId }).then(() => {
        this.cartTotal();
      });

    },

    setSelectedBillingAddress(selectedAddress) {
      this.selectedAddress = selectedAddress;
    },

    setSelectedShippingAddress(selectedAddress) {
      this.selectedShippingAddress = selectedAddress;
    },

    generateRandomDigits() {
      this.orderNo = "SW-" + Math.floor(100000 + Math.random() * 900000);

    },

    cartTotal() {

      //
      var withoutVatAmount = 0.00;
      var deliveryAmount = 0.00;
      var weekendDeliveryAmount = 0.00;
      var itemTotalAmount = 0.00;
      var vatAmount = 0.00;
      var soTotalAmount = 0.00;
      //

      const date = new Date(this.$store.state.productsData.deliveryDate); // Create a Date object from the selected date string
      var dayOfWeek = date.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, and so on)

      if (dayOfWeek == 0)// Check if the selected date is Saturday (6) or Sunday (0)
      {
        weekendDeliveryAmount = this.userDetails.weekend_del_charge;
      } else if (dayOfWeek == 6) {
        weekendDeliveryAmount = this.userDetails.weekend_del_charge;
      }

      if (this.subtotal < this.userDetails.min_sales_amt) {
        deliveryAmount = this.userDetails.below_moa_del_charge;
      } else {
        deliveryAmount = this.userDetails.normal_del_charge;
      }


      itemTotalAmount = this.subtotal;
      withoutVatAmount = (itemTotalAmount + deliveryAmount + weekendDeliveryAmount);
      vatAmount = (withoutVatAmount * (parseFloat(this.userDetails.tax_percentage)) * 0.01);
      soTotalAmount = (vatAmount + withoutVatAmount);

      if (itemTotalAmount != 0) {

        this.weeklyDeliveryCharger = weekendDeliveryAmount.toFixed(2);
        this.deliveryCharges = deliveryAmount.toFixed(2);
        this.grossTotal = soTotalAmount.toFixed(2);
        this.amount = withoutVatAmount.toFixed(2);
        this.gstAmount = vatAmount.toFixed(2);
        this.netTotal = soTotalAmount.toFixed(2);
        this.subtotal = itemTotalAmount.toFixed(2);
      }
      else {
        this.weeklyDeliveryCharger = 0.00;
        this.deliveryCharges = 0.00;
        this.grossTotal = 0.00;
        this.amount = 0.00;
        this.gstAmount = 0.00;
        this.netTotal = 0.00;
        this.subtotal = 0.00;
      }

    },

    totalDelivaryChages() {
      let totalChages = 0;
      totalChages = this.userDetails.weekend_del_charge ?? 0 + this.userDetails.normal_del_charge ?? 0;
      this.deliveryCharges = totalChages;

    },

    newAddressAdded(type) {
      const { firtName, lastName, addressLine1, addressLine2, state, city, zip, country } = this.$store.state.userProfileData.formData;
      const newAddress = {
        first_name: firtName,
        last_name: lastName,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        city: city,
        state: state,
        postal_code: zip,
        country: country,
      };
      if (type == "billing") {
        this.selectedAddress = newAddress;
      } else {
        this.selectedShippingAddress = newAddress;
      }

    },

    async validationOrder() {
      try {
        const orderHeader = this.createOrderHeader();
        const response = await this.$store.dispatch('orderData/validationBeforeplaceOrder', orderHeader);

        if (response.status == 200) {
          this.$refs.modalBtn.click();
          if (response.cusType != "COD") {
            this.showConfirmButton = false;
            this.documentNumber = response.payload;
            toast.success(response.message, {
              autoClose: 3500,
            });
          }

        } else {
          // if (response.status = 406) {
          // if (response.status == "order navision") {
          // this.documentNumber = response.payload.trStatusList[0].documentNo;
          // this.$refs.modalBtn.click();
          // toast.success(response.message, {
          //   autoClose: 3500,
          // });
          // } else {

          // }

          // }
          if (response.type == "stock validation navision") {

            let alertData = "Insufficient quantity for the following item(s):<br>";
            response.payload.forEach(product => {
              alertData += `<span ></br>${product.product_name}</span>.`;
            });
            alertData += "<br>Cannot proceed the order.";
            this.showAlert("error", alertData);
          } else {
            this.showAlert("error", response.message);
          }

        }
      } catch (error) {
        console.error("Validation Order Error:", error);
        this.$toast.error(error.message);
      }
    },

    async confirmOrder() {
      try {
        const orderHeader = this.createOrderHeader();

        const response = await this.$store.dispatch('orderData/placeOrder', { payload: orderHeader, orderType: "COD" });

        if (response.data.payload.status == 200) {
          let alertData = `Order Number - <span style="font-size: 1.2em;font-weight:bold">${response.data.payload.payload.documentNo}</span>.<br>Your order has been submitted`;
          this.showAlert("success", alertData);
        } else {
          this.showAlert("error", response.data.payload.message);
        }
      } catch (error) {
        console.error("Confirm Order Error:", error);
        this.$toast.error(error.message);
      }
    },

    // clearSelectedShippingAddress() {

    //   this.selectedShippingAddress = '';
    //   this.selectedAddress = '';

    //   this.remarks = '';
    //   this.orderNo = '';
    //   this.orderDate = {};
    //   this.deliveryCharges = 0;
    //   this.amount = 0;
    //   this.gstAmount = 0;
    //   this.grossTotal = 0;
    //   this.netTotal = 0;
    // },


    createOrderHeader() {
      return {
        contactName: this.contactName,
        mobile: this.userDetails.phone_1,
        email: this.userDetails.email,
        remarks: this.remarks,
        orderNo: "",
        orderDate: this.orderDate,
        amountVat: this.gstAmount,
        amountExcludeVat: this.amount,
        amountIncludeVat: this.grossTotal,
        delivaryCharges: this.deliveryCharges ?? 0,
        subTotal: this.subtotal ?? 0,
        taxPresentage: this.userDetails.tax_percentage,
        salesPersonCode: this.userDetails.sales_person_code,
        // billingAddress: this.selectedAddress.id ? this.selectedAddress : null,
        // shippingAddress: this.selectedShippingAddress.id ? this.selectedShippingAddress : null
      };

    },
    showAlert(title, message) {
      this.$swal.fire({
        title: title,
        html: message.replace(/\n/g, '<br>'),
        icon: title,


      });
    },
    isStockAvailable(cartItem) {
      if (cartItem.product) {
        // Handle stock availability logic here
        console.log(">>>>>>>>>>>>>>>>> produc id is: ", cartItem.product.id);
      }

    },
  },
};
</script>

<style lang="scss">
.checkout-page {

  .add-items {
    border-radius: 50px;
    background-color: #ea0a2a;
    color: #fff;
    font-family: "Kalam", cursive;
  }

  .item-headers {
    h5.title {
      font-family: "Kalam", cursive;
      font-size: 16px;
      font-weight: 600;
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

    .uom {
      font-size: 16px;
      font-weight: 500;
    }

    .total {
      font-size: 16px;
      font-weight: 500;
    }

    .qty {
      .qty-label {
        font-size: 14px;
      }

      .qtybtn {
        width: 55px;
        border: none;
        background: #0033a0;
        height: 32px;
        color: #facd01;
        font-size: 22px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.min {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        &.max {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }

      .qty-input {
        width: 66px;
        border-radius: 0;
        text-align: center;
      }
    }
  }

  .right-panel {
    .title {
      font-family: "Kalam", cursive;
      font-size: 16px;
      font-weight: 600;
    }

    .table {
      td {
        width: 50%;
        font-size: 16px;
        background-color: #f6f6f6;
        letter-spacing: 0.6px;
        border: 1px solid rgb(24, 24, 24);
        font-weight: 500;
        color: rgb(0, 0, 0);

        &.blue-color {
          color: #0033a0;
          font-weight: 600;
        }

        &.ft-text {
          font-size: 18px;
        }

        &.full-total {
          color: #ea0a2a;
          font-size: 23px;
          font-weight: 600;
        }
      }
    }

    .address-select {
      padding: 1px 6px 1px 6px;
      margin-left: 10px;
    }

  }

  .checkout-submit {
    background-color: #0033a0;
    color: #facd01;
    border-radius: 50px;
    height: 50px;
    font-size: 20px;
    font-family: "Kalam", cursive;
  }
}

.address-details span {
  font-size: 14px;
  font-weight: 500;
  max-width: 300px;
  padding: 0px;
  margin: 0px;
  display: block;
  text-align: start
}

#checkoutConfirmModal {
  .modal-header {
    background-color: #facd01;
    color: #fff;
    font-family: "Kalam", cursive;
  }

  .modal-body {
    .title {
      font-size: 23px;
      font-family: "Kalam", cursive;
      font-weight: 600;
    }

    .order-title {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .table {
    td {
      font-size: 18px;
      padding-top: 10px;
      padding-bottom: 10px;
      width: 50%;

      &.bolder {
        font-weight: 600;
      }

      &.text-red {
        color: #ea0a2a;
      }

      &.total-amount {
        font-size: 25px;
        font-weight: 600;
      }

      &.delivary-date {
        font-size: 22px;
        font-weight: 600;
      }
    }
  }
}

.checkout-submit {
  background-color: #0033a0;
  color: #facd01;
  border-radius: 50px;
  height: 50px;
  font-size: 20px;
  font-family: "Kalam", cursive;
}

@media only screen and (max-width: 992px) {
  .checkout-page .item .qty .qtybtn {
    width: 35px;
    height: 27px;
  }

  .checkout-page .item .qty .qty-input {
    height: 27px;
  }

  .checkout-page .item .item-details .name {
    font-size: 12px;
  }

  .checkout-page .item .item-details .cat {
    font-size: 11px;
  }

  .checkout-page .item .item-details .image {
    width: 50px;
  }
}
</style>
