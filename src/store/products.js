import axiosClient from '../axios';

const productsData = {
  namespaced: true,
  state() {
    return {
      dataFullList: [],
      data: [],
      lastPage: null,
      currentClicked: 'recentProduct',
      pageID: 0,
      selectedCategoryCode: null,
      isLoading: false,
      deliveryDate: "",
      sortingValue: 0,
      searchValue: null,
    }
  },


  mutations: {

    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },//loading variable

    setProducts(state, { payload, currentClicked }) {
      state.data = state.data || [];
      state.dataFullList = state.dataFullList || [];

      state.lastPage = payload.lastPage;

      state.currentClicked = currentClicked;

      if (Array.isArray(payload.products)) {
        state.data = [...state.data, ...payload.products];
        state.dataFullList = [...state.dataFullList, ...payload.products];
      } else {
        console.error(':', payload);
      }

    },

    increasePageId(state) {
      state.pageID++;
    },

    clearProduct(state) {
      state.dataFullList = [];
      state.data = [];
      state.lastPage = null;
    },

    setSelectedCategory(state, categoryCode) {
      state.selectedCategoryCode = categoryCode;
    },

    handleSorting(state) {
      var data = [];
      data = state.dataFullList.slice();

      state.isLoading = true;

      if (state.sortingValue == 1) {
        state.data = data.sort((a, b) => {
          return a.item_code.localeCompare(b.item_code);
        });
      }
      else if (state.sortingValue == 2) {
        state.data = data.sort((a, b) => {
          return a.description.localeCompare(b.description);
        });
      } else if (state.sortingValue == 3) {
        state.data = data.sort((a, b) => {
          return a.selling_price - b.selling_price; // Ascending order
        });
      } else if (state.sortingValue == 4) {
        state.data = data.sort((a, b) => {
          return b.selling_price - a.selling_price; // Descending order
        });
      } else {
        state.data = state.dataFullList;
      }

      state.isLoading = false;


    },// sorting option

  },

  actions: {

    async getAllProductsWithSearch(context, { categoryCode, currentClicked, searchValue, isNotNeedToIncreasePage }) {

      if (!isNotNeedToIncreasePage) {
        context.commit('increasePageId');
      } else {
        context.state.pageID = 1;
      }

      context.commit('SET_LOADING', true);



      const jsonData = {
        page: context.state.pageID,
        categoryCode: context.state.selectedCategoryCode,
        searchKey: context.state.searchValue,
        sortType: null,
        sortOrder: null,
        // pass JSON value in api post body 
      };

      const token = localStorage.getItem('token');

      try {
        const response = await axiosClient.post("/products/search", jsonData
          , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        )  //header is used JSON Content-Type


        if (context.state.pageID === 1)  //this function is page id 1 assing
        {
          context.commit('clearProduct');
        }  /// this function call to clearProduct data,last page null set to page id = 1 need

        context.commit('setProducts', { payload: response.data.payload, currentClicked: currentClicked });

        context.commit('setSelectedCategory', categoryCode);
        context.commit('handleSorting');
        context.commit('SET_LOADING', false);
      } catch (error) {//code testing error line

        console.error('Error fetching products:', error);
        context.commit('SET_LOADING', false);
      }
    },

    async getMyProductsWithSearch(context, { categoryCode, currentClicked, searchValue, isNotNeedToIncreasePage }) {
      context.commit('SET_LOADING', true);

      if (!isNotNeedToIncreasePage) {
        context.commit('increasePageId');
      } else {
        context.state.pageID = 1;
      }


      const jsonData = {
        page: context.state.pageID,
        delivery_date: context.state.deliveryDate,
        category_code: context.state.selectedCategoryCode,
        searchKey: context.state.searchValue,
        sortType: null,
        sortOrder: null,
        // pass JSON value in api post body 
      };

      const token = localStorage.getItem('token');

      try {//code testing line
        const response = await axiosClient.post("/products/my-products/search", jsonData
          , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        )  //header is used JSON Content-Type


        if (context.state.pageID === 1) {
          context.commit('clearProduct');
        }

        context.commit('setProducts', { payload: response.data.payload, currentClicked: currentClicked });

        context.commit('setSelectedCategory', categoryCode);
        context.commit('handleSorting');
        context.commit('SET_LOADING', false);

      } catch (error) {
        // console.error('Error fetching products:', error);
        context.commit('SET_LOADING', false);
      }
    },

    async getRecentWithSearch(context, { categoryCode, currentClicked, searchValue, isNotNeedToIncreasePage }) {
      context.commit('SET_LOADING', true);

      if (!isNotNeedToIncreasePage) {
        context.commit('increasePageId');
      } else {
        context.state.pageID = 1;
      }

      const jsonData = {
        page: context.state.pageID,
        delivery_date: context.state.deliveryDate,
        category_code: context.state.selectedCategoryCode,
        searchKey: context.state.searchValue,
        sortType: null,
        sortOrder: null,
        // pass JSON value in api post body 
      };

      const token = localStorage.getItem('token');

      try {//code testing line
        const response = await axiosClient.post("/products/recent-products/search", jsonData
          , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        )  //header is used JSON Content-Type


        if (context.state.pageID === 1) {
          context.commit('clearProduct');
        }

        context.commit('setProducts', { payload: response.data.payload, currentClicked: currentClicked });

        context.commit('setSelectedCategory', categoryCode);
        context.commit('handleSorting');
        context.commit('SET_LOADING', false);

      } catch (error) {
        // console.error('Error fetching products:', error);
        context.commit('SET_LOADING', false);
      }
    },

  },

};


export default productsData  