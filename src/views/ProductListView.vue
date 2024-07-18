<template>
  <div class="container mt-5">
    <!------start of carousel code-->
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://cdn1.smartprix.com/rx-i1HgocQjY-w600-h300/1HgocQjY.webp" class="d-block w-100" alt="Slide 1">
        </div>
        <div class="carousel-item">
          <img src="https://cdn1.smartprix.com/rx-it7TN2EBv-w600-h300/t7TN2EBv.webp" class="d-block w-100" alt="Slide 2">
        </div>
        <div class="carousel-item">
          <img src="https://cdn1.smartprix.com/rx-i5ePVcQzY-w600-h300/5ePVcQzY.webp" class="d-block w-100" alt="Slide 3">
        </div>
        <div class="carousel-item">
          <img src="https://cdn1.smartprix.com/rx-i3HhZrnTj-w600-h300/3HhZrnTj.webp" class="d-block w-100" alt="Slide 4">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!------End of carousel code-->

    <div class="text-center ">
      <h1 style="color: black; margin-top: 16px;">Search Products</h1>
      <form @submit.prevent="onSearch" class="d-flex justify-content-center mt-4">
        <div class="input-group">
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
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
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
                    <button class="btn btn-secondary mt-2" @click=addToFavorites(product)>
                      Add to Favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <h2 class="" style="color: black;">Favorites</h2>
            <ul class="list-group">
              <li class="list-group-item" v-for="fav in favorites" :key="fav.product_id">
                {{ fav.product_title }} - ₹{{ fav.product_lowest_price }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

interface Product {
  product_title: string;
  can_compare: boolean;
  product_lowest_price: number;
  product_link: string;
  product_id: string;
  product_category: string;
  product_sub_category: string;
  product_image: string;
}

export default defineComponent({
  name: 'ProductsList',
  setup() {
    const products = ref<Product[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const query = ref('');
    const favorites = ref<Product[]>([]);

    const fetchProducts = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products/${query.value}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        products.value = response.data.data;
      } catch (err) {
        error.value = 'Failed to fetch products';
      } finally {
        loading.value = false;
      }
    };

    const onSearch = () => {
      fetchProducts();
    };

    const addToFavorites = (product: Product) => {
      // if (!favorites.value.some((fav) => fav.product_id === product.product_id)) {
      //   favorites.value.push(product);

      //   const data = {
      //     userId: 'abhishek21', // Replace with actual userId
      //     productId: product.product_id
      //   };
        const productObj = {
          productId: product.product_id,
          productImage: product.product_image,
          productTitle: product.product_title,
          productPrice: product.product_lowest_price

        }
        console.log('data', productObj);
        const user = localStorage.getItem('userId')
        axios.post(`http://localhost:8080/api/favorites/${user}/${product.product_id}`, productObj)
          .then(response => {
            console.log('Added to favorites:', response.data);
            
          })
          .catch(error => {
            console.error('Error adding to favorites:', error);
            
          });
      
    };

    return {
      products,
      loading,
      error,
      query,
      onSearch,
      favorites,
      addToFavorites
    };
  }
});
</script>

<style scoped>
.container {
  max-width: 2000px;
  margin: auto;
  padding-top: 50px;
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

.text-center {
  text-align: center;
  color: #fff;
}
body {
  background-color: #333;
}
.card-img, .card-img-bottom, .card-img-top {
    margin-top: 12px !important;
    margin-left: 80px !important;
    width: 53% !important;
    /* width: 52%; */
}
</style>
