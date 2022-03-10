<template>
  <div class="movie-app-like">
    <h2 class="movie-app-like-title">
      Liked Movies
      <i class="fa-solid fa-thumbs-up"></i>
    </h2>
    <router-link :to="{ name: 'HomePage' }" class="movie-app-like-home">
      <i class="fa-solid fa-house"></i>
    </router-link>
    <div
      v-if="likedMoviesCheck"
      v-for="(film, index) in likedMoviesList"
      :key="index"
      class="movie-app-like-movies"
    >
      <div class="movie-app-like-movies-image">
        <router-link :to="{ name: 'HomePage' }">
          <img :src="`${film.Poster}`" />
        </router-link>
      </div>
      <div class="movie-app-like-movies-name">
        {{ filmTitle(film.Title) }}
        <span class="tooltiptext">{{ film.Title }}</span>
      </div>
      <div class="movie-app-like-movies-type">{{ film.Type }}</div>
      <div class="movie-app-like-movies-date">
        <i class="fa-solid fa-calendar-days"></i>
        {{ film.Year }}
      </div>
      <button class="movie-app-like-movies-button">
        <i @click.prevent="favItem(film, $event.currentTarget)" class="fa-regular fa-heart"></i>
      </button>
    </div>
    <NoMovieMessage v-else>There is no liked movie.</NoMovieMessage>
  </div>
</template>
<script setup>
import NoMovieMessage from "../NoMovieMessage/NoMovieMessage.vue";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

const store = useStore();

const likedMovies = ref(store.getters._getLikedMovies);
const likedMoviesList = ref([]);
const likedMoviesCheck = ref(false);

onMounted(() => {
  if (likedMovies.value != null) {
    likedMoviesCheck.value = true;
    likedMovies.value.forEach(element => {
      likedMoviesList.value.push(element);
    });
    return;
  }
})

const filmTitle = (title) => {
  if (title.length > 14) {
    return title.slice(0, 14) + "...";
  } else {
    return title;
  }
}
</script>
<style src="./LikedMovieList.scss" lang="scss" scoped/>