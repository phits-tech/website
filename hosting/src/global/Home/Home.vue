<script src="./Home.tsx" lang="ts"></script>

<template>
  <!-- Banner -->
  <div class="bg-gray-400 w-full">
    <HomeBanners />
  </div>

  <!-- Calendar lookahead -->
  <div class="bg-gray-200">
    <div class="max-w-7xl mx-auto pb-1.5 pt-3 px-3">
      <div class="gap-x-4 grid grid-cols-1 md:grid-cols-7 px-2 sm:grid-cols-2">
        <div
          v-for="(dayAndEvent, i) in sevenDaysAhead"
          :key="`calendar${i}`"
        >
          <div
            class="capitalize font-semibold text-gray-500 text-sm tracking-wide"
          >
            {{ dayAndEvent.day }}
          </div>
          <router-link
            v-if="dayAndEvent.events.length === 0"
            :to="{name: 'EventsCreate'}"
            class="block hover:text-blue-400 py-2 text-gray-400 text-xs"
          >
            Add event
          </router-link>
          <div
            v-for="(event, idx) in dayAndEvent.events"
            :key="event.id"
            class="bg-gray-100 cursor-pointer hover:bg-white my-2 ring-2 ring-gray-300 rounded-sm text-blue-600"
          >
            <div
              v-if="idx < 2"
              class="lg:px-2.5 lg:py-2 px-2 py-1.5"
              @click="
                $router.push({name: 'Event',
                              params: {slug: event.slug}})
              "
            >
              <div
                class="break-words leading-5 lg:leading-5 lg:text-base line-clamp-2 md:leading-4 md:text-sm"
              >
                {{ event.name }}
              </div>
              <div
                class="break-all lg:text-sm line-clamp-1 mt-0.5 text-gray-600 text-xs"
              >
                {{ $filters.eventTime(event) }}
                <sup v-if="event.dateStart.day() !== event.dateEnd.day()">
                  +1
                </sup>
              </div>
            </div>
            <div
              v-if="idx === 2"
              class="font-light lg:px-2.5 lg:py-2 px-2 py-1.5 text-gray-400"
              @click="$router.push({name: 'Events'})"
            >
              ...
            </div>
          </div>
        </div>
      </div>

      <div class="leading-none pb-1 sm:pb-0 text-right">
        <router-link
          :to="{name: 'Events'}"
          class="capitalize hover:text-blue-400 text-blue-600 text-xs"
        >
          {{ $t('seeAll') }} &gt;
        </router-link>
      </div>
    </div>
  </div>

  <!-- Call to action -->
  <div
    class="lg:px-8 max-w-7xl mx-auto overflow-hidden px-5 relative sm:px-6 xl:px-2"
  >
    <div
      class="bg-white lg:max-w-2xl lg:pb-6 lg:w-full mt-6 relative sm:mt-8 z-10"
    >
      <svg
        class="absolute h-full hidden inset-y-0 lg:block right-0 text-white transform translate-x-1/2 w-48"
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>
      <div>
        <h1
          class="font-extrabold md:py-4 md:text-5xl sm:text-4xl text-3xl text-brand-black tracking-tight"
        >
          <span class="block">Become a Phits Tech</span>
          <span class="block text-brand-blue-400">Community Hero</span>
        </h1>
        <p
          class="lg:max-w-xl md:mt-5 md:text-xl mt-3 sm:mt-5 sm:text-lg text-base text-gray-500"
        >
          {{ $t('becomeHeroText') }}
        </p>
        <div
          class="lg:flex lg:justify-start md:mt-8 mt-5 sm:justify-end sm:mt-6"
        >
          <!-- TODO: Sync button styles (copy from /heroes) -->
          <div class="rounded-md shadow">
            <router-link
              :to="{name: 'EventsCreate'}"
              class="bg-brand-blue-600 border border-transparent flex font-medium hover:bg-brand-blue-800 items-center justify-center md:px-10 md:py-4 md:text-lg px-8 py-3 rounded-md text-base text-white w-full"
            >
              {{ $t('hostAnEvent') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div
      class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 md:mt-10 mt-6 sm:mb-2 sm:mt-8"
    >
      <img
        class="h-56 lg:h-full lg:w-full md:h-96 object-cover sm:h-72 w-full"
        src="@assets/group-photo.jpg"
        alt="People gathering at a Phits.Tech community event"
      >
    </div>
  </div>
</template>
