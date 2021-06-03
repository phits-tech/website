<script src="./EventsCreate" lang="ts"></script>

<template>
  <div class="lg:px-8 max-w-4xl mt-8 mx-auto px-4 sm:mt-6 sm:px-6">
    <h3 class="font-medium text-3xl text-brand-black">
      {{ $t('title') }}
    </h3>

    <p class="mt-4">
      {{ $t('intro') }}
    </p>

    <form @submit.prevent="submit">
      <!-- Share or Propose? -->
      <div class="-mx-3 flex flex-wrap mt-3">
        <div class="md:w-1/2 mt-3 px-3 w-full">
          <input
            id="event-type-share"
            v-model="form.eventType"
            type="radio"
            name="event-type"
            value="share"
            class="hidden"
          >
          <label
            for="event-type-share"
            class="bg-gray-100 border-2 border-gray-300 flex p-4 rounded-lg text-brand-black-700 w-full"
            :class="{
              'bg-brand-blue-50': isShare,
              'border-brand-blue-900': isShare
            }"
          >
            <img
              v-if="isShare"
              src="/images/icons/calendar-import.svg"
              alt="Share an event"
              class="pr-4 text-brand-blue-900"
            >
            <img
              v-else
              src="/images/icons/circle-outline.svg"
              alt="Share an event (unselected)"
              class="pr-4 text-brand-blue-900"
            >
            <div>
              <p class="font-semibold leading-5">{{ $t('modeShareTitle') }}</p>
              <p class="text-brand-black-400 text-sm">
                {{ $t('modeShareDescription') }}
              </p>
            </div>
          </label>
        </div>
        <div class="md:w-1/2 mt-3 px-3 w-full">
          <input
            id="event-type-propose"
            v-model="form.eventType"
            type="radio"
            name="event-type"
            value="propose"
            class="hidden"
          >
          <label
            for="event-type-propose"
            class="bg-gray-100 border-2 border-gray-300 flex p-4 rounded-lg text-brand-black-700 w-full"
            :class="{
              'bg-brand-blue-50': isPropose,
              'border-brand-blue-900': isPropose
            }"
          >
            <img
              v-if="isPropose"
              src="/images/icons/calendar-plus.svg"
              alt="Propose an event"
              class="pr-4 text-brand-blue-900"
            >
            <img
              v-else
              src="/images/icons/circle-outline.svg"
              alt="Propose an event (unselected)"
              class="pr-4 text-brand-blue-900"
            >
            <div>
              <p class="font-semibold leading-5">
                {{ $t('modeProposeTitle') }}
              </p>
              <p class="text-brand-black-400 text-sm">
                {{ $t('modeProposeDescription') }}
              </p>
            </div>
          </label>
        </div>
      </div>

      <div
        class="border-2 border-brand-blue-900 flex flex-wrap mt-6 px-3 py-4 rounded-lg"
      >
        <!-- Event Name -->
        <!-- Note: Full-width first row simplifies top-margin on mobile -->
        <div class="flex px-3 w-full">
          <div class="flex-grow">
            <label
              class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
              for="event-name"
            >
              {{ $t('eventNameLabel') }}
            </label>
            <input
              id="event-name"
              v-model="form.name"
              class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none leading-tight px-4 py-3 rounded text-brand-black-700 w-full"
              type="text"
              :placeholder="$t('eventNamePlaceholder')"
              maxlength="50"
            >
          </div>
          <div
            class="flex-none font-mono mb-2.5 mt-auto px-3 text-gray-400 text-md"
          >
            {{ form.name.length }}/50
          </div>
        </div>

        <!-- Website -->
        <div
          v-if="isShare"
          class="md:w-1/2 mt-6 px-3 w-full"
        >
          <label
            class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
            for="event-url"
          >
            {{ $t('eventWebsiteLabel') }}
          </label>
          <input
            id="event-url"
            v-model="form.website"
            class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none leading-tight px-4 py-3 rounded text-brand-black-700 w-full"
            type="url"
            :placeholder="$t('eventWebsitePlaceholder')"
          >
        </div>

        <!-- Topics -->
        <div
          v-if="isShare"
          class="md:w-1/2 mt-6 px-3 w-full"
        >
          <label
            class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
            for="event-topics"
          >
            {{ $t('eventTopicsLabel') }}
          </label>
          <input
            id="event-topics"
            v-model="form.topics"
            class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none leading-tight px-4 py-3 rounded text-brand-black-700 w-full"
            type="text"
            :placeholder="$t('eventTopicsPlaceholder')"
          >
        </div>

        <!-- Date -->
        <div
          v-if="isShare"
          class="md:w-1/2 mt-6 px-3 w-full"
        >
          <label
            class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
            for="date"
          >
            {{ $t('eventDateLabel') }}
          </label>
          <input
            id="date"
            v-model="form.date"
            class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none leading-tight px-4 py-3 rounded text-brand-black-700 w-full"
            type="date"
          >
        </div>

        <!-- Time Start -->
        <div
          v-if="isShare"
          class="md:w-1/4 mt-6 px-3 w-full"
        >
          <label
            class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
            for="time-start"
          >
            {{ $t('eventTimeStartLabel') }}
          </label>
          <input
            id="time-start"
            v-model="form.timeStart"
            class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none leading-tight px-4 py-3 rounded text-brand-black-700 w-full"
            type="time"
          >
        </div>

        <!-- Time End -->
        <div
          v-if="isShare"
          class="md:w-1/4 mt-6 px-3 w-full"
        >
          <label
            class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
            for="time-end"
          >
            {{ $t('eventTimeEndLabel') }}
          </label>
          <input
            id="time-end"
            v-model="form.timeEnd"
            class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none leading-tight px-4 py-3 rounded text-brand-black-700 w-full"
            type="time"
          >
        </div>

        <!-- Location -->
        <div
          v-if="isShare"
          class="md:w-1/4 mt-6 px-3 w-full"
        >
          <label
            class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
            for="location"
          >
            {{ $t('eventLocationLabel') }}
          </label>
          <select
            id="location"
            v-model="form.location"
            class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none leading-tight px-4 py-3 rounded text-brand-black-700 w-full"
            placeholder="blah"
          >
            <option value="">
              {{ $t('eventLocationPlaceholder') }}
            </option>
            <option value="online">
              {{ $t('eventLocationOnline') }}
            </option>
            <option value="phitsanulok">
              {{ $t('eventLocationPhitsanulok') }}
            </option>
            <option value="bangkok">
              {{ $t('eventLocationBangkok') }}
            </option>
            <option value="other">
              {{ $t('eventLocationOther') }}
            </option>
          </select>
        </div>

        <!-- Venue -->
        <div
          v-if="isShare"
          class="md:w-3/4 mt-6 px-3 w-full"
        >
          <label
            class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
            for="location-map"
          >
            {{ $t('eventLocationVenueLabel') }}
          </label>
          <input
            id="location-map"
            v-model="form.locationVenue"
            class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none leading-tight px-4 py-3 rounded text-brand-black-700 w-full"
            type="text"
            :placeholder="$t('eventLocationVenuePlaceholder')"
          >
        </div>

        <hr
          v-if="isShare"
          class="border border-brand-blue-900 mt-8 mx-3 w-full"
        >

        <div
          v-if="isPropose"
          class="mt-6 px-3 w-full"
        >
          <label
            class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
            for="notes"
          >
            {{ $t('eventDescriptionRequestsLabel') }}
          </label>
          <textarea
            id="notes"
            v-model="form.description"
            class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none h-32 px-4 py-3 rounded text-brand-black-700 w-full"
            type="text"
            :placeholder="$t('eventDescriptionRequestsPlaceholder')"
          />
        </div>

        <!-- Name -->
        <div class="md:w-1/2 mt-6 px-3 w-full">
          <label
            class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
            for="contact-name"
          >
            {{ $t('eventContactNameLabel') }}
          </label>
          <input
            id="contact-name"
            v-model="form.contactName"
            class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none leading-tight px-4 py-3 rounded text-brand-black-700 w-full"
            type="text"
            placeholder="Charles Allen"
          >
        </div>

        <!-- Contact -->
        <div class="md:w-1/2 mt-6 px-3 w-full">
          <label
            class="block font-bold py-2 text-brand-black-700 text-xs tracking-wide uppercase"
            for="contact-id"
          >
            {{ $t('eventContactIdLabel') }}
          </label>
          <input
            id="contact-id"
            v-model="form.contactId"
            class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 focus:outline-none leading-tight px-4 py-3 rounded text-brand-black-700 w-full"
            type="text"
            placeholder="LINE: @yourlineid"
          >
        </div>

        <div class="mt-8 px-3 w-full">
          <button
            type="submit"
            class="bg-brand-blue-600 block border border-transparent disabled:bg-gray-300 disabled:cursor-wait disabled:opacity-50 disabled:text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2 font-semibold hover:bg-brand-blue-700 justify-center mb-2 px-10 py-2 rounded-md shadow-sm text-sm text-white tracking-wide uppercase w-full"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">{{ $t('submitLabelSubmitting') }}</span>
            <span v-else>{{ $t('submitLabel') }}</span>
          </button>
        </div>
      </div>
    </form>

    <div
      v-if="isConfirming"
      class="absolute bg-black bottom-0 left-0 opacity-50 right-0 top-0"
      @click="isConfirming = false"
    />

    <div
      v-if="isConfirming"
      class="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 transform"
      @click="isConfirming = false"
    >
      <div
        class="bg-brand-blue-100 border border-brand-blue-400 pl-4 pr-4 py-3 rounded"
        role="alert"
      >
        <p class="font-bold text-brand-blue-900">
          Thank you!
        </p>
        <p class="text-black-400">
          Your submission was received successfully
        </p>
        <svg
          class="absolute fill-current h-5 right-1 text-brand-blue-600 top-1.5 w-5"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
