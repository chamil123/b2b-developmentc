<template>
    <div class="mobile-menu">
        <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop"
            aria-labelledby="staticBackdropLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="staticBackdropLabel"><router-link :to="{ name: 'my-profile' }" class="me-5 text-white"><i class="bi bi-person-circle me-2"></i>Hello Mark</router-link></h5>
                            
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="text-start">
                    <div class="dropdown w-100 me-4">
                        <button class="btn btn-sm w-100 text-start btn-outline-light btn-sm dropdown-toggle lang-btn" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            English
                        </button>
                        <ul class="dropdown-menu w-100">
                            <li><a class="dropdown-item" href="#">Swidish</a></li>
                            <li><a class="dropdown-item" href="#">Franch</a></li>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="">
                        <router-link :to="{ name: 'home-page' }" class="me-2 px-2 main-link d-block w-100 text-start py-3"
                            :class="(this.$route.name == 'home-page') ? 'active' : ''">Home</router-link>
                        <router-link :to="{ name: 'my-orders' }" class="me-2 px-2 main-link d-block w-100 text-start py-3"
                            :class="(this.$route.name == 'my-orders') ? 'active' : ''">My Orders</router-link>
                        <router-link :to="{ name: 'outstanding-invoices' }" class="me-2 px-2 main-link d-block w-100 text-start py-3"
                            :class="(this.$route.name == 'outstanding-invoices') ? 'active' : ''">Outstanding
                            Invoices</router-link>
                        <router-link :to="{ name: 'contact-us' }" class="me-2 px-2 main-link d-block w-100 text-start py-3"
                            :class="(this.$route.name == 'contact-us') ? 'active' : ''">Contact Us</router-link>
                        <a href="#" class="me-2 px-2 main-link d-block w-100 text-start py-3"><i class="bi bi-box-arrow-right"></i> Logout</a>
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

<style lang="scss">
.mobile-menu{
    .offcanvas{
        max-width: 300px;
        background: #0033A0;
        color: #fff;
    }

    .main-link{
        text-decoration: none;
        color: #ffffffcf;
    }
}</style>