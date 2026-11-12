<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-bg text-ink font-sans antialiased">
    <a href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:py-2 focus:px-4 focus:bg-brand focus:text-white focus:rounded focus:z-50">
      Passer au contenu principal
    </a>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>