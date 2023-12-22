<template>
    <div class="fillter">
        <div class="item">
            <button class="filter-show-hide btn d-block d-md-none" @click="showMoreFilter">
                <i class="bi bi-funnel"></i>
            </button>
            <div class="mb-3 d-date">
                <label for="delivery_date" class="form-label w-100 text-start mb-0">Delivery Date</label>
                <input type="date" class="form-control" id="delivery_date" :min="minDate"
                    :value="this.$store.state.productsData.deliveryDate" @change="deliveryDateChange()" />
            </div>
            <div class="seperator"></div>
        </div>

        <div class="item">
            <div class="mb-3">
                <label for="sorting" class="form-label w-100 text-start mt-3 mb-0">Sorting</label>
                <select class="form-select form-select-lg mb-3" id="sorting"
                    :value="this.$store.state.productsData.sortingValue" aria-label="Large select example"
                    @change="handleSorting()">
                    <option value="0">Default sorting</option>
                    <option value="1">Code</option>
                    <option value="2">Description</option>
                    <option value="3">Price:Low to High</option>
                    <option value="4">Price:High to Low</option>
                </select>
            </div>
            <div class="seperator"></div>
        </div>

        <div class="item products">
            <div class="mb-3">
                <label class="form-label w-100 text-start mt-3 mb-0">Products</label>
                <a href="#" class="option text-start" :class="{
                    active: $store.state.productsData.currentClicked === 'recentProduct',
                }" @click="loadRecentProduct()"><i class="bi bi-box-fill me-2"></i>RECENT PRODUCTS</a>
                <a href="#" class="option text-start"
                    :class="{ active: $store.state.productsData.currentClicked === 'myProduct' }" @click="loadMyProduct()">
                    <i class="bi bi-box-fill me-2"></i>MY PRODUCTS</a>
                <a href="#" class="option text-start"
                    :class="{ active: $store.state.productsData.currentClicked === 'allProduct' }"
                    @click="loadAllProduct()"><i class="bi bi-box-fill me-2"></i>ALL PRODUCTS</a>
            </div>
            <div class="seperator"></div>
        </div>

        <div class="item categories">
            <div class="mb-3">
                <label class="form-label w-100 text-start mt-3 mb-0">Categories</label>

                <div class="row w-100 mx-0 mt-2 products-row" v-if="Array.isArray(this.$store.state.categoriesData.data)">
                    <div class="col-12 px-lg-0" v-for="category in this.$store.state.categoriesData.data.slice(
                        0,
                        categoriesToShow
                    )" v-bind:key="category.id">
                        <p class="option text-start pt-0 m-0 px-0" :class="{
                            'active-category':
                                category.name === this.$store.state.productsData.selectedCategoryCode,
                        }" @click="handleCategoryClick(category.name)">
                            {{ category.slug }}
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <button class="btn option text-starts p-0 m-0 text-uppercase" @click="toggleCategories">
                            {{ loadMoreCategoriesBtn ? "More...." : "Less...." }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SideFillter",

    data() {
        return {
            categoriesToShow: 3,
            loadMoreCategoriesBtn: true,
            deliveryDate: this.$store.state.productsData.deliveryDate,
            // sortingValue: 0,
        };
    },

    mounted() {
        if (!this.$store.state.productsData.deliveryDate) {
            const today = new Date();
            this.$store.state.productsData.deliveryDate = today.toISOString().split("T")[0];
        }

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

            if (this.$store.state.productsData.currentClicked == "allProduct") {
                apiCallPath = "productsData/getAllProductsWithSearch";
            } else if (this.$store.state.productsData.currentClicked == "recentProduct") {
                apiCallPath = "productsData/getRecentWithSearch";
            } else {
                apiCallPath = "productsData/getMyProductsWithSearch";
            }

            this.$store.state.productsData.pageID = 0;
            this.$store.state.productsData.selectedCategoryCode = categoryCode; // set category cade to product js data selectedCategoryCode to

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
            this.$store.state.productsData.sortingValue = event.target.value;
            this.$store.commit(
                "productsData/handleSorting",
                this.$store.state.productsData.sortingValue
            );
        }, // sorting option

        deliveryDateChange() {
            this.$store.state.productsData.deliveryDate = event.target.value;
            this.$store.state.cartsData.deliveryDate = event.target.value;
            var apiCallPath = "";

            if (this.$store.state.productsData.currentClicked == "allProduct") {
                apiCallPath = "productsData/getAllProductsWithSearch";
            } else if (this.$store.state.productsData.currentClicked == "recentProduct") {
                apiCallPath = "productsData/getRecentWithSearch";
            } else {
                apiCallPath = "productsData/getMyProductsWithSearch";
            }

            this.$store.dispatch(apiCallPath, {
                categoryCode: this.$store.state.productsData.selectedCategoryCode,
                currentClicked: this.$store.state.productsData.currentClicked,
                isNotNeedToIncreasePage: true,
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },

        loadAllProduct() {
            this.$store.state.productsData.pageID = 0;
            this.$store.state.productsData.selectedCategoryCode = null;
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
            this.$store.state.productsData.selectedCategoryCode = null;
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
            this.$store.state.productsData.selectedCategoryCode = null;
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
            if (
                this.categoriesToShow <= this.categoriesData.length &&
                this.categoriesToShow <= 3
            ) {
                this.loadMoreCategoriesBtn = true;
            } else {
                this.loadMoreCategoriesBtn = false;
            }
        },
    },
};
</script>

<style lang="scss">
.active-category {
    font-weight: 900;
    color: #0033a0 !important;
}

.fillter {
    padding-left: 5rem !important;
    height: 100%;

    .item {
        position: relative;

        label {
            font-family: "Kalam", cursive;
            font-size: 25px;
            font-weight: 600;
        }

        input {
            background-color: #fff;
            border-right: 0px;
            border: none;
            height: 45px;

            &::-webkit-input-placeholder {
                color: #d1d1d1;
            }

            &::-moz-placeholder {
                color: #d1d1d1;
            }

            &:-ms-input-placeholder {
                color: #d1d1d1;
            }

            &:-moz-placeholder {
                color: #d1d1d1;
            }
        }

        select {
            color: #8f8f8f;
            background-color: #fff;
            border-right: 0px;
            border: none;
            height: 45px;
        }

        .seperator {
            background-color: rgb(70, 69, 69);
            height: 1px;
            position: absolute;
            left: -100%;
            width: 200%;
        }

        &.products {
            .option {
                padding: 10px;

                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
                font-size: 17px;
                font-family: "Kalam", cursive;
                color: #7b7b7b;

                &.active {
                    background-color: #fff;
                    color: #0033a0;
                }

                display: block;
            }
        }

        &.categories {
            .option {
                cursor: pointer;
                padding: 10px;
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
                font-size: 17px;
                font-family: "Kalam", cursive;
                color: #7b7b7b;

                &.active {
                    background-color: #fff;
                    color: #0033a0;
                }

                display: block;
            }
        }
    }
}

@media only screen and (max-width: 1000px) {
    .fillter {
        height: 130px;
        width: 100%;
        overflow: hidden;
        padding: 25px !important;
        transition: all 0.5s ease;

        &.show-more {
            height: auto;
        }

        .d-date {
            width: 80%;
        }

        .filter-show-hide {
            position: absolute;
            right: 0;
            top: 40px;
            background-color: #facd01;
        }
    }
}
</style>
