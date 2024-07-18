<template>
  <div class="mt-6">
    <h2 class="text-2xl font-bold mb-4">Enlaces Acortados</h2>
    <ul>
      <li v-for="(link, index) in links" :key="index" class="mb-2">
        <div
          class="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
        >
          <a
            :href="link.original"
            target="_blank"
            class="text-blue-500 underline"
          >
            {{ link.originalUrl }}
          </a>
          <span class="text-gray-600">→</span>
          <a
            :href="url + link.shortUrl"
            target="_blank"
            class="text-green-500 underline"
          >
            {{ url + link.shortUrl }}
          </a>
          <button @click="deleteLink(link.id)" class="ml-4 text-red-500">
            x
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { supabase } from "@/supabase";
import { ref, onMounted, watch } from "vue";

const links = ref([]);
const url = ref("http://localhost:3000/");

const fetchLinks = async () => {
  const { data, error } = await supabase.from("urls").select("*");

  if (error) {
    console.error(error);
  } else if (data && data.length) {
    links.value = data;
  }
};

const deleteLink = async (id) => {
  const { error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error("Error deleting link:", error);
  } else {
    links.value = links.value.filter((link) => link.id !== id);
  }
};

onMounted(async () => {
  await fetchLinks();
});
</script>
