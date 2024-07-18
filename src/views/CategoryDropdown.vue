<template>
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Categories
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li v-for="category in categories" :key="category.category_id">
          <a class="dropdown-item" href="#" @click="redirectCategoryPage(category)">
            {{ category.category_name }}
          </a>
        </li>
      </ul>
    </li>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'
  
  export default {
    data() {
      return {
        categories: [
          { category_id: 1, category_name: "Mobile" },
          { category_id: 2, category_name: "Table" },
          { category_id: 3, category_name: "Accessories" }
        ]
      };
    },
    setup() {
      const router = useRouter()
  
      const redirectCategoryPage = (category) => {
        let routeName = '';
        switch (category.category_name) {
          case 'Mobile':
            routeName = 'Mobile';
            break;
          case 'Table':
            routeName = 'Table';
            break;
          case 'Accessories':
            routeName = 'Accessories';
            break;
          default:
            routeName = '';
        }
        if (routeName) {
          router.push({ name: routeName });
        }
      }
  
      return {
        redirectCategoryPage
      }
    }
  }
  </script>
  
  <style>
  .dropdown-menu {
    --bs-dropdown-link-active-bg: #0d6efd !important;
  }
  </style>
  