import axios from "axios";
import { createStore } from "vuex";
import productsData from "./products";
import cartsData from "./cart";
import categoriesData from "./categories";
import userProfileData from "./profile";
import contactsData from "./contacts";
import orderData from "./orders";
import router from "../router";
import axiosClient from '../axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isLoading: false,
  },

  mutations: {

    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },//loading variable
    setAuthToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      state.error = null;
    },
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem('userId', userId);
      state.error = null;
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', user);
      state.error = null;
    },
    clearAuthToken(state) {
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    },
    setLoginError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async login({ commit  }, { email, password }) {
      
      commit('SET_LOADING', true);
      let formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      let url = "/login";

      await axiosClient
        .post(url, formData)
        .then((response) => {
          if (response.data.status == true) {
            email = "";
            password = "";

            const token = response.data.payload.token;
            const userId = response.data.payload.customer.customer_id;
            const user = response.data.payload.customer;

            commit("setAuthToken", token);
            commit("setUserId", userId);
            commit("setUser", JSON.stringify(user));
            commit('SET_LOADING', false);
            router.push('/');
          } else {
            commit('SET_LOADING', false);
            commit("setLoginError", "Invalid email or password");
            console.log("error");
          }
        }).catch(error => {
          commit("setLoginError", error);
          commit('SET_LOADING', false);
        });

    },
    async logout({ commit }) {
      try {
        // Clear the token on logout
        commit("clearAuthToken");
        router.push('/login');
        console.log("Logged out successfully.");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getToken: state => state.token,
  },
  modules: {
    productsData,
    cartsData,
    categoriesData,
    userProfileData,
    contactsData,
    orderData
  },
});
