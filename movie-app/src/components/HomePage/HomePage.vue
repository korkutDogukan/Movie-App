<template >
  <div class="movie-app">
    <HomePageTitle />
    <SearchBar @getFilmInfo="getFilmInfo" />
    <MovieList v-show="moviesShowCheck" :filmInfo="filmInfo" />
    <NoMovieMessage v-show="moviesShowCheck == false" />
  </div>
</template>
<script setup>
import HomePageTitle from "../HomePageTitle/HomePageTitle.vue";
import SearchBar from "../SearchBar/SearchBar.vue";
import MovieList from "../MovieList/MovieList.vue";
import NoMovieMessage from "../NoMovieMessage/NoMovieMessage.vue";

import axios from "axios";
import { ref } from "vue";

const filmInfo = ref([]);
const moviesShowCheck = ref(null);

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
</script>
<style src="./HomePage.scss" lang="scss" />