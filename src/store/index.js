// store.js or store/index.js
import { createStore } from 'vuex';
import axios from 'axios';
import Vue from 'vue';

Vue.use(Vuex);
const API_URL = 'http://localhost:8080/api/favorites'; // Adjust the base URL as per your backend setup

export default createStore({

    addFavorite(userId, favorite) {
        return axios.post(`${API_URL}/${userId}/${productId}`, favorite);
    },
    getFavorites(userId) {
        return axios.get(`${API_URL}/${userId}`);
    },

    deleteFavorite(userId, favoriteId) {
        return axios.delete(`${API_URL}/${userId}/${favoriteId}`);
    },
  state: {
    token: localStorage.getItem('api_token') || '',
    user: null,
    favorites: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.token = '';
      state.user = null;
      localStorage.removeItem('api_token');
    },
    SET_FAVORITES(state, favorites) {
      state.favorites = favorites;
    },
    REMOVE_FAVORITE(state, favoriteId) {
      state.favorites = state.favorites.filter(fav => fav.id !== favoriteId);
    },
    ADD_FAVORITE(state, favorite) {
      state.favorites.push(favorite);
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('https://localhost:8080/api/auth/login', credentials);
        const token = response.data.accessToken;
        commit('setToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('api_token', token);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('logout');
      delete axios.defaults.headers.common['Authorization'];
    },
    async fetchFavorites({ commit, state }) {
      try {
        const userId = state.user ? state.user.id : 'userId'; // Replace with actual user ID logic
        const response = await favoritesService.getFavorites(userId);
        commit('SET_FAVORITES', response.data);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    },
    async deleteFavorite({ commit, state }, favoriteId) {
      try {
        const userId = state.user ? state.user.id : 'userId'; // Replace with actual user ID logic
        await favoritesService.deleteFavorite(userId, favoriteId);
        commit('REMOVE_FAVORITE', favoriteId);
      } catch (error) {
        console.error('Failed to delete favorite:', error);
      }
    },
    async addFavorite({ commit, state }, product) {
      try {
        const userId = state.user ? state.user.id : 'userId'; // Replace with actual user ID logic
        await axios.post(`http://localhost:8080/api/favorites/${userId}`, product, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          }
        });
        commit('ADD_FAVORITE', product);
      } catch (error) {
        console.error('Failed to add favorite:', error);
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getToken: state => state.token,
    getUser: state => state.user,
    favorites: state => state.favorites
  }
});
