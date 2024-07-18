<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
          <i class="fa-solid fa-cart-shopping"></i> Deal Dex
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>
            <category-dropdown />
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/favorites" class="nav-link">Your Favorites</router-link>
            </li>
            <li class="nav-item">
              <button v-if="isLoggedIn" @click="logout" class="nav-link btn btn-link">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="flex-grow-1 justify-content-center align-items-center" style="width: 100%">
      <router-view @login="handleLogin"></router-view>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CategoryDropdown from './views/CategoryDropdown.vue'

export default defineComponent({
  name: 'App',
  components: {
    CategoryDropdown
  },
  setup() {
    const isLoggedIn = ref(false)
    const router = useRouter()

    const checkLoginState = () => {
      const user = localStorage.getItem('accessToken')
      isLoggedIn.value = !!user
    }

    const logout = () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userId')
      isLoggedIn.value = false
      router.push('/login')
    }

    const handleLogin = () => {
      isLoggedIn.value = true
    }

    onMounted(() => {
      checkLoginState()
    })

    return {
      isLoggedIn,
      logout,
      handleLogin
    }
  }
})
</script>

<style>

body {
  padding-top: 0px; /* Adjust this value if needed to prevent content from being hidden under the navbar */
}
</style>
