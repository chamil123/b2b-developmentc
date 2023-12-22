<template>
    <div class="home-page">
        <div class="row mx-0 d-flex">
            <div class="col-lg-3 col-md-4 left-panel pt-5 pe-0">
                <SideFillter></SideFillter>
            </div>
            <div class="col-lg-9 col-md-8 pt-5" :class="{'d-flex align-items-center justify-content-center': this.$store.state.productsData.isLoading,}">
                <template v-if="this.$store.state.productsData.isLoading">
                    <Loader></Loader>
                </template>
                <template v-else>
                    <div class="row w-100 mx-0 mt-4 products-row" v-if="Array.isArray(this.$store.state.productsData.data) &&
                        this.$store.state.productsData.data.length > 0
                        ">
                        <div class="col-md-3 mb-3" v-for="product in this.$store.state.productsData.data" :key="product.id">
                            <template v-if="this.$store.state.productsData.currentClicked === 'myProduct'">
                                <MyProductCard :product="product"></MyProductCard>
                            </template>
                            <template v-else-if="this.$store.state.productsData.currentClicked === 'recentProduct'">
                                <MyProductCard :product="product"></MyProductCard>
                            </template>
                            <template v-else>
                                <ProductCard :product="product"></ProductCard>
                            </template>
                        </div>
                    </div>
                    <div v-else>
                        <p class="single-page-header mt-lg-5 mt-0 mb-4 text-start text-center">
                            No products available
                        </p>
                    </div>

                    <div class="row w-100 mx-0 d-flex align-items-center justify-content-center py-5">
                        <div class="col-md-5">
                            <template v-if="this.$store.state.productsData.pageID <
                                this.$store.state.productsData.lastPage
                                ">
                                <!-- store state define to productdata -->
                                <button class="btn btn-see-more-products" @click="loadMoreProducts">
                                    See More Products
                                </button>
                            </template>

                            <div v-if="showEmptyCategoryAlert">
                                <p>Please select a category to fetch products.</p>
                            </div>
                            <!-- <button class="btn btn-see-more-products" v-if="loadMoreProductsBtn" @click="loadMoreProducts">See More Products</button> -->
                        </div>

                        <!-- {{ this.$store.state.productsData.currentClicked }} -->
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import SideFillter from "../components/products/SideFillter.vue";
import ProductCard from "../components/products/ProductCard.vue";
import MyProductCard from "../components/products/MyProductCard.vue";
import Loader from "../components/loader/Loader.vue";
import { mapGetters } from "vuex";
export default {
    name: "HomePage",
    data() {
        return {
            loadMoreProductsBtn: true,
            // currentPage: 1,
        };
    },
    components: {
        SideFillter,
        ProductCard,
        MyProductCard,
        Loader,
    },
    computed: {
        ...mapGetters("productsData"),
    },
    mounted() {
        this.$store.dispatch("productsData/getRecentWithSearch", {
            categoryCode: "",
            currentClicked: this.$store.state.productsData.currentClicked,
        }); //
    },
    methods: {
        loadMoreProducts() {
            //this function using for show next page products. this is common function using in all product and category wise products
            if (this.$store.state.productsData.currentClicked == "allProduct") {
                //show product in all product in product show in pagination
                this.$store.dispatch("productsData/getAllProductsWithSearch", {
                    categoryCode: "",
                    currentClicked: "allProduct",
                });
            } else if (this.$store.state.productsData.currentClicked == "categoryProduct") {
                // this is check in categoryProduct
                this.$store.dispatch("productsData/getAllProductsWithSearch", {
                    categoryCode: this.$store.state.productsData.selectedCategoryCode,
                    currentClicked: "categoryProduct",
                });
            } else if (this.$store.state.productsData.currentClicked == "myProduct") {
                // this is check in my product
                this.$store.dispatch("productsData/getMyProductsWithSearch", {
                    categoryCode: "",
                    currentClicked: "myProduct",
                });
            } else if (this.$store.state.productsData.currentClicked == "recentProduct") {
                // this is check in my product
                this.$store.dispatch("productsData/getRecentWithSearch", {
                    categoryCode: "",
                    currentClicked: "recentProduct",
                });
            }
        },
    },
};
</script>

<style lang="scss">
.home-page {
    .left-panel {
        background: linear-gradient(0deg, #e1edff 0%, rgba(158, 197, 255, 0) 141.12%);
    }

    .products-row {
        padding-right: 5rem;
    }

    .btn-see-more-products {
        height: 50px;
        border-radius: 50px;
        background-color: #ea0a2a;
        color: #fff;
        width: 100%;
    }
}
</style>
