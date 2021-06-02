<script src="./Events.tsx" lang="ts"></script>

<template>
  <div class="lg:px-8 max-w-7xl mt-8 mx-auto px-4 sm:mt-6 sm:px-6">
    <h1 class="font-medium pb-8 text-3xl text-brand-black">
      Upcoming Events
    </h1>
    <EventRow
      v-for="event in futureEvents"
      :key="`event${event.slug}`"
      :event="event"
    />

    <h1 class="font-medium pb-8 text-3xl text-brand-black">
      Past Events
    </h1>
    <EventRow
      v-for="event in pastEvents"
      :key="`event${event.slug}`"
      :event="event"
    />
  </div>
</template>
