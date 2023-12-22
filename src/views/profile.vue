<template>
    <div class="contact-us-page py-5">
        <div class="container-fluid">

            <h4 class="single-page-header mt-lg-5 mt-0 mb-4 text-start text-center">
                MY PROFILE
            </h4>
            <div class="row w-100 mx-0 align-items-center justify-content-center">
                <div class="col-md-8">
                    <form action="" class="row">
                        <div class="mb-4 col-md-6">
                            <label for="" class="text-start w-100">
                                <h5>Customer Code</h5>
                            </label>
                            <input type="text" class="form-control"
                                :placeholder="$store.state.userProfileData.data.customer_code ?? ''" readonly>
                        </div>
                        <div class="mb-4 col-md-6">
                            <label for="" class="text-start w-100">
                                <h5>Customer Name</h5>
                            </label>
                            <input type="text" class="form-control"
                                :placeholder="$store.state.userProfileData.data.first_name ? $store.state.userProfileData.data.first_name + '  ' + $store.state.userProfileData.data.last_name : ''"
                                readonly>
                            <!-- <input type="text" class="form-control" :placeholder="$store.state.userProfileData.data.first_name && $store.state.userProfileData.data.last_name ? $store.state.userProfileData.data.first_name + '  ' + $store.state.userProfileData.data.last_name : ''" readonly> -->
                        </div>
                        <div class="mb-4 col-md-12">
                            <label for="" class="text-start w-100">
                                <h5>Address</h5>
                            </label>
                            <!-- <input type="text" class="form-control"  readonly v-model="getFirstAddress.last_name"> -->
                            <input type="text" class="form-control"
                                :placeholder="firstAddress.address_line_1 || firstAddress.address_line_2 ? firstAddress.address_line_1 + ' ' + firstAddress.address_line_2 : ''"
                                readonly>
                        </div>
                        <div class="mb-4 col-md-6">
                            <label for="" class="text-start w-100">
                                <h5>Postal Code</h5>
                            </label>
                            <!-- <input type="text" class="form-control" :placeholder="$store.state.userProfileData.data.postal_code ?? ''" readonly> -->
                            <input type="text" class="form-control" readonly v-model="firstAddress.postal_code">
                        </div>
                        <div class="mb-4 col-md-6">
                            <label for="" class="text-start w-100">
                                <h5>Contact No</h5>
                            </label>
                            <!-- <input type="text" class="form-control" :placeholder="$store.state.userProfileData.data.phone_1??''" readonly> -->
                            <input type="text" class="form-control" readonly v-model="firstAddress.phone">
                        </div>
                        <div class="mb-4 col-md-6">
                            <label for="" class="text-start w-100">
                                <h5>Payment Terms</h5>
                            </label>
                            <input type="text" class="form-control"
                                :placeholder="$store.state.userProfileData.data.payment_terms_code ?? ''" readonly>
                        </div>
                        <div class="mb-4 col-md-6">
                            <label for="" class="text-start w-100">
                                <h5>MINIMUM SALES AMOUNT($)</h5>
                            </label>
                            <input type="text" class="form-control"
                                :placeholder="$store.state.userProfileData.data.min_sales_amt ?? ''" readonly>
                        </div>
                        <div class="mb-4 col-md-6">
                            <label for="" class="text-start w-100">
                                <h5>Outstanding($)</h5>
                            </label>
                            <input type="text" class="form-control"
                                :placeholder="$store.state.userProfileData.data.credit_limit_lcy ?? ''" readonly>
                        </div>
                        <div class="mb-4 col-md-6">
                            <label for="" class="text-start w-100">
                                <h5>Sales Person</h5>
                            </label>
                            <input type="text" class="form-control"
                                :placeholder="$store.state.userProfileData.data.sales_person_code ?? ''" readonly>
                        </div>
                        <div class="mb-4 col-md-12">
                            <label for="" class="text-start w-100">
                                <h5>Change Password</h5>
                            </label>
                            <div class="row w-100 mx-0">
                                <div class="mb-4 col-md-6 p-0 ps-md-0">
                                    <input type="text" class="form-control" placeholder="Old Password">
                                </div>
                                <div class="mb-4 col-md-6 p-0 pe-md-0">
                                    <input type="text" class="form-control" placeholder="New Password">
                                </div>
                                <div class="mb-4 col-md-6 p-0 ps-md-0">
                                    <input type="text" class="form-control" placeholder="Confirm Password">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 text-start">
                            <button class="btn change-password-btn">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import SideFillter from '../components/products/SideFillter.vue';
import ProductCard from '../components/products/ProductCard.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'HomePage',
    components: {
        SideFillter,
        ProductCard
    },
    computed: {
        ...mapGetters('userProfileData', ['getFirstAddress']),
        firstAddress() {
            return this.getFirstAddress || {};
        },
    },
    mounted() {
        this.$store.dispatch('userProfileData/getUserData');

    },
}
</script>
  
<style lang="scss">.contact-us-page {
    .change-password-btn {
        border-radius: 50px;
        background-color: #0033A0;
        border: 1px solid #0033A0;
        color: #FACD01;
        font-family: "Kalam", cursive;
    }
}

@media only screen and (max-width: 1300px) {
    .right-side {
        border-radius: 25px;
    }
}</style>
    