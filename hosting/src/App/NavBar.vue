<script src="./NavBar.tsx" lang="ts"></script>

<template>
  <nav class="bg-brand-black">
    <div class="max-w-7xl mx-auto">
      <div class="flex h-16 items-center justify-between relative">
        <div class="absolute flex inset-y-0 items-center left-0 sm:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="focus:outline-none hover:bg-brand-black-400 hover:text-white inline-flex items-center justify-center ml-2 p-2 rounded-md text-gray-400"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="toggleCollapse"
          >
            <span class="sr-only">Open main menu</span>
            <!--
              Icon when menu is closed.
              Heroicon name: outline/menu
            -->
            <svg
              ref="menuClosedIcon"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!--
              Icon when menu is open.
              Heroicon name: outline/x
            -->
            <svg
              ref="menuOpenIcon"
              class="h-6 hidden w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <router-link
            :to="{name: 'Home'}"
            class="flex flex-shrink-0 h-16 items-center px-5 sm:hover:bg-brand-black-400"
          >
            <img
              class="block h-10 sm:hidden w-auto"
              src="@assets/logo-small.png"
              alt="Phits Tech"
            >
            <img
              class="h-8 hidden sm:block w-auto"
              src="@assets/logo-on-dark.png"
              alt="Phits Tech"
            >
          </router-link>

          <div class="hidden my-auto sm:block sm:ml-2">
            <div class="flex md:space-x-2 space-x-0">
              <router-link
                :to="{name: 'Events'}"
                class="hover:bg-brand-black-400 hover:text-white md:text-base px-3 py-2 rounded-md text-gray-300 text-sm"
              >
                Events
              </router-link>
              <router-link
                :to="{name: 'Spaces'}"
                class="hover:bg-brand-black-400 hover:text-white md:text-base px-3 py-2 rounded-md text-gray-300 text-sm"
              >
                Spaces
              </router-link>
              <router-link
                :to="{name: 'Heroes'}"
                class="hover:bg-brand-black-400 hover:text-white md:text-base px-3 py-2 rounded-md text-gray-300 text-sm"
              >
                Heroes
              </router-link>
              <a
                href="https://otap.phits.tech"
                class="hover:bg-brand-black-400 hover:text-white md:text-base px-3 py-2 rounded-md text-gray-300 text-sm"
              >
                Accelerator
                <svg
                  class="h-4 inline mb-0.5 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                  />
                  <path
                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          class="absolute flex inset-y-0 items-center right-0 sm:inset-auto sm:static"
        >
          <p
            class="bg-brand-black cursor-pointer flex h-10 hover:bg-brand-black-400 hover:text-white items-center justify-center md:text-base rounded-md select-none sm:mr-2.5 sm:text-sm text-gray-300 uppercase w-10"
            @click="toggleLocale"
          >
            <span>{{ otherLocale }}</span>
          </p>

          <router-link
            :to="{name: 'EventsCreate'}"
            class="flex h-10 hover:bg-brand-black-400 hover:ring-opacity-100 hover:text-white items-center mr-2 px-2 ring-brand-blue-900 ring-opacity-60 rounded-md sm:bg-brand-blue-300 sm:hover:bg-brand-blue-200 sm:hover:text-brand-black-900 sm:mr-4 sm:px-2.5 sm:ring-2 sm:text-brand-black-800 text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M12,12L8,16H11V22H13V16H16M19,4H18V2H16V4H8V2H6V4H5A2,2 0 0,0 3,6V20A2,2 0 0,0 5,22H9V20H5V9H19V20H15V22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4Z"
              />
            </svg>
            <span class="hidden md:text-base pl-1.5 pr-0.5 sm:block text-sm">
              Add an event
            </span>
          </router-link>

          <!-- Profile dropdown -->
          <!--
            <div class="ml-3 relative">
            <div>
            <button
            type="button"
            class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu"
            aria-expanded="false"
            aria-haspopup="true"
            >
            <span class="sr-only">Open user menu</span>
            <img
            class="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            />
            </button>
            </div>
          -->

          <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
          -->
          <!--
            <div
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
            >
            <a
            href="#"
            class="block px-4 py-2 text-sm text-brand-black-700 hover:bg-gray-100"
            role="menuitem"
            >Your Profile</a
            >
            <a
            href="#"
            class="block px-4 py-2 text-sm text-brand-black-700 hover:bg-gray-100"
            role="menuitem"
            >Settings</a
            >
            <a
            href="#"
            class="block px-4 py-2 text-sm text-brand-black-700 hover:bg-gray-100"
            role="menuitem"
            >Sign out</a
            >
            </div>
            </div>
          -->
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div
      ref="mobileMenu"
      class="hidden sm:hidden"
    >
      <div class="pb-2 px-2 space-y-1">
        <router-link
          :to="{name: 'Events'}"
          class="block font-medium hover:bg-brand-black-400 hover:text-white px-3 py-2 rounded-md text-base text-gray-300"
          @click="$router.push({name: 'Events'}), toggleCollapse()"
        >
          Events
        </router-link>
        <router-link
          :to="{name: 'Spaces'}"
          class="block font-medium hover:bg-brand-black-400 hover:text-white px-3 py-2 rounded-md text-base text-gray-300"
          @click="$router.push({name: 'Spaces'}), toggleCollapse()"
        >
          Spaces
        </router-link>
        <router-link
          :to="{name: 'Heroes'}"
          class="block font-medium hover:bg-brand-black-400 hover:text-white px-3 py-2 rounded-md text-base text-gray-300"
          @click="$router.push({name: 'Heroes'}), toggleCollapse()"
        >
          Heroes
        </router-link>
        <a
          href="https://otap.phits.tech"
          class="block font-medium hover:bg-brand-black-400 hover:text-white px-3 py-2 rounded-md text-base text-gray-300"
        >
          Accelerator
          <svg
            class="h-4 inline mb-0.5 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
            />
            <path
              d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
            />
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>
