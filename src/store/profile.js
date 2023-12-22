import axios from 'axios';
import axiosClient from '../axios';

const userProfileData = {
  namespaced: true,
  state() {
    return {
      data: {},
      address: '',
      addressList: {},
      formData: {
        firtName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        city: '',
        zip: '',
        country: '',
      },
    };
  },
  getters: {

    getUserData: (state) => {
      if (!state.data || !Array.isArray(state.data) || state.data.length === 0) {
        return 0;
      }
      return state.data;
    },
     getFirstAddress: (state) => {
      if (state.addressList.length > 0) {
        return state.addressList[0];
      } else {
        return null;
      }

    }
  },
  mutations: {
    setUserdata(state, payload) {

      state.data = payload;
      if (payload.addresses&& payload.addresses.length > 0 && payload.addresses[0].address_line_1){
        state.address = payload.addresses[0].address_line_1??"";
      }
      
      state.addressList = payload.addresses;
    },

    setAddressData(state, payload) {
      state.formData = { ...state.formData, ...payload };

    }
  },
  actions: {
    async getUserData(context) {
      // Get userId from local storage
      const userId = localStorage.getItem('userId');
      const userDataString = localStorage.getItem('user');
      if (!userDataString) {
        console.error('userId or userData not found in local storage');
        return;
      }

      if (!userId) {
        // Handle the case where userId is not available
        console.error('userId not found in local storage');
        return;
      }
      try {
        const user = JSON.parse(userDataString);
        const userId = user.user_id;
        const url = `/customers/user/${userId}`;
        try {
          const response = await axiosClient.get(url);
          context.commit('setUserdata', response.data.payload);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async addAddressFormData({ state, commit }) {
      try {
        const customer_id = localStorage.getItem('userId');
        let formData = new FormData();
        formData.append('customer_id', customer_id);
        formData.append('first_name', state.formData.firtName);
        formData.append('last_name', state.formData.lastName);
        formData.append('email', state.formData.emailAddress);
        formData.append('phone', state.formData.phoneNumber);
        formData.append('postal_code', state.formData.zip);
        formData.append('city', state.formData.city);
        formData.append('state', state.formData.state);
        formData.append('country', state.formData.country);
        formData.append('address_line_1', state.formData.addressLine1);
        formData.append('address_line_2', state.formData.addressLine2);

        commit('setAddressData', state.formData);

        let url = `/addresses/create/${customer_id}`;
        const response = await axiosClient.post(url, formData);


        if (response.data.status === true) {
          // console.log('Add to address success');
          // await dispatch('getCartData');
        } else {
          console.log(response.data.status);
        }
      } catch (error) {
        console.log(error);

      }
    }
  }

};

export default userProfileData






