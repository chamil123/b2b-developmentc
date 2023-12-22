import store from '.';
import axiosClient from '../axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from "../router";

import { format } from 'date-fns';

const getCustomerId = () => {
  const userDataString = localStorage.getItem('user');
  if (!userDataString) {
    console.error('userId or userData not found in local storage');
    return null;
  }
  return JSON.parse(userDataString).customer_id;
};


const buildOrderLinesData = (orderLines) => {
  return orderLines.map((orderLine) => {
    const orderLineData = new FormData();
    orderLineData.append('product_id', orderLine.product.id);
    orderLineData.append('code', orderLine.product.item_code);
    orderLineData.append('quantity', orderLine.quantity);
    orderLineData.append('unit_price', orderLine.product.selling_price);
    orderLineData.append('discount', 0);
    orderLineData.append('weight', 2);
    orderLineData.append('uom_number', orderLine.product.uom);
    orderLineData.append('transferred', orderLine.product.is_featured);
    return orderLineData;
  });
};

const buildOrderData = (payload, orderLinesData, rootState) => {

  const orderData = new FormData();
  orderData.append('no', payload.orderNo);
  orderData.append('customer_id', getCustomerId());
  orderData.append('payment_type_id', 1);
  orderData.append('delivery_type_id', 1);
  orderData.append('order_date', rootState.orderData.orderDate);
  orderData.append('delivery_date', payload.orderDate);
  orderData.append('amount_vat', payload.amountVat);
  orderData.append('amount_exclude_vat', payload.amountExcludeVat);
  orderData.append('amount_include_vat', payload.amountIncludeVat);
  orderData.append('tax_percentage',payload.taxPresentage);//payload.taxPresentage
  orderData.append('driver_code', payload.driverCode);//payload.driverCode
  orderData.append('delivery_charge', payload.delivaryCharges);
  orderData.append('saleperson_number',payload.salesPersonCode);//payload.salesPersonNumber
  orderData.append('is_cod', 0);
  orderData.append('order_status', 1);
  orderData.append('payment_status', 1);
  orderData.append('timestamp',"01:39:00");//rootState.orderData.currentTime,"01:39:00"
  orderData.append('timezone', rootState.orderData.currentTimezone);
  orderData.append('shippingAddress', payload.billingAddress);
  orderData.append('billingAddress', payload.shippingAddress);
  orderData.append('remark', payload.remarks);

  orderLinesData.forEach((orderLine, index) => {
    orderLine.forEach((value, key) => {
      orderData.append(`orderLines[${index}][${key}]`, value);
    });
  });

  return orderData;
};



const orderData = {
  namespaced: true,
  state() {
    return {
      data: {},
      isLoading: false,
      currentTimezone: null,
      currentTime: null,
      orderDate: null,
      stockData:{}

    };
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },//loading variable
    setOrderData(state, payload) {
      state.data = payload;
    },
    setCurrentTimezone(state, timezone) {
      state.currentTimezone = timezone;
    },
    setCurrentTime(state, currentTime) {
      state.currentTime = currentTime;
    },
    setOrderDate(state, orderDate) {
      state.orderDate = orderDate;
    },
    setAvailableStock(state,stockData){
      state.stockData=stockData
    }
  },
  getters: {

  },
  actions: {
    fetchCurrentDateAndTime({ commit }) {
      const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
      const currentDateTime = new Date();
      commit('setOrderDate', format(currentDateTime, 'yyyy-MM-dd HH:mm:ss'));
      commit('setCurrentTime', currentTime);
      commit('setCurrentTimezone', currentTimezone);
    },

    async getOrderData(context) {
      context.commit('SET_LOADING', true);
      const customer_id = await getCustomerId();
      if (!customer_id) {
        console.error('userId or userData not found in local storage');
        return;
      }
      // Update the URL with userId
      const url = `/orders/customer-order/${customer_id}`;
      return axiosClient.get(url)
        .then(response => {
          // console.log(response);
          context.commit('SET_LOADING', false);
          context.commit('setOrderData', response.data.payload)
        })
    },

    async validationBeforeplaceOrder({ commit, rootState, dispatch }, payload) {
      try {
        await dispatch('fetchCurrentDateAndTime');
        const orderLinesData = buildOrderLinesData(rootState.cartsData.data);
        const orderData = buildOrderData(payload, orderLinesData, rootState);

        let stockValidation = new FormData();
        stockValidation.append('deliveryDate', rootState.orderData.orderDate);
        orderLinesData.forEach((orderLine, index) => {
          orderLine.forEach((value, key) => {
            stockValidation.append(`orderLines[${index}][${key}]`, value);
          });
        });
        stockValidation.append('shippingAddress', payload.billingAddress);
        stockValidation.append('billingAddress', payload.shippingAddress);
        commit('SET_LOADING', true);
        let url = `/validate-stock/`;
        const response = await axiosClient.post(url, stockValidation);

        const payloadData=response.data.payload.payload
        // await dispatch('cartsData/validateCart', { index:payloadData }, { root: true });
      
        commit('setAvailableStock',payloadData);
        if (response.data.payload.status == 200) {
          let url = `/order/cut-off-time`;
          // commit('SET_LOADING', true);
          const response = await axiosClient.post(url, orderData);

          if (response.data.payload.status == 200) {
            const userDataString = localStorage.getItem('user');
            if (!userDataString) {
              console.error('userId or userData not found in local storage');
              return null;
            }

            const payment_terms_code = JSON.parse(userDataString).payment_terms_code;
            if (payment_terms_code == "CBD") {// == "CBD"

              const response = await dispatch('placeOrder', { payload: payload, orderType: payment_terms_code });

              commit('SET_LOADING', false);
              response.data.payload = {
                ...response.data.payload,
                cusType: "CBD",
              };

              return response.data.payload;
            } else {
              commit('SET_LOADING', false);
              response.data.payload = {
                ...response.data.payload,
                cusType: "COD",
              };
              return response.data.payload;
            }
          } else {
            commit('SET_LOADING', false);
            return response.data.payload;
          }
          // end check cut off time validation
        } else {

          commit('SET_LOADING', false);
          return response.data.payload;
          // return {
          //   status: false,
          //   message: response.data.payload.message
          // }
        }
      } catch (error) {
        commit('SET_LOADING', false);
        // console.error('Error validating order:', error);
        toast.error(error.message || 'Validation failed', { autoClose: 1500 });
      }
    },

    async placeOrder({ commit, rootState, dispatch }, { payload, orderType }) {

      commit('SET_LOADING', true);
      try {

        await dispatch('fetchCurrentDateAndTime');
        const orderLinesData = buildOrderLinesData(rootState.cartsData.data);
        const orderData = buildOrderData(payload, orderLinesData, rootState);

        let url;
        if (orderType == "CBD") {
          url = `/order/submit-order`;
        } else {
          url = `/order/submit`;
        }

        const response = await axiosClient.post(url, orderData);
        commit('SET_LOADING', false);

        return response;
      } catch (error) {
        commit('SET_LOADING', false);
        // console.error('Error placing order:', error);
        toast.success(error, {
          autoClose: 1500,
        });
      }
    },
  }
};

export default orderData 