<template>
    <div class="login-page">
        <div class="row w-100 mx-0">
            <div class="col-md-6 px-0 top-left">
                <img src="../../assets/images/login-page/image-1.png" alt="login page image">
            </div>
            <div class="col-md-6 px-0 top-right position-relative">
                <div class="bg-mask">
                    <img src="../../assets/images/login-page/bg-mask.png" alt="">
                </div>
                <div class="top-naviagte text-end pe-5 mt-5">
                    <a href="#" class="link fw-bold"><i class="bi bi-house-door me-2"></i> Go Back</a>
                </div>
                <div class="login-form ">
                    <h4 class="heading">Online Ordering System</h4>
                    <h4 class="heading">Login to your Account </h4>
                    <div class="row w-100 mx-0 d-flex align-items-center justify-content-center">
                        <div class="col-md-7">
                            <div class="alert alert-danger" v-if="errors.length">

                                <p v-for="(error, index) in errors" :key="index">
                                    {{ error }}
                                </p>

                            </div>
                            <div v-if="error" class="alert alert-danger">{{ error }}</div>
                            <form class="mt-3" @submit.prevent="loginForm" novalidate>
                                <div class="input-group mb-3 select">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Singapore</option>
                                        <option value="1">Malaysia</option>
                                        <option value="2">Maldives</option>
                                        <option value="3">Australia</option>
                                    </select>
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="username-label"><i
                                            class="bi bi-person-fill"></i></span>
                                    <input type="email" class="form-control bl-no" v-model="email" placeholder="Email"
                                        aria-label="Email" aria-describedby="username-label">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="password-label"><i
                                            class="bi bi-lock-fill"></i></span>
                                    <input type="password" class="form-control bl-no" v-model="password"
                                        placeholder="Password" aria-label="Password" aria-describedby="password-label">
                                </div>
                                <div class="text-start mb-3">
                                    <a href="#" class="text-black">Forgot Password</a>
                                </div>
                                <div v-if="isLoading">
                                  <CustomLoader></CustomLoader>
                                </div>
                                <button  class="btn w-100 sign-in-btn mb-3">sign in</button>
                            </form>
                            <button type="submit" class="btn w-100 sign-up-btn">sign UP</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row w-100 mx-0">
            <div class="col-md-12 px-0 today-offers py-5 mt-5">
                <div class="header-title py-5">
                    <h4 class="heading text-end pe-5 me-5">Today Offers</h4>
                </div>
                <swiper :slides-per-view="3" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange"
                    :breakpoints="{
                        '200': {
                            slidesPerView: 1,
                            spaceBetween: 1,
                        },
                        '640': {
                            slidesPerView: 1,
                            spaceBetween: 1,
                        },
                        '768': {
                            slidesPerView: 4,
                            spaceBetween: 1,
                        },
                        '1024': {
                            slidesPerView: 5,
                            spaceBetween: 1,
                        },
                    }" :navigation="true" :modules="modules">
                    <swiper-slide>
                        <a href="">
                            <div class="offer-item w-100v pt-5">
                                <div class="offer-label">
                                    <div class="row">
                                        <span class="percentage">15%</span>
                                        <span class="text">OFF</span>
                                    </div>
                                </div>
                                <div class="offer-content pt-5 px-4 pb-2">
                                    <div class="image">
                                        <img src="../../assets/images/login-page/offers/product-1.png" alt="">
                                    </div>
                                    <div class="details mt-2">
                                        <h5 class="qty mb-0">20 PKT</h5>
                                        <h5 class="price mb-3"><del>$120</del> - $80</h5>
                                        <p class="name">Dodo Tofu Fish Cake With Cheese - Chilled</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </swiper-slide>
                    <swiper-slide>
                        <a href="">
                            <div class="offer-item w-100v pt-5">
                                <div class="offer-label">
                                    <div class="row">
                                        <span class="percentage">15%</span>
                                        <span class="text">OFF</span>
                                    </div>
                                </div>
                                <div class="offer-content pt-5 px-4 pb-2">
                                    <div class="image">
                                        <img src="../../assets/images/login-page/offers/product-1.png" alt="">
                                    </div>
                                    <div class="details mt-2">
                                        <h5 class="qty mb-0">20 PKT</h5>
                                        <h5 class="price mb-3"><del>$120</del> - $80</h5>
                                        <p class="name">Dodo Tofu Fish Cake With Cheese - Chilled</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </swiper-slide>
                    <swiper-slide>
                        <a href="">
                            <div class="offer-item w-100v pt-5">
                                <div class="offer-label">
                                    <div class="row">
                                        <span class="percentage">15%</span>
                                        <span class="text">OFF</span>
                                    </div>
                                </div>
                                <div class="offer-content pt-5 px-4 pb-2">
                                    <div class="image">
                                        <img src="../../assets/images/login-page/offers/product-1.png" alt="">
                                    </div>
                                    <div class="details mt-2">
                                        <h5 class="qty mb-0">20 PKT</h5>
                                        <h5 class="price mb-3"><del>$120</del> - $80</h5>
                                        <p class="name">Dodo Tofu Fish Cake With Cheese - Chilled</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </swiper-slide>
                    <swiper-slide>
                        <a href="">
                            <div class="offer-item w-100v pt-5">
                                <div class="offer-label">
                                    <div class="row">
                                        <span class="percentage">15%</span>
                                        <span class="text">OFF</span>
                                    </div>
                                </div>
                                <div class="offer-content pt-5 px-4 pb-2">
                                    <div class="image">
                                        <img src="../../assets/images/login-page/offers/product-1.png" alt="">
                                    </div>
                                    <div class="details mt-2">
                                        <h5 class="qty mb-0">20 PKT</h5>
                                        <h5 class="price mb-3"><del>$120</del> - $80</h5>
                                        <p class="name">Dodo Tofu Fish Cake With Cheese - Chilled</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </swiper-slide>
                    <swiper-slide>
                        <a href="">
                            <div class="offer-item w-100v pt-5">
                                <div class="offer-label">
                                    <div class="row">
                                        <span class="percentage">15%</span>
                                        <span class="text">OFF</span>
                                    </div>
                                </div>
                                <div class="offer-content pt-5 px-4 pb-2">
                                    <div class="image">
                                        <img src="../../assets/images/login-page/offers/product-1.png" alt="">
                                    </div>
                                    <div class="details mt-2">
                                        <h5 class="qty mb-0">20 PKT</h5>
                                        <h5 class="price mb-3"><del>$120</del> - $80</h5>
                                        <p class="name">Dodo Tofu Fish Cake With Cheese - Chilled</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </swiper-slide>
                    <swiper-slide>
                        <a href="">
                            <div class="offer-item w-100v pt-5">
                                <div class="offer-label">
                                    <div class="row">
                                        <span class="percentage">15%</span>
                                        <span class="text">OFF</span>
                                    </div>
                                </div>
                                <div class="offer-content pt-5 px-4 pb-2">
                                    <div class="image">
                                        <img src="../../assets/images/login-page/offers/product-1.png" alt="">
                                    </div>
                                    <div class="details mt-2">
                                        <h5 class="qty mb-0">20 PKT</h5>
                                        <h5 class="price mb-3"><del>$120</del> - $80</h5>
                                        <p class="name">Dodo Tofu Fish Cake With Cheese - Chilled</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </swiper-slide>
                    <swiper-slide>
                        <a href="">
                            <div class="offer-item w-100v pt-5">
                                <div class="offer-label">
                                    <div class="row">
                                        <span class="percentage">15%</span>
                                        <span class="text">OFF</span>
                                    </div>
                                </div>
                                <div class="offer-content pt-5 px-4 pb-2">
                                    <div class="image">
                                        <img src="../../assets/images/login-page/offers/product-1.png" alt="">
                                    </div>
                                    <div class="details mt-2">
                                        <h5 class="qty mb-0">20 PKT</h5>
                                        <h5 class="price mb-3"><del>$120</del> - $80</h5>
                                        <p class="name">Dodo Tofu Fish Cake With Cheese - Chilled</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="row w-100 mx-0">
            <div class="footer">
                <div class="row w-100 mx-0 px-4">
                    <div class="col-md-6 pb-3 text-start">
                        <p class="text-white mb-0">Copyright © 2023 Development By GUI Solutions - All Rights Reserved</p>
                    </div>
                    <div class="col-md-6 pb-3 text-end">
                        <a href="" class="text-white">Privacy Policy</a> | <a href="" class="text-white">Terms and
                            Conditions</a> | <a href="" class="text-white">Version 1.9</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, computed } from 'vue';
import { useStore,mapState  } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import CustomLoader from "../../components/loader/CustomLoader.vue";
// import required modules
import { Navigation } from 'swiper/modules';
export default {
    components: {
        Swiper,
        SwiperSlide,
        CustomLoader
    },
    computed: {
    ...mapState(['isLoading']),
    // other computed properties
  },
    setup() {
        const store = useStore();
        const email = ref('');
        const password = ref('');
        const errors = ref([]);

        const error = computed(() => store.state.error);

        const loginForm = async () => {
            errors.value = [];

            if (!email.value || !password.value) {
                errors.value.push('Email and password are required');
                return;
            }

            try {
                // Dispatch the login action and pass email and password
                await store.dispatch('login', { email: email.value, password: password.value });

            } catch (error) {
                errors.value.push('Invalid email or password');
                console.error('Login error', error);
            }
        };

        return {
            email,
            password,
            errors,
            loginForm,
            error,
        };
    },
};
</script>

<style lang="scss">
.login-page {
    .top-left {
        img {
            width: 109.5% !important;
        }
    }

    .top-right {
        .bg-mask {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            overflow: hidden;

            img {
                width: 113%;
                height: 100%;
            }
        }

        .top-naviagte {
            z-index: 9999;
            position: relative;

            .link {
                font-family: 'Inria Sans', sans-serif;

                .bi {
                    color: #EA0A2A;
                    font-weight: 700;
                }

                font-size: 22px;
                color: #0033A0;
            }
        }

        .login-form {
            z-index: 9999;
            position: relative;
            margin-top: 18%;

            .heading {
                font-family: 'Kalam', cursive;
                font-size: 32px;
                font-weight: bold;
                color: #000000;
            }

            .input-group-text {
                color: #0033A0;
                height: 50px;
                background-color: #fff;
                font-size: 22px;
                border-color: #D2D2D2;
            }

            .input-group.select {
                &:after {
                    content: "";
                    position: absolute;
                    width: 1px;
                    height: 100%;
                    background-color: #D2D2D2;
                    top: 0;
                    right: 46px;
                }
            }

            input,
            select {
                height: 50px;
                background-color: #fff;
                border-color: #D2D2D2;
                border-radius: 10px;
                color: #747474;
                position: relative;

                &.form-select {}

                &.bl-no {
                    border-left: 0px;
                }

                &:focus {
                    box-shadow: none;
                    border-color: #D2D2D2;
                }

                &::-webkit-input-placeholder {
                    color: #D1D1D1;
                }

                &::-moz-placeholder {
                    color: #D1D1D1;
                }

                &:-ms-input-placeholder {
                    color: #D1D1D1;
                }

                &:-moz-placeholder {
                    color: #D1D1D1;
                }
            }

            .sign-in-btn {
                height: 56px;
                font-size: 22px;
                font-family: 'Kalam', cursive;
                text-transform: uppercase;
                background-color: #EA0A2A;
                color: #fff;

                &:hover {
                    background-color: #cf112e;
                }
            }

            .sign-up-btn {
                height: 56px;
                font-size: 22px;
                font-family: 'Kalam', cursive;
                text-transform: uppercase;
                background-color: #0033A0;
                color: #fff;

                &:hover {
                    background-color: #022674;
                }
            }
        }
    }

    .today-offers {
        position: relative;

        .header-title {
            background: rgb(222, 235, 255);
            background: linear-gradient(0deg, rgb(222, 235, 255) 20%, rgb(235, 243, 255) 65%, rgba(255, 255, 255, 0) 92%);
            height: 165px;
            position: absolute;
            width: 100%;
            top: -24px;
        }


        .heading {
            font-family: 'Kalam', cursive;
            font-size: 32px;
            font-weight: bold;
            color: #000000;
            margin-top: 28px;
            margin-right: 80px !important;
        }

        .swiper-button-prev {
            position: absolute;
            right: 60px;
            top: 20px;
            z-index: 999999999;
            left: auto;

            &:after {
                font-size: 23px;
                color: #EA0A2A;
                font-weight: bold;

                &:hover {
                    color: blue;
                }
            }
        }

        .swiper-button-next {
            position: absolute;
            right: 35px;
            top: 20px;
            z-index: 999999999;

            &:after {
                font-size: 23px;
                color: #EA0A2A;
                font-weight: bold;
            }
        }

        .offer-item {
            margin-top: 40px;

            .offer-content {
                background-color: #0033A0;
                transition: all 0.5s ease;
                height: 100%;

                &:hover {
                    background-color: #FACD01;
                    padding-top: 60px !important;
                    margin-top: -10px;
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px;
                }
            }

            min-height: 300px;
            font-family: 'Kalam',
            cursive;
            color: #fff;
            position: relative;

            .image {
                img {
                    max-width: 80%;
                }
            }

            .qty {
                font-size: 24px;
            }

            .price {
                font-size: 30px;
                letter-spacing: 1px;
            }

            .name {
                font-size: 22px;
                white-space: inherit;
            }

            .offer-label {
                width: 72px;
                height: 72px;
                position: absolute;
                top: 30px;
                right: 10px;
                background-color: #EA0A2A;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-weight: 900;
                font-size: 30px;
                z-index: 9999;

                .row {
                    margin-top: -19px;

                    span {
                        height: 26px;
                        width: 100%;
                        text-align: center;
                        font-family: 'Inria Sans', sans-serif;
                    }
                }

            }


        }
    }

    .footer {
        background-image: url('../../assets/images/login-page/footer-bg.png');
        background-size: cover;
        min-height: 120px;

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
}
</style>
  