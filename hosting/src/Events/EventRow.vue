<script src="./EventRow" lang="ts"></script>

<template>
  <div class="bg-gray-50 mb-6 px-4 py-4 ring-2 ring-gray-100 rounded-xl">
    <div class="gap-x-5 gap-y-4 grid grid-cols-1 sm:grid-cols-3">
      <div class="col-span-1">
        <div class="aspect-h-9 aspect-w-16 w-full">
          <div
            class="bg-cover bg-top h-full rounded-lg shadow-lg w-full"
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
        <p class="hidden mt-3 text-center">
          <router-link
            :to="{ name: 'Event', params: { slug: event.slug } }"
            class="hover:text-brand-blue-500 text-brand-blue-900"
          >
            &gt; &gt; Register Now &lt; &lt;
          </router-link>
        </p>
      </div>
      <div class="col-span-1 sm:col-span-2">
        <router-link
          :to="{ name: 'Event', params: { slug: event.slug } }"
          class="hover:text-brand-blue-500 text-2xl text-brand-blue-900"
        >
          {{ event.name }}
          <div
            v-if="event.series && event.seriesType"
            class="align-middle bg-brand-black inline-block mb-1 ml-0.5 px-1 py-0.5 rounded-sm text-brand-blue-500 text-xs"
          >
            {{ event.seriesType }}
          </div>
        </router-link>
        <p class="mt-1 text-gray-400">
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
          :key="`eventrow-${event.slug}-${badge}`"
          class="bg-brand-black-50 inline-block lowercase mr-1.5 px-1.5 py-0.5 rounded-sm text-xs"
        >
          {{ badge }}
        </div>
      </div>
    </div>
  </div>
</template>
