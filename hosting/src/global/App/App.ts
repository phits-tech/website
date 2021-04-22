import { Options, setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import NavBar from './NavBar/NavBar.vue'

@Options({ components: { NavBar } })
export default class App extends Vue {
  meta = setup(() => useMeta({
    title: '', // default is just `Phits.Tech`
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  }))
}
