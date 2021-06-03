<script src="./Spaces" lang="ts"></script>

<template>
  <div class="lg:px-8 max-w-7xl mx-auto px-6 sm:px-6">
    <!-- Grid -->
    <div
      class="gap-x-5 gap-y-6 grid grid-cols-1 lg:grid-cols-3 mt-8 sm:grid-cols-2"
    >
      <div
        v-for="space in spaces"
        :key="`spaces-${space.slug}`"
        class="shadow-lg"
      >
        <!-- Space: Banner -->
        <div class="aspect-h-9 aspect-w-16 relative w-full">
          <div
            class="bg-cover bg-top h-full w-full"
            :style="{ backgroundImage: `url(${space.banner})` }"
          >
            <div
              class="absolute bg-cover bg-top h-16 inline-block right-3 rounded-md top-3 w-16"
              :style="{ backgroundImage: `url(${space.logo})` }"
            />
          </div>
        </div>

        <!-- Space: Text -->
        <div class="px-5 py-5">
          <div class="flex items-center">
            <h1 class="flex-shrink leading-none text-3xl text-brand-black">
              {{ space.name }}
            </h1>
            <div class="flex-grow">
              <div
                class="bg-brand-blue-50 inline-block lowercase ml-2 px-1.5 py-0.5 ring-1 ring-brand-blue-900 rounded-full text-brand-black text-xs"
              >
                {{ space.category }}
              </div>
            </div>
          </div>

          <p class="mt-2">
            <span v-if="space.locationLatitude && space.locationLongitude">
              <a
                class="hover:text-blue-500 line-clamp-1 text-blue-700"
                :href="`https://www.google.com/maps/search/?api=1&query=${space.locationLatitude},${space.locationLongitude}`"
              >
                <svg
                  class="h-4 inline-block mb-0.5 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
                  />
                </svg>
                {{ space.locationText }}
              </a>
            </span>
            <span v-else-if="space.locationText.startsWith('http')">
              <a
                class="hover:text-blue-500 line-clamp-1 text-blue-700"
                :href="space.locationText"
              >
                {{ space.locationText }}
              </a>
            </span>
            <span v-else class="line-clamp-1">{{ space.locationText }}</span>
          </p>

          <p class="mt-3 text-gray-500">
            {{ $td(space.description) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
