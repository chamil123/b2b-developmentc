<template>
    <div class="row w-100 mx-0">
        <div class="footer py-4">
            <div class="row w-100 mx-0">
                <div class="col-lg-6 ps-md-0 text-lg-start text-center">
                    <p class="text-white mb-0">Copyright © 2023 Development By GUI Solutions - All Rights Reserved</p>
                </div>
                <div class="col-lg-6 ps-md-0 text-lg-end text-center mt-4 mt-lg-0">
                    <a href="" class="text-white">Privacy Policy</a> | <a href="" class="text-white">Terms and
                        Conditions</a> | <a href="" class="text-white">Version 1.9</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cart from '../../components/cart/cart';
export default {
    name: 'HelloWorld',
    components: {
        Cart,
    }
}
</script>

<style lang="scss" scoped>
.footer {
    background-color: #000;
    background-size: cover;
    padding-left: 5rem;
    padding-right: 5rem;
    .row {
        height: 100%;
        display: flex;
        align-items: end;
        justify-content: center;

        .text-white {
            opacity: 0.7;
        }
    }
}

@media only screen and (max-width: 1000px) {
    .footer {
    padding-left: 0rem;
    padding-right: 0rem;
    }
}
</style>