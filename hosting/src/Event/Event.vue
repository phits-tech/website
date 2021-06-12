<script src="./Event" lang="ts"></script>

<template>
  <div class="max-w-7xl mx-auto overflow-hidden relative">
    <div v-if="event">
      <div class="aspect-h-2 aspect-w-5 overflow-hidden w-full">
        <div
          class="absolute bg-cover bg-top h-full inset-0 object-contain w-full"
          :style="
            event.bannerUrl
              ? { backgroundImage: `url(${event.bannerUrl})` }
              : {
                backgroundImage:
                  'url(/images/placeholders/banner_16_9_default.jpg)'
              }
          "
        />
      </div>

      <div class="lg:px-8 mt-12 px-4 sm:px-6 xs:mt-6">
        <h3 class="font-medium text-3xl text-brand-black">
          {{ event.name }}
          <div
            v-if="event.series && event.seriesType"
            class="align-middle bg-brand-black inline-block mb-1 ml-0.5 px-1 py-0.5 rounded-sm text-brand-blue-500 text-xs"
          >
            {{ event.seriesType }}
          </div>
        </h3>

        <p class="text-gray-400">
          {{ $filters.eventDate(event) }} @ {{ event.location }}
        </p>
        <div
          v-if="event.description"
          class="my-4"
        >
          {{ event.description }}
        </div>
        <div
          v-for="badge in event.badges"
          :key="`event-${badge}`"
          class="bg-brand-black-50 inline-block mr-1.5 px-1.5 py-0.5 rounded-sm text-sm"
        >
          {{ badge }}
        </div>
      </div>
    </div>
    <div
      v-else
      class="lg:px-8 mt-12 px-4 sm:px-6 xs:mt-6"
    >
      <!-- TODO: Design this -->
      <h3 class="text-xl">
        Event does not exist
      </h3>
    </div>
  </div>
</template>
