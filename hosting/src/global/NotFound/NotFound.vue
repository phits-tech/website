<script src="./NotFound.ts" lang="ts"></script>
<template>
  <div class="block">
    <span v-if="item">{{ itemCapitalized }}</span>
    <span v-else>Page</span>
    not found.
  </div>
</template>
