<template>
  <div class="home">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/headers/header'
import Footer from '../components/footers/footer'

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
@import '../assets/css/main.css';
a{
  text-decoration: none;
}
@media only screen and (max-width: 1300px) {
  .container,.container-fluid{
    --bs-gutter-x: 4rem !important;
  }
  .home-page .products-row{
    padding-right: 2rem !important;
  }
}

@media only screen and (max-width: 880px) {
  .header .main-header .main-link{
    font-size: 15px;
  }
}

@media only screen and (max-width: 1000px) {
  .home-page .products-row{
    padding-right: 0rem !important;
    padding-left: 0rem !important;
  }
}
</style>
