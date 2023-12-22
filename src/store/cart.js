import axiosClient from '../axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const cartsData = {
  namespaced: true,
  state() {
    return {
      // products: JSON.parse(localStorage.getItem('cartItems')) || []
      data: {
        deliveryDate: '',
      },
      successMessage: null,
    }
  },
  getters: {

    subtotal: (state) => {
      if (!state.data || !Array.isArray(state.data) || state.data.length === 0) {
        return 0;
      }
      return state.data.reduce((total, cartItem) => {
        const product = cartItem.product;
        const quantity = cartItem.quantity;
        const price = (product && product.selling_price) || 0;

        return total + quantity * price;
      }, 0);
    },
  },
  mutations: {
    // set products
    // setCartProducts(state, item) {
    //     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    //     const existingItemIndex = cartItems.findIndex(existingItem => existingItem.product.id === item.product.id);

    //     if (existingItemIndex !== -1) {
    //         cartItems[existingItemIndex] = item;
    //     } else {
    //         cartItems.push(item);
    //     }
    //     state.products = cartItems;
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // },
    setCartData(state, payload) {
      state.data = payload;

    },
    setSuccessMessage(state, message) {
      state.successMessage = message;
    },


  },
  actions: {


    // async setCartProducts(context, payload) {
    //     if(Array.isArray(this.state.productsData.data)) {
    //         const cartItem = {
    //             product: this.state.productsData.data.find(product => product.id === payload.productId),
    //             qty: payload.qty
    //         };
    //         context.commit('setCartProducts', cartItem);
    //     }

    // },

    async addCart({ commit, dispatch }, { product_id, quantity }) {
      try {
        const customer_id = localStorage.getItem('userId');

        let formData = new FormData();
        formData.append('product_id', product_id);
        formData.append('quantity', quantity);
        formData.append('customer_id', customer_id);

        let url = "/customer-carts/add-to-cart";

        const response = await axiosClient.post(url, formData);

        if (response.data.status === true) {
          console.log('Add to cart success');
          // Call the getCartData action after a successful addCart
          await dispatch('getCartData');
        } else {
          console.log(response.data.status);
          // Handle the case where add to cart is not successful
        }
      } catch (error) {
        console.log(error);
        // Handle any errors that occur during the addCart process
      }
    },

    async getCartData(context) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        // Handle the case where userId is not available
        console.error('userId not found in local storage');
        return;
      }
      const delivaryDate = context.state.deliveryDate;
      // Update the URL with userId
      const url = `/customer-carts/get-by-customer/${userId}/${delivaryDate}`;

      return axiosClient.get(url)
        .then(response => {
          if (response.data.status) {

            context.commit('setCartData', response.data.payload)
          } else {
            context.commit('setCartData', [])
            toast.error(response.data.message, {
              autoClose: false,
            });
          }
        })

    },

    async removeCart({ cart, dispatch }, { productId }) {

      const customerId = localStorage.getItem('userId');

      let url = `/customer-carts/remove-from-cart?customerId=${customerId}&productId=${productId}`;

      return axiosClient.get(url).then(async response => {
        if (response.data.status == true) {
          // console.log(response.data.message);
          await dispatch('getCartData');
        } else {
          // console.log(response.data.message);
        }
      }).catch(error => {
        console.log(error);
      });
    },

    async addQtyByOne({ commit, dispatch }, { productId }) {
      const customerId = localStorage.getItem('userId');

      let url = `/customer-carts/increase?customerId=${customerId}&productId=${productId}`;

      return axiosClient.get(url).then(async response => {
        if (response.data.status == true) {
          console.log(response.data.message);
          await dispatch('getCartData');

        } else {

          console.log(response.data.message);
        }
      }).catch(error => {
        console.log(error);
      });
    },

    async removeQtyByOne({ cart, dispatch }, { productId }) {

      const customerId = localStorage.getItem('userId');

      let url = `/customer-carts/decrease?customerId=${customerId}&productId=${productId}`;

      return axiosClient.get(url).then(async response => {
        if (response.data.status == true) {
          console.log(response.data.message);
          await dispatch('getCartData');
        } else {
          console.log(response.data.message);
        }
      }).catch(error => {
        console.log(error);
      });
    },

    async removeAllItemsInCart({ state, dispatch }) {
      const customerId = localStorage.getItem("userId");
      try {
        for (let i = 0; i < state.data.length; i++) {
          const url = `/customer-carts/remove-from-cart?customerId=${customerId}&productId=${state.data[i].product.id}`;
          const response = await axiosClient.get(url);
          if (response.data.status === true) {
            console.log(response.data.message);
          } else {
            console.log(response.data.message);
          }
        }
      } catch (error) {
        console.error(error);
      }

    },
    validateCart({ commit }, payload) {
      const { index } = payload;
      if (Array.isArray(index)) {
        index.forEach((item, i) => {
          console.log(`Processing item ${i + 1}:`, item.No);

          for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].id === item.No) {
              matchingItem = this.state.data[i];
              break; // Exit the loop once a match is found
            }
          }
  // Rest of your code

        // if (matchingItem) {
        //   console.log("Item is a match:", matchingItem);
        //   // You can commit a mutation or take any other action based on the match
        // } else {
        //   console.log("Item is not a match");
        // }
        });
      }
    },

  }
}

export default cartsData;