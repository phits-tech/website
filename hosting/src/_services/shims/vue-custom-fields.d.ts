import * as filters from '~/filters'
import { td } from '~/i18n'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: typeof filters
    $td: typeof td
  }
}
