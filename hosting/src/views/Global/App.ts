import { Options, Vue } from 'vue-class-component'

import NavBar from '@/views/Global/NavBar.vue'

@Options({
  metaInfo: {
    title: 'Welcome',
    titleTemplate: '%s | Phits.Tech'
  },
  components: { NavBar }
})
export default class App extends Vue {}
