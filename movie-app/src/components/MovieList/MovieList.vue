<template>
  <div class="movie-app-movies">
    <div class="movie-app-movies-control">
      <p>sort by date</p>
      <div class="movie-app-movies-control-button-group">
        <button
          @click="sortFilmListAscending"
          class="movie-app-movies-control-button-group-buttons"
        >
          <i class="fa-solid fa-arrow-down"></i>
        </button>
        <button
          @click="sortFilmListDescending"
          class="movie-app-movies-control-button-group-buttons"
        >
          <i class="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </div>
    <div v-for="(film, index) in props.filmInfo" :key="index" class="movie-app-movies-info">
      <div class="movie-app-movies-info-image">
        <router-link :to="{ name: 'HomePage' }">
          <img :src="`${film.Poster}`" />
        </router-link>
      </div>
      <div class="movie-app-movies-info-name">
        {{ filmTitle(film.Title) }}
        <span class="tooltiptext">{{ film.Title }}</span>
      </div>
      <div class="movie-app-movies-info-type">{{ film.Type }}</div>
      <div class="movie-app-movies-info-date">
        <i class="fa-solid fa-calendar-days"></i>
        {{ film.Year }}
      </div>
      <button class="movie-app-movies-info-button">
        <i @click.prevent="favItem(film, $event.currentTarget)" class="fa-regular fa-heart"></i>
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed, ref } from "vue";

const props = defineProps(['filmInfo']);
const likedMovieList = ref([]);

const favItem = (film, target) => {
  let list = target.classList;
  if (list.contains("fa-regular")) {
    list.remove("fa-regular");
    list.add("fa-solid");
    likedMovieList.value.push(film);
  } else {
    list.remove("fa-solid");
    list.add("fa-regular");
    likedMovieList.value = likedMovieList.value.filter(f => f != film);
  }
};


const filmTitle = (title) => {
  if (title.length > 14) {
    return title.slice(0, 14) + "...";
  } else {
    return title;
  }
}

const sortFilmListAscending = computed(() => {
  props.filmInfo.sort((a, b) => {
    return b.Year - a.Year;
  });
})

const sortFilmListDescending = computed(() => {
  props.filmInfo.sort((a, b) => {
    return a.Year - b.Year;
  });
})
</script>
<style src="./MovieList.scss" lang="scss" />