<template>
    <div class="container mt-5">
      <div class="text-center mb-4">
        <h1>Products List</h1>
        <form @submit.prevent="onSearch" class="d-flex justify-content-center mt-4">
          <div class="input-group" style="max-width: 600px;">
            <input
              type="text"
              class="form-control"
              placeholder="Search for a product"
              v-model="query"
              required
            />
            <button class="btn btn-primary" type="submit">Search</button>
          </div>
        </form>
      </div>
      <div v-if="loading" class="d-flex justify-content-center my-4">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>
      <div v-else>
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="product in products" :key="product.product_id">
            <div class="card h-100">
              <img :src="product.product_image" class="card-img-top" alt="Product Image" />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ product.product_title }}</h5>
                <p class="card-text">Lowest Price: ₹{{ product.product_lowest_price }}</p>
                <router-link :to="`/product/${product.product_id}`" class="btn btn-primary mt-auto">
                  View Details
                </router-link>
                <button class="btn btn-secondary mt-2" @click="addToFavorites(product)">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 class="mt-5">Favorites</h2>
        <ul class="list-group">
          <li class="list-group-item" v-for="fav in favorites" :key="fav.product_id">
            {{ fav.product_title }} - ₹{{ fav.product_lowest_price }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useStore } from 'vuex';
  
  export default {
    name: 'ProductsList',
    setup() {
      const store = useStore();
      const products = ref([]);
      const loading = ref(false);
      const error = ref(null);
      const query = ref('');
      const favorites = ref([]);
  
      const user_id = store.state.user ? store.state.user.id : null;
      const api_token = store.getters.getToken;
  
      const fetchProducts = async () => {
        loading.value = true;
        error.value = null;
        try {
          const response = await axios.get(
            `https://price-api.datayuge.com/api/v1/compare/search?api_key=AuFnY4Eqaw1KQALiiK3C08ZNun74sZ7hZAx&product=${query.value}`,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          products.value = response.data.data;
        } catch (err) {
          console.error('Error fetching products:', err);
          error.value = 'Failed to fetch products';
        } finally {
          loading.value = false;
        }
      };
  
      const onSearch = () => {
        fetchProducts();
      };
  
      const addToFavorites = async (product) => {
        if (!favorites.value.some((fav) => fav.product_id === product.product_id)) {
          favorites.value.push(product);
          try {
            console.log('Adding product to favorites');
            await axios.post(
              'https://localhost:8080/api/favorites',
              {
                product_id: product.product_id,
                user_id: user_id,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${api_token}`,
                },
              }
            );
            console.log('Product added to favorites');
          } catch (err) {
            console.error('Failed to add product to favorites', err);
            if (err.response) {
              console.error('Response data:', err.response.data);
              console.error('Response status:', err.response.status);
              console.error('Response headers:', err.response.headers);
            } else if (err.request) {
              console.error('Request data:', err.request);
            } else {
              console.error('Error message:', err.message);
            }
          }
        }
      };
  
      return {
        products,
        loading,
        error,
        query,
        onSearch,
        favorites,
        addToFavorites,
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: auto;
    padding-top: 50px;
  }
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  .card {
    display: flex;
    flex-direction: column;
    transition: transform 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  .card:hover {
    transform: scale(1.05);
  }
  .card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .col-lg-4,
  .col-md-6 {
    display: flex;
    align-items: stretch;
  }
  .text-center {
    text-align: center;
    color: #fff;
  }
  body {
    background-color: #333;
  }
  </style>
  