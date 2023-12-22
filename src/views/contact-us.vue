<template>
    <div class="contact-us-page py-5">
        <div class="container-fluid">
            <h4 class="single-page-header mt-lg-5 mt-0 mb-4 text-start text-center">
                CONTACT INFORMATION
            </h4>

            <div class="row w-100 mx-0 align-items-center justify-content-center">
                <div class="col-md-8">
                    <div class="row w-100 mx-0">
                        <div class="col-md-5 d-none d-md-block px-0 left-side">
                            <img src="../assets/images/contact-us/image-1.png" alt="">
                        </div>
                        <div class="col-md-7 px-4 py-4 text-left right-side">
                            <h5 class="text-start fw-bold mb-3">Company Information</h5>
                            <p class="text-start mb-4">
                                <span class="icon"><i class="bi bi-geo-alt-fill"></i></span>
                                <!-- v-if="$store.state.contactsData.data.address_section.parameters" -->
                                <span class="ps-4" >
                                    {{ $store.state.contactsData.addressData }}
                                </span>
                                <!-- <br>
                                <span class="ps-5">22 Senoko Way, Singapore 758044</span>
                                <br>
                                <span class="ps-5">www.enjoydodo.com</span> -->
                            </p>
                            <h5 class="text-start fw-bold mb-3">Telephone</h5>
                            <p class="text-start">
                                <span class="icon"><i class="bi bi-telephone-fill"></i></span>
                                <span class="ps-4">{{ $store.state.contactsData.phoneData1 }}</span>
                                <span class="my-1"></span>
                            </p>
                            <p class="text-start mb-4">
                                <span class="icon"><i class="bi bi-house-door-fill"></i></span>
                                <span class="ps-4">{{ $store.state.contactsData.phoneData2 }}</span>
                            </p>
                            <h5 class="text-start fw-bold mb-3">Email</h5>
                            <p class="text-start">
                                <span class="icon"><i class="bi bi-envelope-fill"></i></span>
                                <span class="ps-4">{{ $store.state.contactsData.emailData1 }}</span>
                                <span class="my-1"></span>
                            </p>
                            <!-- <p class="text-start mb-4">
                                <span class="icon"><i class="bi bi-envelope-fill"></i></span>
                                <span class="ps-4">{{ $store.state.contactsData.emailData2 }}</span>
                            </p> -->

                            <h5 class="text-start fw-bold mb-3">Sales in Charge</h5>
                            <p class="text-start">
                                Office Sales
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import SideFillter from '../components/products/SideFillter.vue';
import ProductCard from '../components/products/ProductCard.vue';
export default {
    name: 'HomePage',
    components: {
        SideFillter,
        ProductCard
    },
    mounted() {
        this.$store.dispatch('contactsData/getContactData');

  },
}
</script>
  
<style lang="scss">
.contact-us-page {
    .icon {
        border-radius: 50px;
        border: 1px solid #0033A0;
        font-size: 14px;
        color: #0033A0;
        padding: 0 !important;
        width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .table {
        td {
            color: #878787;
            padding-top: 20px;
            padding-bottom: 20px;



        }

    }

    .left-side {
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        overflow: hidden;
        height: 600px;

        img {
            height: 600px;
            width: 457px;
        }
    }

    .right-side {
        background: rgb(225, 237, 255);
        background: linear-gradient(175deg, rgba(225, 237, 255, 0) 0%, rgba(225, 237, 255, 1) 100%);
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        height: 600px;
    }
}

@media only screen and (max-width: 992) {
    .right-side {
        border-radius: 25px;
    }
}

@media only screen and (min-width: 1600px) {
    .right-side {
        border-radius: 25px;
    }
    .left-side {
        img {
            height: auto !important;
            width: 100% !important;
        }
    }
}
</style>
    