<template>
    <div>
      <div class="container" style="margin-top: 80px;" >
        <div class="row">
          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-6" v-for="product in products" :key="product.product_id">
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
          </div>
          <div class="col-lg-3">
            <h2 style="color: black;">Favorites</h2>
            <ul class="list-group">
              <li class="list-group-item" v-for="fav in favorites" :key="fav.product_id">
                {{ fav.product_title }} - ₹{{ fav.product_lowest_price }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Mobile',
    data() {
      return {
        products: [
          {
            product_id: 1,
            product_image: 'https://cdn1.smartprix.com/rx-iMHuOoggu-w280-h280/fire-boltt-4g-pro-sm.webp',
            product_title: 'Fire Boltt 4G Pro',
            product_lowest_price: 1500,
          },
          {
            product_id: 2,
            product_image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1704787892/Croma%20Assets/Wearable/Wearable%20Devices/Images/303699_pfjbzl.png?tr=w-640',
            product_title: 'FIRE-BOLTT Dream Wi-Fi+4G SIM Android OS Wristphone ',
            product_lowest_price: 89999,
          },
          // Add more products as needed
        ],
        favorites: [],
      };
    },
    methods: {
      addToFavorites(product) {
        if (!this.favorites.some(fav => fav.product_id === product.product_id)) {
          this.favorites.push(product);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  