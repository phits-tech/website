import { Options, setup, Vue } from 'vue-class-component'
import { useActiveMeta, useMeta } from 'vue-meta'

import NavBar from '@/views/Global/NavBar.vue'

@Options({ components: { NavBar } })
export default class App extends Vue {
  meta = setup(() => {
    useMeta({
      title: '', // default is just `Phits.Tech`
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    })
    return { metadata: useActiveMeta() }
  })
}
