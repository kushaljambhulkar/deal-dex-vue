import axios from 'axios';

const API_URL = 'http://localhost:8080/api/favorites'; // Adjust the base URL as per your backend setup

export default {

    addFavorite(userId, favorite) {
        return axios.post(`${API_URL}/${userId}/${productId}`, favorite);
    },
    getFavorites(userId) {
        return axios.get(`${API_URL}/${userId}`);
    },

    deleteFavorite(userId, favoriteId) {
        return axios.delete(`${API_URL}/${userId}/${favoriteId}`);
    }
};
