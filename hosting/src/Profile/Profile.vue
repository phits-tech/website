<script src="./Profile" lang="ts"></script>

<template>
  <div class="lg:px-8 max-w-7xl mt-6 mx-auto px-4 sm:px-6">
    <div
      v-if="user"
      class="p-4 sm:flex"
    >
      <!-- Contact -->
      <!-- TODO: For `sm`, put contact panel top; photo left & details right -->
      <div class="flex-none lg:mr-12 lg:w-72 md:mr-10 md:w-60 sm:mr-8 sm:w-48">
        <div
          class="overflow-hidden pb-1 ring-1 ring-gray-50 rounded-md shadow-lg"
        >
          <div
            class="aspect-h-1 aspect-w-1 bg-cover"
            :style="{ backgroundImage: `url(${user.pic})` }"
          />
          <div class="px-4 py-4">
            <h1 class="font-medium text-3xl text-brand-black">
              {{ user.name }}
            </h1>
            <h2 class="font-light italic leading-tight text-gray-400 text-lg">
              {{ user.slug }}
            </h2>
            <p class="pt-4">
              <a
                v-for="[socialKey, socialUrl] in socialAccounts"
                :key="`profile-social-${socialKey}`"
                :href="socialUrl"
                class="hover:text-brand-blue-800 mr-1"
              >
                <img
                  :src="`/images/icons/${socialKey}.svg`"
                  class="h-6 inline md:h-6 md:w-6 sm:h-5 sm:w-5 w-6"
                  :alt="`${socialKey} profile`"
                >
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Profile -->
      <div class="mt-8 sm:flex-auto sm:mt-0">
        <h2 class="italic text-2xl">
          {{ user.tagline }}
        </h2>
        <p class="mt-4 text-lg">
          {{ user.bio }}
        </p>
        <p class="mt-4">
          <span
            v-for="skill in user.skills.sort()"
            :key="`profile-skill-${skill}`"
            class="bg-gray-100 font-light inline-block mb-2 mr-2 px-1.5 py-1 ring-1 ring-gray-200 rounded-md text-brand-black text-xs"
          >
            {{ skill }}
          </span>
        </p>
        <div class="flex items-center mt-8">
          <h3 class="flex-grow text-xl">
            <span class="md:inline sm:hidden">Community</span>
            Contribution
          </h3>
          <p
            class="flex-none font-light text-brand-black-900 text-right text-sm"
          >
            {{ ccusFromContribution + ccusFromAttendance }}
            <span class="border-b-2 border-dotted border-gray-300 has-tooltip">
              <span
                class="-translate-x-1/2 bg-gray-50 italic ml-4 mt-7 py-2 rounded shadow-lg text-brand-black-500 text-center tooltip transform w-36"
              >
                Community Contribution Units
              </span>
              CCU
            </span>
            · {{ user.lccus }}
            <span class="border-b-2 border-dotted border-gray-200 has-tooltip">
              <span
                class="-translate-x-1/2 bg-gray-50 italic ml-5 mt-7 py-1 rounded shadow-lg text-brand-black-500 text-center tooltip transform w-20"
              >
                Lifetime CCUs
              </span>
              LCCU
            </span>
          </p>
        </div>

        <!-- Contribution CCUs (listed) -->
        <router-link
          v-for="contribution in eventsContributionAll"
          :key="`profile-contrib-${contribution.slug}`"
          :to="{ name: 'Event', params: { slug: contribution.slug } }"
          class="bg-gray-100 flex items-center lg:space-x-5 mt-3 space-x-4"
        >
          <div class="flex-none">
            <div
              class="aspect-h-9 aspect-w-16 bg-cover bg-top lg:w-32 md:w-32 sm:w-24 w-28"
              :style="
                false // eslint-disable-line vue/no-constant-condition -- WIP
                  ? {
                    backgroundImage: `url(${contribution.banner169Url})`
                  }
                  : {
                    backgroundImage:
                      'url(/images/placeholders/banner_16_9_default.jpg)'
                  }
              "
            />
          </div>
          <div class="flex-grow">
            <p
              class="font-light lg:text-lg line-clamp-1 md:text-base sm:text-sm xl:text-xl"
            >
              {{ contribution.name }}
            </p>
            <p class="font-light text-gray-400 text-xs xl:text-sm">
              {{ $filters.monthYear(contribution.date) }} -
              <span class="italic">{{ contribution.role }}</span>
            </p>
          </div>
          <div class="flex-none lg:pr-5 pr-4">
            <p
              class="font-extralight text-xl"
              :class="{
                'text-brand-black-100':
                  contribution.date.seconds < ccuCutoffSeconds
              }"
            >
              {{ contribution.ccus }}
            </p>
          </div>
        </router-link>

        <!-- Attendance CCUs (aggregated) -->
        <div
          v-if="eventsAttendanceCcu.length > 0"
          class="bg-gray-100 flex items-center mt-3 space-x-4"
        >
          <div class="flex-none">
            <div
              class="aspect-h-9 aspect-w-16 bg-cover bg-top lg:w-32 md:w-28 sm:w-24 w-28 xl:w-36"
              :style="
                false // eslint-disable-line vue/no-constant-condition -- WIP
                  ? { backgroundImage: 'url(' + 'potato' + ')' } // eslint-disable-line vue/no-useless-concat -- WIP
                  : {
                    backgroundImage:
                      'url(/images/placeholders/banner_16_9_default.jpg)'
                  }
              "
            />
          </div>
          <div class="flex-grow">
            <p
              class="font-light lg:text-lg line-clamp-1 md:text-base sm:text-sm"
            >
              Attendee x {{ eventsAttendanceCcu.length }} ({{
                ccusFromAttendance
              }}
              hours)
            </p>
          </div>
          <div class="flex-none pr-4">
            <p class="font-extralight text-xl">
              {{ ccusFromAttendance }}
            </p>
          </div>
        </div>

        <h3
          v-if="user.events.length > 0"
          class="flex-grow mt-8 text-xl"
        >
          Events Attended ({{ user.events.length }})
        </h3>
        <div
          class="gap-3 grid grid-cols-4 lg:grid-cols-6 md:grid-cols-5 mt-3 xl:grid-cols-7"
        >
          <router-link
            v-for="event in user.events"
            :key="`profile-event-${event.slug}`"
            :to="{ name: 'Event', params: { slug: event.slug } }"
          >
            <div
              class="aspect-h-9 aspect-w-16 bg-cover bg-top"
              :style="
                false // eslint-disable-line vue/no-constant-condition -- WIP
                  ? { backgroundImage: `url(${event.banner169Url})` }
                  : {
                    backgroundImage:
                      'url(/images/placeholders/banner_16_9_default.jpg)'
                  }
              "
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
