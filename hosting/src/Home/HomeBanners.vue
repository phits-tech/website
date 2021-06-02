<script src="./HomeBanners.tsx" lang="ts"></script>

<template>
  <div
    v-if="banners.length > 0"
    class="m-auto max-w-7xl overflow-hidden relative relative"
  >
    <div class="aspect-h-9 aspect-w-16 overflow-hidden w-full">
      <div
        v-for="(banner, i) in banners"
        :key="`slide${i}`"
        :ref="registerBanner"
        class="bg-cover bg-top duration-1000 ease-in-out h-full slide transform transition-all w-full"
        :class="{['translate-x-0']: i === 0,
                 ['translate-x-full']: i > 0}"
        :style="{backgroundImage: `url(${banner.banner169Url})`}"
        @click="bannerClick(banner)"
      />
    </div>
    <div
      v-if="banners.length > 1"
      class="absolute bg-black bg-opacity-30 bottom-0 cursor-pointer flex h-8 items-center justify-center left-0 lg:h-14 lg:rounded-tr-3xl lg:text-4xl lg:w-14 md:h-12 md:text-2xl md:w-12 pr-1 rounded-tr-md sm:h-10 sm:rounded-tr-xl sm:text-xl sm:w-10 text-lg text-white w-8"
      @click="previousSlide(), resetSlideTimerAfterPause()"
    >
      &#x276E;
    </div>
    <div
      v-if="banners.length > 1"
      class="absolute bg-black bg-opacity-30 bottom-0 cursor-pointer flex h-8 items-center justify-center lg:h-14 lg:rounded-tl-3xl lg:text-4xl lg:w-14 md:h-12 md:text-2xl md:w-12 pl-1 right-0 rounded-tl-md sm:h-10 sm:rounded-tl-xl sm:text-xl sm:w-10 text-lg text-white w-8"
      @click="nextSlide(), resetSlideTimerAfterPause()"
    >
      &#x276F;
    </div>
  </div>
</template>
