// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: {
      id: '123', // Replace with actual user id
      token: 'your-token-here', // Replace with actual token
    },
  },
  getters: {
    getToken: (state) => state.user.token,
  },
});

export default store;
