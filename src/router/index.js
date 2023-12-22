import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../views/home-page.vue'
import Checkout from '../views/checkout.vue'
import MyOrders from '../views/my-orders.vue'
import OutstandingInvoices from '../views/outstanding-invoices.vue'
import ContactUs from '../views/contact-us.vue'
import MyProfile from '../views/profile.vue'
import Login from '../views/auth/login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        component: Home,
        name: 'home-page',
        meta: {
          title: 'Home',
        }
      },
      {
        path: '/checkout',
        component: Checkout,
        name: 'checkout',
        meta: {
          title: 'Checkout',
        }
      },
      {
        path: '/my-orders',
        component: MyOrders,
        name: 'my-orders',
        meta: {
          title: 'My Orders',
        }
      },
      {
        path: '/outstanding-invoices',
        component: OutstandingInvoices,
        name: 'outstanding-invoices',
        meta: {
          title: 'Outstanding Invoices',
        }
      },
      {
        path: '/contact-us',
        component: ContactUs,
        name: 'contact-us',
        meta: {
          title: 'Contact Us',
        }
      },
      {
        path: '/my-profile',
        component: MyProfile,
        name: 'my-profile',
        meta: {
          title: 'My Profile',
        }
      },
    ]
  },
  {
    path: '/login',
    // name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('token');

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
