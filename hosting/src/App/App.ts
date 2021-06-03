import { Options, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import NavBar from './NavBar.vue'
import { messages } from './translations-app'

@Options({
  components: { NavBar },
  i18n: { messages }
})
export default class App extends Vue {
  meta = useMeta({
    title: '', // default is just `Phits.Tech`
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  })
}
