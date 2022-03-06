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
    <div v-show="moviesShowCheck" class="movie-app-movies">
      <div class="movie-app-movies-control">
        <button @click="sortFilmListAscending" class="movie-app-movies-control-buttons">
          <i class="fa-solid fa-arrow-down"></i>
        </button>
        <button @click="sortFilmListDescending" class="movie-app-movies-control-buttons">
          <i class="fa-solid fa-arrow-up"></i>
        </button>
      </div>
      <div v-for="(film, index) in filmInfo" :key="index" class="movie-app-movies-info">
        <div class="movie-app-movies-info-image">
          <img :src="`${film.Poster}`" />
        </div>
        <div class="movie-app-movies-info-name">
          {{ filmTitle(film.Title) }}
          <span class="tooltiptext">{{ film.Title }}</span>
        </div>
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
import { ref, computed } from "vue";

const userSearch = ref("");
const filmInfo = ref([]);
const moviesShowCheck = ref(false);

const getFilmInfo = () => {
  if (userSearch.value.length > 0) {
    axios.get(`http://www.omdbapi.com/?apikey=8845743f&s=${userSearch.value}`).then(get_response => {
      filmInfo.value = get_response.data.Search;
    });
    moviesShowCheck.value = true;
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
}

const sortFilmListAscending = computed(() => {
  filmInfo.value.sort((a, b) => {
    return b.Year - a.Year;
  });
})

const sortFilmListDescending = computed(() => {
  filmInfo.value.sort((a, b) => {
    return a.Year - b.Year;
  });
})
</script>
<style src="./HomePage.scss" lang="scss" />