<template >
  <div class="movie-app">
    <div class="movie-app-title">
      <h1>movies</h1>
      <p>You can search any movies in this website</p>
    </div>
    <div class="movie-app-search">
      <input
        id="searchBar"
        type="text"
        class="movie-app-search-bar"
        placeholder="Search any movies ....."
        v-model="userSearch"
        @keydown.enter="getFilmInfo"
      />
      <label class="movie-app-search-icon" for="searchBar">
        <i class="fa-solid fa-magnifying-glass"></i>
      </label>
    </div>
    <div class="movie-app-movies">
      <div v-for="(film, index) in filmInfo" :key="index" class="movie-app-movies-info">
        <div class="movie-app-movies-info-image">
          <img :src="`${film.Poster}`" />
        </div>
        <div class="movie-app-movies-info-name">
          {{ filmTitle(film.Title) }}
          <span class="tooltiptext">{{ film.Title }}</span>
        </div>
        <div class="movie-app-movies-info-genre">{{ filmGenre }}</div>
        <div class="movie-app-movies-info-date">
          <i class="fa-solid fa-calendar-days"></i>
          {{ film.Year }}
        </div>
        <button class="movie-app-movies-info-button">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";

const userSearch = ref("");
const filmInfo = ref(null);
const filmGenre = ref(null);

const getFilmInfo = () => {
  if (userSearch.value.length > 0) {
    axios.get(`http://www.omdbapi.com/?apikey=8845743f&t=${userSearch.value}`).then(get_response => {
      filmGenre.value = get_response.data.Genre;
    });
    axios.get(`http://www.omdbapi.com/?apikey=8845743f&s=${userSearch.value}`).then(get_response => {
      filmInfo.value = get_response.data.Search;
      console.log(get_response.data.Search);
    });
    userSearch.value = "";
    return;
  }
  alert("Please enter film name!!!");
}

const filmTitle = (title) => {
  if (title.length > 14) {
    return title.slice(0, 14) + "...";
  } else {
    return title;
  }
  // return title;
}
</script>
<style src="./HomePage.scss" lang="scss" />