/* __placeholder__ */
export default (await import('vue')).defineComponent({
    name: "SideFillter",

    data() {
        return {
            categoriesToShow: 3,
            loadMoreCategoriesBtn: true,
            deliveryDate: this.$store.state.productsData.deliveryDate,
        };
    },

    mounted() {
        const today = new Date();
        this.$store.state.productsData.deliveryDate = today.toISOString().split("T")[0];

        this.$store.dispatch("categoriesData/getCategories", 1);
    },

    computed: {
        categoriesData() {
            return this.$store.state.categoriesData.data || [];
        },
        minDate() {
            const today = new Date();
            return today.toISOString().split("T")[0];
        }, // delivery date min set
    },

    methods: {
        handleCategoryClick(categoryCode) {
            var apiCallPath = "";

            if (this.$store.state.productsData.currentClicked == 'allProduct') {
                apiCallPath = "productsData/getAllProductsWithSearch";
            } else {
                apiCallPath = "productsData/getMyProductsWithSearch";
            }

            // this function using for category wise product select
            this.$store.state.productsData.pageID = 0; // category name click page id 0

            this.$store.dispatch(apiCallPath, {
                categoryCode,
                currentClicked: this.$store.state.productsData.currentClicked,
            }); // category id & current click type  'categoryProduct' store data parsing

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            }); // site scroll top
        },

        handleSorting() {

            var data = [];

            data = this.$store.state.productsData.dataFullList.slice(); // Create a copy of the original array
            this.$store.state.productsData.isLoading = true;

            if (event.target.value == 1) {
                this.$store.state.productsData.data = data.sort((a, b) => {
                    return a.item_code.localeCompare(b.item_code);
                });
            }
            else if (event.target.value == 2) {
                this.$store.state.productsData.data = data.sort((a, b) => {
                    return a.description.localeCompare(b.description);
                });
            }
            else if (event.target.value == 3) {
                // this.$store.state.productsData.data = data.sort((a, b) => {
                //     return a.item_code.localeCompare(b.item_code);
                // });
            }
            else {
                // this.$store.state.productsData.data = data.sort((a, b) => {
                //     return a.item_code.localeCompare(b.item_code);
                // });
            }

            this.$store.state.productsData.isLoading = false;


        }, // sorting option

        loadAllProduct() {
            this.$store.state.productsData.pageID = 0;
            this.$store.dispatch("productsData/getAllProductsWithSearch", {
                categoryCode: "",
                currentClicked: "allProduct",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },

        loadMyProduct() {
            this.$store.state.productsData.pageID = 0;
            this.$store.dispatch("productsData/getMyProductsWithSearch", {
                categoryCode: "",
                currentClicked: "myProduct",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },

        loadRecentProduct() {
            this.$store.state.productsData.pageID = 0;
            this.$store.dispatch("productsData/getRecentWithSearch", {
                categoryCode: "",
                currentClicked: "recentProduct",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },

        toggleCategories() {
            if (this.loadMoreCategoriesBtn) {
                this.loadMoreCategories(3);
            } else {
                this.showLessCategories(3);
            }
        },

        loadMoreCategories(increase) {
            this.categoriesToShow += increase;
            if (this.categoriesToShow >= this.categoriesData.length) {
                this.loadMoreCategoriesBtn = false;
            }
        },

        showLessCategories(decrease) {
            this.categoriesToShow -= decrease;
            if (this.categoriesToShow <= this.categoriesData.length &&
                this.categoriesToShow <= 3) {
                this.loadMoreCategoriesBtn = true;
            } else {
                this.loadMoreCategoriesBtn = false;
            }
        },
    },
});
