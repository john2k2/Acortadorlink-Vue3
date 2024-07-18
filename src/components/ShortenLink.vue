<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <form @submit.prevent="shortenLink">
      <div class="mb-4">
        <label for="url" class="block text-sm font-medium text-gray-700"
          >URL:</label
        >
        <input
          v-model="url"
          id="url"
          type="url"
          required
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Acortar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const url = ref("");

const shortenLink = async () => {
  try {
    const response = await fetch("http://localhost:3000/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl: url.value }),
    });
    const data = await response.json();
    window.location.reload();
    url.value = "";
  } catch (error) {
    console.error("Error acortando la URL:", error);
  }
};
</script>
