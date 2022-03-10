import { createStore } from 'vuex'
export default createStore({
  state: {
    likedMovies: null
  },
  mutations: {
    setLikeMovies(state, likedMovies) {
      state.likedMovies = likedMovies;
    },
  },
  getters: {
    _getLikedMovies: (state) => {
      return state.likedMovies;
    },
  },
});
