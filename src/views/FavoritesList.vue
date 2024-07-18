<template>
  <div class="container">
    
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="!loading && !error" class="favorites-list">
      <li v-for="favorite in favorites" :key="favorite.id">
        <img :src="favorite.productImage" class="card-img-top" alt="Product Image" />
        <span class="favorite-title">Product : {{ favorite.productTitle }}</span>
        <span class="favorite-price">Lowest Price: {{ favorite.productPrice }}</span>
        <span class="favorite-id">Product ID: {{ favorite.productId }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const loading = ref(false);
    const error = ref(null);
    const favorites = ref([]);
    const user = ref('1'); // Replace with the actual user ID you want to use

    const fetchFavorites = async () => {
      loading.value = true;
      error.value = null;
      try {
        const user = localStorage.getItem('userId')
        console.log('User ID:', user);
        const response = await axios.get(
          `http://localhost:8080/api/favorites/${user}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        console.log('API response:', response.data);
        favorites.value = response.data;
      } catch (err) {
        console.error('Error fetching favorites:', err);
        error.value = 'Failed to fetch favorites';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchFavorites();
    });

    return {
      loading,
      error,
      favorites,
      user,
      fetchFavorites
    };
  }
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
  color: #333;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.loading {
  color: #888;
}

.error {
  color: red;
}

.favorites-list {
  list-style-type: none;
  padding: 0;
}

.favorites-list li {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  width: 50%;
  height: auto;
  display: block;
  margin-bottom: 10px;
}

.favorite-title {
  font-weight: bold;
}

.favorite-price, .favorite-id {
  display: block;
  color: #666;
}
</style>
