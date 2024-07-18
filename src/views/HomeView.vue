<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ProductList from '../components/ProductList.vue';

interface Product {
  product_title: string;
  product_lowest_price: number;
  product_id: string;
  product_image: string;
}

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchDefaultProducts = async () => {
  try {
    console.log('Fetching products...');
    const response = await axios.get('http://localhost:8080/api/products');
    console.log('Products fetched:', response.data);
    products.value = response.data;
  } catch (err) {
    console.error('Failed to fetch products:', err);
    error.value = 'Failed to fetch products';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDefaultProducts);
</script>

<template>
  <main>
    <div class="container mt-5">
      <div v-if="loading" class="d-flex justify-content-center my-4">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>
      <div v-else>
        <ProductList :products="products" />
      </div>
    </div>
  </main>
</template>


<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding-top: 50px;
}
</style>
