<script lang="ts">
import { Vue } from 'vue-class-component'

import { capitalize } from '@phits-tech/common/dist/utils/string-cases/capitalize'

import { Route } from '@/router/route-decorator'

@Route({ path: '/:catchAllSegments(.*)', priority: -1000 })
export default class NotFound extends Vue.with(class {
  item!: string
}) {
  get itemCapitalized(): string { return capitalize(this.item) }
}
</script>

<template>
  <div class="block">
    <span v-if="item">{{ itemCapitalized }}</span>
    <span v-else>Page</span>
    not found.
  </div>
</template>
