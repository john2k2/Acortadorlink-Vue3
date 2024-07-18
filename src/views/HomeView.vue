<template>
  <div class="min-h-screen bg-gray-500 p-4">
    <header class="flex items-center justify-center w-full">
      <h1 class="text-4xl font-bold mb-6">ShortenLink</h1>
    </header>
    <main>
      <ShortenLink @add-link="addLink" />
      <LinkList :links="links" />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ShortenLink from "../components/ShortenLink.vue";
import LinkList from "../components/LinkList.vue";

const links = ref([]);

const addLink = (link) => {
  links.value.push(link);
};
</script>

<style scoped></style>
