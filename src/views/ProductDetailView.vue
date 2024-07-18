<template>
  <div class="container mt-10">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else>
      <div class="card mb-10">
        <div class="card-body">
          <h5 class="card-title">{{ product.product_name }}</h5>
          <p class="card-text">Model: {{ product.product_model }}</p>
          <p class="card-text">Brand: {{ product.product_brand }}</p>
          <p class="card-text">Ratings: {{ product.product_ratings }}</p>
          <p class="card-text">Category: {{ product.product_category }}</p>
          <p class="card-text">Sub Category: {{ product.product_sub_category }}</p>
          <p class="card-text">
            Availability: {{ product.is_available ? 'In Stock' : 'Out of Stock' }}
          </p>

          <h6>Available Colors:</h6>
          <ul class="list-inline">
            <li
              v-for="color in product.available_colors"
              :key="color"
              class="list-inline-item badge bg-primary m-1"
            >
              {{ color }}
            </li>
          </ul>

          <h6>Product Images:</h6>
          <div id="productImagesCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div
                v-for="(image, index) in product.product_images"
                :key="image"
                class="carousel-item"
                :class="{ active: index === 0 }"
              >
                <img :src="image" class="d-block w-100" alt="Product Image" />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#productImagesCarousel"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#productImagesCarousel"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

          <h6>Available at:</h6>
          <div class="row">
            <div class="col-md-25 col-lg-25 mb-4" v-for="(storesList, index) in stores" :key="index">
              <div v-for="(store, storeKey) in storesList" :key="storeKey" class="card h-100">
                <img
                  :src="store.product_store_logo"
                  class="card-img-top store-logo"
                  alt="Store Logo"
                />
                <div class="card-body">
                  <h5 class="card-title">{{ store.product_store }}</h5>
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row">Price</th>
                        <td>{{ store.product_price }}</td>
                      </tr>
                      <tr v-if="store.product_offer">
                        <th scope="row">Offer</th>
                        <td>{{ store.product_offer }}</td>
                      </tr>
                      <tr>
                        <th scope="row">Color</th>
                        <td>{{ store.product_color }}</td>
                      </tr>
                      <tr>
                        <th scope="row">Delivery</th>
                        <td>{{ store.product_delivery }} Days</td>
                      </tr>
                      <tr>
                        <th scope="row">Return Time</th>
                        <td>{{ store.return_time }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-footer text-center">
                  <a :href="store.product_store_url" target="_blank" class="btn btn-primary">Buy Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

interface ProductDetail {
  product_name: string;
  product_model: string;
  product_brand: string;
  product_id: string;
  product_ratings: string;
  product_category: string;
  product_sub_category: string;
  is_available: boolean;
  available_colors: string[];
  product_images: string[];
  stores: Store[];
}

interface Store {
  product_store: string;
  product_store_logo: string;
  product_store_url: string;
  product_price: string;
  product_offer: string;
  product_color: string;
  product_delivery: string;
  product_delivery_cost: string;
  is_emi: string;
  is_cod: string;
  return_time: string;
}

export default defineComponent({
  name: 'ProductDetailView',
  setup() {
    const route = useRoute();
    const product = ref<ProductDetail | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const stores = ref<Store[]>([]);
    const storesData = ref([]);

    const fetchProductDetail = async (id: string) => {
      loading.value = true;
      error.value = null;
      try {
        const response = await axios.get(
          `https://price-api.datayuge.com/api/v1/compare/detail?api_key=AuFnY4Eqaw1KQALiiK3C08ZNun74sZ7hZAx&id=${id}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        product.value = response.data.data;
        stores.value = Object.values(response.data.data.stores).flat();
        storesData.value = response.data.data.stores;
        console.log('Store:', stores);
      } catch (err) {
        error.value = 'Failed to fetch product details';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      const productId = route.params.id as string;
      if (productId) {
        fetchProductDetail(productId);
      }
    });

    return {
      product,
      loading,
      error,
      stores
    };
  }
});
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding-top: 50px;
}
.card {
  margin-bottom: 30px;
}
.card-body {
  
  flex-direction: column;
}
.carousel-item img {
  max-height: 400px;
  object-fit: contain;
}
.store-logo {
  height: 100px;
  object-fit: contain;
}
.table {
  margin-bottom: 0;
}
</style>
