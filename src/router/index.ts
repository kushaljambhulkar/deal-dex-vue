import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ProductListView from '../views/ProductListView.vue'  // Corrected import
import ProductDetailView from '../views/ProductDetailView.vue'
import FavoritesList from '../views/FavoritesList.vue'
import mobile from '@/views/mobile.vue'
import Accessories from '@/views/Accessories.vue'
import TabletList from '@/views/TabletList.vue'


const router = createRouter({ 
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/favorites',
    //   name: 'FavoritesView',
    //   component: FavoritesView
    // },
    {
      path: '/register',
      name: 'RegisterView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RegisterView
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/',
      name: 'ProductsList',
      component: ProductListView  // Corrected usage
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetailView
    },
    {
      path: '/favorites',
      name: 'FavoritesList',
      component: FavoritesList
    },
    {
      path: '/mobile',
      name: 'Mobile',
      component: mobile
    },
    {
      path: '/table',
      name: 'Table',
      component: TabletList
    },
    {
      path: '/accessories',
      name: 'Accessories',
      component: Accessories
    }
  ]
})

export default router
