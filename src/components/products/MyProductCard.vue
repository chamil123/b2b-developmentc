<template>
    <div class="product-item">
        <div class="image card up-card d-flex justify-content-center align-items-center" style="height: 15em;">
            <img v-if="product.images[0]" :src="product.images" :alt="product.name" class="product-image w-100" />
            <img v-else src="../../assets/images/no-image-available.jpg" :alt="product.name" class="product-image w-100" />
        </div>
        <div class="card down-card" style="height: 17em;">
            <div class="details py-3 px-2">

                <h5 class="text-dark">{{ product.item_code }}</h5>
                <h5 class="name text-dark">{{ product.name }}</h5>
                <h5 class="price">$ {{ priceOfItem }}</h5>
                <h5 class="text-dark">{{ product.uom }}</h5>


                <div v-if="product.is_temporary_unavailable == 0">
                    <!-- if there are have not available flag not showing add qty and add to cart -->
                    <div v-if="addedToCart == 0" class="qty">
                        <h5 class="qty-label">{{ product.unit }}</h5>
                        <div class="qty-function d-flex align-items-center justify-content-center">
                            <button class="qtybtn min" @click="minusQyt()">-</button>
                            <!-- <input type="text" readonly class="qty-input form-control" ref="qty" :value="productQty" /> -->
                            <input type="text" readonly class="qty-input form-control" v-model="quantity" />
                            <button class="qtybtn max" @click="plusQty()">+</button>
                        </div>
                    </div>
                    <button v-if="addedToCart == 0" class="btn add-to-cart-btn mt-3" @click="addToCart(product.id)"><i
                            class="bi bi-cart"></i> Add
                        To Cart</button>
                    <button v-else class="btn add-to-cart-btn mt-3 text-bg-success" disabled><i class="bi bi-cart"></i>
                        Added
                        To Cart</button>
                </div>
                <div v-else>
                    <button class="btn add-to-cart-btn mt-3 text-bg-danger" disabled><i class="bi bi-cart"></i> Not
                        Available</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { checkIsInCartAndCount } from "../../helpers";
import 'vue3-toastify/dist/index'
import { toast } from "vue3-toastify/dist/index";

export default {
    name: "ProductCard",
    data() {
        return {
            priceOfItem: 0.00,
            filteredSalesPrice: null,
            quantity: 0,
            isAddToCart: true,
            addedToCart: 0,
        };
    },
    setup() {
        const store = useStore();
        const route = useRoute();

    },
    props: {
        product: Object,
    },
    mounted() {
        this.addedToCart = this.product.added_cart;
        checkIsInCartAndCount(this.product.id);
        this.filterSalesPrice(true);
    },
    computed: {
        productQty: function () {
            const exist = this.$store.state.cartsData.data.findIndex(
                (existingItem) => existingItem.product.id === this.product.id
            );
            return exist !== -1 ? this.$store.state.cartsData.data[exist].quantity : 1;
        },
    },
    components: {},
    methods: {
        addToCart(productId) {
            if (this.quantity <= 0) {
                toast.error('Quantity should be greater than zero', {
                    autoClose: false,
                });
            } else {
                const qty = this.quantity; // Use this.quantity instead of this.$refs.qty.value
                this.$store.dispatch("cartsData/addCart", {
                    product_id: productId,
                    quantity: qty,
                });


                this.quantity = 0;
                this.addedToCart = 1;
                toast.success('Successfully added to cart.', {
                    autoClose: 1500,
                });
            }
        },

        plusQty() {
            this.quantity++; // Update quantity directly
            this.filterSalesPrice(false);
        },

        minusQyt() {
            if (this.quantity > 1) {
                this.quantity--; // Update quantity directly
                this.filterSalesPrice(false);
            }
        },

        filterSalesPrice(isLoading) {

            const today = new Date(this.$store.state.productsData.deliveryDate);
            var data = [];

            if (isLoading) {
                data = this.product.sales_price.filter(
                    (item) => (new Date(item.starting_Date) <= today && new Date(item.ending_Date) >= today)
                );
            } else {
                data = this.product.sales_price.filter(
                    (item) => (new Date(item.starting_Date) <= today && new Date(item.ending_Date) >= today) && item.minimum_quantity >= this.quantity
                );
            }
            if (data[0]) {
                this.priceOfItem = data[0].unit_price.toFixed(2);
            }
        },
    },
};
</script>

<style lang="scss">
.product-item {
    cursor: pointer;

    .image {
        img {
            max-width: 100%;
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
        }
    }

    .up-card {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .down-card {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    .details {
        .name {
            font-size: 16px;
            font-weight: 500;
            min-height: 40px;
        }

        .price {
            color: #ea0a2a;
            font-size: 20px;
            font-weight: 600;
        }

        .qty {
            .qty-label {
                font-size: 14px;
            }

            .qtybtn {
                width: 55px;
                border: none;
                background: #0033a0;
                height: 32px;
                color: #facd01;
                font-size: 22px;
                display: flex;
                align-items: center;
                justify-content: center;

                &.min {
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }

                &.max {
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
            }

            .qty-input {
                width: 66px;
                border-radius: 0;
                text-align: center;
            }
        }
    }

    .add-to-cart-btn {
        border-radius: 50px;
        background-color: transparent;
        border: 1px solid #000;
        width: 90%;

        &:hover {
            background-color: #ea0a2a;
            color: #fff;
        }
    }
}

.product-item:hover {
    .image {
        img {
            box-shadow: 0px 1px 13px 0px rgba(0, 0, 0, 0.25);
        }
    }

    .price {
        color: rgba(0, 51, 160, 1);
    }
}
</style>
