<template>
    <div>
      <h1>Categories</h1>
      <ul>
        <li v-for="category in categories" :key="category.id">
          {{ category.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        categories: []
      };
    },
    created() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/categories');
          this.categories = response.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
    }
  };
  </script>
  