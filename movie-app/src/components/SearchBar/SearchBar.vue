<template>
  <div class="movie-app-search">
    <input
      id="searchBar"
      type="text"
      class="movie-app-search-bar"
      placeholder="Search any movies ....."
      v-model="userSearch"
      @keydown.enter="emit('getFilmInfo', userSearch)"
    />
    <label class="movie-app-search-icon" for="searchBar">
      <i class="fa-solid fa-magnifying-glass"></i>
    </label>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps(['userSearch']);
const emit = defineEmits(['getFilmInfo']);
const userSearch = ref("");

</script>
<style src="./SearchBar.scss" lang="scss" scoped/>
