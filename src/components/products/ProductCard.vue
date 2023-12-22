<template>
    <div class="product-item">
        <div class="image card up-card d-flex justify-content-center align-items-center " style="height: 15em;">
            <img v-if="product.images[0]" :src="product.images" :alt="product.name" class="product-image w-100 h-auto" />
            <img v-else src="../../assets/images/no-image-available.jpg" :alt="product.name"
                class="product-image w-100 h-auto" />
        </div>
        <div class="card down-card"  style="height: 10em;">
            <div class="details py-3 px-2">
                <h5 class="name text-dark">
                    {{ product.name }}
                </h5>
                <h5 class="text-dark">{{ product.uom }}</h5>

            </div>
        </div>
    </div>
</template>

<script>
import {
    computed,
    defineAsyncComponent
} from "vue";
import {
    useStore
} from "vuex";
import {
    useRoute
} from "vue-router";
import {
    checkIsInCartAndCount
} from "../../helpers";

export default {
    name: "ProductCard",
    data() {
        return {};
    },
    setup() {
        const store = useStore();
        const route = useRoute();
    },
    props: {
        product: Object,
    },
    mounted() {
        checkIsInCartAndCount(this.product.id);
        // this.$store.dispatch("cartsData/getCartData");
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
