<template >
  <div class="movie-app">
    <router-link class="movie-app-like" :to="{ name: 'LikedPage' }">
      <i class="fa-solid fa-heart"></i>
    </router-link>
    <HomePageTitle />
    <SearchBar @getFilmInfo="getFilmInfo" />
    <MovieList v-show="moviesShowCheck" :filmInfo="filmInfo" @favItem="favItem" />
    <NoMovieMessage v-show="moviesShowCheck == false">The movie you were looking for was not found.</NoMovieMessage>
  </div>
</template>
<script setup>
import HomePageTitle from "../HomePageTitle/HomePageTitle.vue";
import SearchBar from "../SearchBar/SearchBar.vue";
import MovieList from "../MovieList/MovieList.vue";
import NoMovieMessage from "../NoMovieMessage/NoMovieMessage.vue";

import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const filmInfo = ref([]);
const moviesShowCheck = ref(null);
const likedMovieList = ref([]);

const getFilmInfo = (userSearch) => {
  if (userSearch.length > 0) {
    axios.get(`http://www.omdbapi.com/?apikey=8845743f&s=${userSearch}`).then(get_response => {
      if (get_response.data.Response == 'True') {
        filmInfo.value = get_response.data.Search;
        moviesShowCheck.value = true;
        return;
      }
      moviesShowCheck.value = false;
    });
    return;
  }
  alert("Please enter film name!!!");
}

const favItem = (film, target) => {
  let list = target.classList;
  if (list.contains("fa-regular")) {
    list.remove("fa-regular");
    list.add("fa-solid");
    likedMovieList.value.push(film);
    store.commit("setLikeMovies", likedMovieList.value);
  } else {
    list.remove("fa-solid");
    list.add("fa-regular");
    likedMovieList.value = likedMovieList.value.filter(f => f != film);
    store.commit("setLikeMovies", likedMovieList.value);
  }
};
</script>
<style src="./HomePage.scss" lang="scss" scoped/>