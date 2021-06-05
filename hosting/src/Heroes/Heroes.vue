<script src="./Heroes" lang="ts"></script>

<template>
  <div class="lg:px-8 max-w-7xl mx-auto px-6 sm:px-6">
    <!--  Become a Hero (heading) -->
    <div class="grid grid-cols-2">
      <h1 class="font-medium mt-8 text-3xl text-brand-black">
        {{ $t('becomeHeroTitle') }}
      </h1>
      <div class="block mt-8 sm:hidden text-right">
        <p class="font-light italic text-gray-400 text-xs">
          {{ $t('yourContribution') }}
        </p>
        <router-link
          :to="{ name: 'Profile', params: { slug: 'charles-allen' } }"
          class="text-brand-blue-800 text-xs"
        >
          CCU: 160 · LCCU: 220
        </router-link>
      </div>
    </div>

    <!-- Become a Hero (text) -->
    <div class="mt-4">
      <i18n-t
        keypath="becomeHeroText"
        tag="p"
      >
        <template #linkCommunityHero>
          <router-link
            :to="{ name: 'HeroesWhy' }"
            class="font-bold hover:text-brand-blue-600 inline text-brand-blue-800"
          >
            Community Hero
          </router-link>
        </template>
        <template #boldCcus>
          <span class="font-bold">CCUs</span>
        </template>
        <template #linkBenefits>
          <router-link
            :to="{ name: 'HeroesWhy' }"
            class="hover:text-brand-blue-600 inline text-brand-blue-800"
          >
            {{ $t('becomeHeroTextBenefits') }}
          </router-link>
        </template>
      </i18n-t>
    </div>

    <!-- Call-to-action -->
    <div class="mt-5 text-center">
      <router-link
        :to="{ name: 'EventsCreate' }"
        class="bg-brand-blue-600 block border-b-2 border-brand-blue-900 font-medium hover:bg-brand-blue-800 px-16 py-3.5 rounded-md shadow-md shine sm:inline-block sm:px-24 sm:py-4 sm:text-xl text-center text-lg text-white"
      >
        Host an event
      </router-link>
      <router-link
        :to="{ name: 'Profile', params: { slug: 'charles-allen' } }"
        class="font-light hidden mt-3 sm:block text-gray-400 text-sm"
      >
        {{ $t('yourContribution') }}:
        <span class="font-normal text-brand-blue-800">
          CCU: 160 / LCCU: 220
        </span>
      </router-link>
    </div>

    <!-- Community Heroes -->
    <div v-if="heroesActive.length > 0">
      <h1 class="font-medium mt-8 text-3xl text-brand-black">
        Community Heroes
      </h1>
      <div
        class="gap-x-5 gap-y-7 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 mt-4 sm:gap-y-6 sm:grid-cols-2"
      >
        <router-link
          v-for="hero in heroesActive"
          :key="`heroes-active-${hero.slug}`"
          :to="{ name: 'Profile', params: { slug: hero.slug } }"
          class="cursor-pointer overflow-hidden rounded shadow-lg"
        >
          <div class="aspect-h-1 aspect-w-1 w-full">
            <div
              class="bg-cover bg-top h-full w-full"
              :style="
                hero.pic
                  ? { backgroundImage: `url(${hero.pic})` }
                  : { backgroundImage: 'url(/images/banner_16_9_default.jpg)' }
              "
            />
            <!-- URGENT: Update default pic -->
          </div>
          <div class="pb-4 pt-4 px-5 relative">
            <div class="font-bold text-xl">
              {{ hero.name }}
            </div>
            <p class="leading-tight mt-1 text-base text-gray-700">
              {{ hero.bio }}
            </p>
            <p class="pt-3 text-xs">
              {{ $t('latestEvent') }}:
            </p>
            <p
              class="hover:text-blue-400 leading-tight pt-0.5 text-blue-600 text-bold text-sm"
            >
              <router-link
                :to="{ name: 'Event', params: { slug: hero.lastEvent.slug } }"
              >
                {{ hero.lastEvent.name }}
              </router-link>
            </p>
            <p class="pt-4">
              <router-link
                :to="{ name: 'Profile', params: { slug: hero.slug } }"
                class="bg-brand-blue-50 font-normal hover:bg-white inline-block mb-2 mr-2 px-1.5 py-1 ring-1 ring-brand-blue rounded-md text-brand-blue-900 text-xs"
              >
                {{ hero.ccus }}
              </router-link>
              <span
                v-for="skill in hero.skills.sort().slice(0, 12)"
                :key="`heroes-active-${hero.slug}-${skill}`"
                class="bg-gray-100 font-light inline-block mb-2 mr-2 px-1.5 py-1 ring-1 ring-gray-200 rounded-md text-brand-black text-xs"
              >
                {{ skill }}
              </span>
            </p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Hall of Fame -->
    <div v-if="heroesHallOfFame.length > 0">
      <h1 class="font-medium mt-10 text-3xl text-brand-black">
        {{ $t('hallOfFame') }}
      </h1>
      <div
        class="gap-x-4 gap-y-5 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-5 mt-4 sm:grid-cols-4"
      >
        <router-link
          v-for="hero in heroesHallOfFame"
          :key="`heroes-hof-${hero.slug}`"
          :to="{ name: 'Profile', params: { slug: hero.slug } }"
          class="cursor-pointer overflow-hidden rounded shadow-lg"
        >
          <div class="aspect-h-1 aspect-w-1 w-full">
            <div
              class="bg-cover bg-top h-full w-full"
              :style="
                hero.pic
                  ? { backgroundImage: `url(${hero.pic})` }
                  : { backgroundImage: 'url(/images/banner_16_9_default.jpg)' }
              "
            />
            <!-- URGENT: Update default pic -->
          </div>
          <div class="pb-3 pt-2 px-3">
            <div class="font-medium text-md">
              {{ hero.name }}
            </div>
            <p class="pt-2 text-xs">
              {{ $t('latestEvent') }}:
            </p>
            <p
              class="hover:text-blue-400 leading-tight pt-0.5 text-blue-600 text-bold text-xs"
            >
              <router-link
                :to="{ name: 'Event', params: { slug: hero.lastEvent.slug } }"
              >
                {{ hero.lastEvent.name }}
              </router-link>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
