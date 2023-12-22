<template>
  <div class="header">
    <div class="container-fluid">
      <div class="top-header d-md-flex align-items-center justify-content-end py-3 d-none">
        <router-link :to="{ name: 'my-profile' }" class="me-5"><i
            class="bi bi-person-circle me-2"></i>{{ userName }}</router-link>
        <label for="">Select Language :</label>
        <div class="dropdown ms-2 me-4">
          <button class="btn btn-outline-primary btn-sm dropdown-toggle lang-btn" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            English
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Swidish</a></li>
            <li><a class="dropdown-item" href="#">Franch</a></li>
          </ul>
        </div>
        <a href="#" class="link fw-bold ms-4"><i class="bi bi-house-door me-2"></i> Go Back</a>
      </div>
      <div class="main-header">
        <div class="row">
          <div class="col-md-2 col-6 d-flex align-items-center justify-content-start">
            <img src="../../assets/images/logo.png" alt="" />
          </div>
          <div class="col-md-10 d-md-flex d-none align-items-center justify-content-end">
            <router-link :to="{ name: 'home-page' }" class="me-2 px-2 main-link"
              :class="this.$route.name == 'home-page' ? 'active' : ''">Home</router-link>
            <router-link :to="{ name: 'my-orders' }" class="me-2 px-2 main-link"
              :class="this.$route.name == 'my-orders' ? 'active' : ''">My Orders</router-link>
            <router-link :to="{ name: 'outstanding-invoices' }" class="me-2 px-2 main-link"
              :class="this.$route.name == 'outstanding-invoices' ? 'active' : ''">Outstanding Invoices</router-link>
            <router-link :to="{ name: 'contact-us' }" class="me-2 px-2 main-link"
              :class="this.$route.name == 'contact-us' ? 'active' : ''">Contact Us</router-link>
            <div class="cart-btn-section">
              <div class="dropdown ms-2 me-3">
                <Cart></Cart>
              </div>
            </div>
            <a href="#" class="ps-2 main-link logout" @click="logOut"><i class="bi bi-box-arrow-right"></i></a>
          </div>

          <div class="col-6 d-flex d-md-none align-items-center justify-content-end">
            <div class="cart-btn-section">
              <div class="dropdown ms-2 me-3">
                <Cart></Cart>
              </div>
            </div>
            <button class="btn side-panel-toggle-btn pe-0" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
              <span class="one"></span>
              <span class="two"></span>
              <span class="three"></span>
            </button>
          </div>
        </div>
      </div>

      <div class="search-section pb-4">
        <div class="row d-flex align-items-center justify-content-center">
          <div class="col-md-7 col-lg-5">
            <div v-if="!isCartRoute" class="input-group">
              <input type="text" @keyup="searchProducts" v-model="searchKey" class="form-control" placeholder="SEARCH" />
              <span class="input-group-text pe-3 mouse-cursor" @click="searchProducts"><i class="bi bi-search"></i></span>
            </div>
          </div>
        </div>
      </div>

      <!-- <div v-if="filteredProducts.length > 0">
  <div class="product-container">
    <div v-for="product in filteredProducts" :key="product.id" class="product-item">
       
      <h3>{{ product.name }}</h3>
      <p>{{ product.short_description }}</p>
    
    </div>
  </div>
</div>
      <div v-else>
      No products found.
    </div> -->

      <div class="notice">
        <div class="row d-none d-md-flex align-items-center justify-content-center">
          <div class="col-md-12 col-lg-8 notice-div bg-white text-black py-2 px-5">
            Kindly order before 5.00p.m. for next day delivery except for Sunday and
            Public Holiday. Any orders received on Sunday / Public Holiday will only be
            processed by office on the next working day. An email notification will be
            sent to you when order is complete
          </div>
        </div>
      </div>
    </div>
  </div>
  <MobileMenu></MobileMenu>
</template>

<script>
import Cart from "../../components/cart/cart";
import MobileMenu from "../../components/headers/mobile-menu.vue";

export default {
  name: "HelloWorld",
  components: {
    Cart,
    MobileMenu,
  },
  data() {
    return {
      searchKey: "",
      products: [],
      userData: JSON.parse(localStorage.getItem('user')),
      userName: '',
    };
  },
  methods: {
    async searchProducts() {
      try {
        const searchValue = this.searchKey; //cosnt set in serchfiled input value
        this.$store.state.productsData.pageID = 0; //this is  page id 0 set

        this.$store.state.productsData.searchValue = searchValue;

        var apiCallPath = "";

        if (this.$store.state.productsData.currentClicked == 'allProduct') {
          apiCallPath = "productsData/getAllProductsWithSearch";
        } else if (this.$store.state.productsData.currentClicked == 'recentProduct') {
          apiCallPath = "productsData/getRecentWithSearch";
        } else {
          apiCallPath = "productsData/getMyProductsWithSearch";
        }

        this.$store.dispatch(apiCallPath, {
          categoryCode: this.$store.state.productsData.selectedCategoryCode,
          currentClicked: this.$store.state.productsData.currentClicked,
          searchValue,
        });

        //serch value parse in store function paroduct is erch in to Category & all product data parse in parameter
      } catch (error) {
        console.error("Error:", error);
      }
    },
    logOut() {
      this.$swal.fire({
        title: 'Confirm logout?',
        text: 'Are you sure want to logout!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, continue!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("logout");
          console.log('Action confirmed!');
        } else {
          console.log('Action canceled!');
        }
      });

    },

  },
  computed: {
    // filteredProducts() {
    //   const searchTerm = this.search.toLowerCase();
    //   return this.products.filter((product) =>
    //     product.name.toLowerCase().includes(searchTerm)
    //   );
    // },
    isCartRoute() {
      return this.$route.name === "checkout";
    },
  },
  async  mounted() {
    this.$store.dispatch("productsData/getProducts");
    this.$store.dispatch("userProfileData/getUserData");
    this.userName = this.userData.first_name;
  },
};
</script>

<style lang="scss">
.mouse-cursor {
  cursor: pointer;
}

.header {
  background-color: #0033a0;
  color: #fff;
  font-family: "Inria Sans", sans-serif;
  letter-spacing: 0.7px;
  font-weight: 300;
  max-height: 285px;

  a {
    color: #fff;
  }

  .top-header {
    .lang-btn {
      border-color: #fff;
      color: #fff;
    }
  }

  .main-header {
    .main-link {
      font-size: 20px;

      &.active {
        color: #facd01;
        border: 1px solid #facd01;
        border-radius: 5px;
      }

      &.logout {
        color: #facd01;
        font-size: 23px;
      }
    }

    .cart-btn-section {
      .cart-btn {
        background-color: transparent;
        color: #facd01;
        font-size: 23px;

        &:after {
          display: none;
        }

        &:focus {
          border-color: transparent;
        }

        .cart-count {
          background: #facd01;
          width: 20px;
          height: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 13px;
          margin-left: -4px;
          padding: 0;
        }
      }
    }

    .side-panel-toggle-btn {
      border-color: transparent !important;
      outline: 0;
      box-shadow: none;

      span {
        height: 3px;
        background-color: #fff;
        position: relative;
        display: block;
        margin-bottom: 4px;
        transition: all 0.5s ease;
        opacity: 0.8;

        &.one {
          width: 16px;
        }

        &.two {
          width: 22px;
        }

        &.three {
          width: 19px;
        }
      }

      &:hover {
        span {
          width: 22px;
          background-color: #fff;
          opacity: 1;
        }
      }
    }
  }

  .search-section {
    input {
      height: 55px;
      border-radius: 50px;
      padding-left: 20px;
      background-color: #a2bdeb;
      border-right: 0 !important;
      border-color: #a2bdeb;
      color: #0033a0;

      &:focus {
        box-shadow: none;
      }

      &::-webkit-input-placeholder {
        color: #0033a0;
      }

      &::-moz-placeholder {
        color: #0033a0;
      }

      &:-ms-input-placeholder {
        color: #0033a0;
      }

      &:-moz-placeholder {
        color: #0033a0;
      }
    }

    .input-group-text {
      height: 55px;
      border-radius: 50px;
      padding-left: 20px;
      background-color: #a2bdeb;
      border: none !important;
      color: #0033a0;
      font-weight: 600;
    }
  }

  .notice-div {
    border-radius: 12px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    font-size: 16px;
    z-index: 99;
  }
}
</style>
