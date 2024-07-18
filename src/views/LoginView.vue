<!-- <template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="register-container card p-4 shadow-sm">
      <h1 class="text-center mb-4">Login</h1>
      <form @submit.prevent="onLogin"></form>
      <form> 
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
        <div v-if="error" class="mt-3 text-danger">{{ error }}</div>
        <div v-if="success" class="mt-3 text-success">{{ success }}</div>
      </form>
    </div>
  </div>
</template> -->
<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="login-container card p-4 shadow-sm">
      <h1 class="text-center mb-4">Login to Dealdex</h1>
      <form @submit.prevent="onLogin">
        <div class="mb-3">
          <label for="usernameOrEmail" class="form-label">Username or Email</label>
          <input
            type="text"
            class="form-control"
            id="usernameOrEmail"
            v-model="usernameOrEmail"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
        <div v-if="error" class="mt-3 text-danger">{{ error }}</div>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginView',
  setup(_, { emit }) {
    const usernameOrEmail = ref('')
    const password = ref('')
    const error = ref<string | null>(null)
    const router = useRouter()

    const onLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/signin', {
          usernameOrEmail: usernameOrEmail.value,
          password: password.value
        })
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('userId', usernameOrEmail.value)

        emit('login')
        router.push('/')
      } catch (err) {
        error.value = 'Failed to login. Please check your credentials.'
      }
    }

    return {
      usernameOrEmail,
      password,
      error,
      onLogin
    }
  }
})
</script>

<style scoped>
.container {
  height: 100vh;
}

.login-container {
  max-width: 400px;
  width: 100%;
}
</style>