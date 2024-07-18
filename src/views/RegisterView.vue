<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="register-container card p-4 shadow-sm">
      <h1 class="text-center mb-4">Register</h1>
      <form @submit.prevent="onRegister">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" required />
        </div>
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" id="username" v-model="username" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
          />
          <div v-if="passwordError" class="text-danger mt-2">{{ passwordError }}</div>
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Register</button>
        <div v-if="error" class="mt-3 text-danger">{{ error }}</div>
        <div v-if="success" class="mt-3 text-success">{{ success }}</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Register',
  setup() {
    const name = ref('')
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const error = ref<string | null>(null)
    const success = ref<string | null>(null)
    const passwordError = ref<string | null>(null)
    const router = useRouter()

    const validatePassword = (password: string) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      return regex.test(password)
    }

    const onRegister = async () => {
      passwordError.value = null
      error.value = null
      success.value = null
      
      if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match.'
        return
      }
      
      if (!validatePassword(password.value)) {
        passwordError.value = 'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
        return
      }

      try {
        await axios.post('http://localhost:8080/api/auth/signup', {
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value
        })
        success.value = 'Registration successful! Redirecting to login...'
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } catch (err) {
        error.value = 'Failed to register. Please check your details and try again.'
      }
    }

    return {
      name,
      username,
      email,
      password,
      confirmPassword,
      error,
      success,
      passwordError,
      onRegister
    }
  }
})
</script>

<style scoped>
.container {
  height: 100vh;
}

.register-container {
  max-width: 400px;
  width: 100%;
}
</style>
