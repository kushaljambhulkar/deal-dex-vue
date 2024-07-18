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
            product_image: 'https://cdn1.smartprix.com/rx-iiINHoq7T-w420-h420/motorola-edge-50-fus.webp',
            product_title: 'Samsung Galaxy25',
            product_lowest_price: 11999,
          },
          {
            product_id: 2,
            product_image: 'https://cdn1.smartprix.com/rx-idJisQXHN-w420-h420/oneplus-nord-ce-4-5g.webp',
            product_title: 'OnePlus 9 Pro 5G',
            product_lowest_price: 22999,
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
  .card-img, .card-img-bottom, .card-img-top {
    margin-top: 12px;
    margin-left: 80px;
    width: 53%;
    width: 53%;
    t: 33%;
    /* width: 52%; */
}
  </style>
  