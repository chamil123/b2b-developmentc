<template>
  <!-- <div class=" mt-4 mb-1 d-flex">
    <h5 class="title  text-start  mt-2 ">BILLING ADDRESS</h5> -->
  <div class="buttons">
    <button type="button" data-bs-toggle="dropdown" class="btn btn-secondary btn-sm btn-style "
      @click="toggleDropdown1">Select</button>

    <div id="abc"></div>
    <ul class="dropdown-menu address-list dropdown-menu-lg-end">
      <h4 class="item-count mx-auto" v-if="this.$store.state.cartsData.data.length > 0">
        Address list
      </h4>
      <h4 class="item-count mx-auto" v-else>NO ITEMS</h4>
      <div class="address" v-for="address in this.$store.state.userProfileData.addressList" v-bind:key="address.id">
        <!-- Address 1 -->
        <div class="row w-100 mx-0 py-2">
          <div class="col-1 ps-3 d-flex align-items-center justify-content-center">
            <label>
              <input type="radio" v-model="selectedOption" :value="address.id" @change="selectAddress" />
            </label>
          </div>
          <div class="col-11 ps-2 address-details">
            <span>
              {{ address.first_name || 'N/A' }} {{ address.last_name || 'N/A' }}
            </span>
            <span>
              {{ address.address_line_1 || 'N/A' }}
              {{ address.address_line_2 ? ', ' + address.address_line_2 : '' }}
            </span>
            <span>
              {{ address.city || 'N/A' }},
              {{ address.state || 'N/A' }}
              {{ address.postal_code || 'N/A' }}
            </span>
            <span>
              {{ address.country || 'N/A' }}
            </span>

          </div>
        </div>

      </div>
    </ul>

  </div>
  <!-- </div> -->

</template>

<script>
import AddNewAddress from "./AddNewAddress.vue";
export default {
  name: "AddressList",
  emits: ['address-selected'], // Declare the emits option
  data() {
    return {
      selectedOption: null,
      customeName: null,
      addressLine1: null,
      addressLine2: null,
      city: null,
      state: null,
      postalCode: null,
      country: null,
    };
  },
  components: {
    AddNewAddress
  },
  methods: {

    selectAddress() {
      const addressList = this.$store.state.userProfileData.addressList;
      const selectedAddress = addressList.find(address => address.id == this.selectedOption);

      if (selectedAddress) {
        this.$emit('address-selected', selectedAddress);
        // this.customeName = selectedAddress.first_name + "  " + selectedAddress.last_name;
        // this.addressLine1 = selectedAddress.address_line_1;
        // this.addressLine2 = selectedAddress.address_line_2;
        // this.city = selectedAddress.city;
        // this.state = selectedAddress.state;
        // this.postalCode = selectedAddress.country;
        // this.country = selectedAddress.country;
      }

    },
  },
  computed: {

  },

};
</script>

<style lang="scss">
.address-list {
  min-width: 340px !important;
  margin-right: -250px !important;
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  border-radius: 5px;
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

  .address {
    border-bottom: 1px solid #62626261;

    .address-details span {
      font-size: 13px;
      font-weight: 500;
      max-width: 300px;
      padding: 0px;
      margin: 0px;
      display: block;
      text-align: start
    }
  }

  .hidden {
    display: none;
  }

}

.btn-style {
  padding: 1px 5px 1px 5px;
  margin: 0px;
  margin-left: 5px;

}
</style>
