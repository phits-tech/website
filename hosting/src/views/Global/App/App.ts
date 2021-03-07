import { Options, Vue } from 'vue-class-component'

import NavBar from '../NavBar/NavBar.vue'

@Options({
  metaInfo: {
    title: 'Welcome',
    titleTemplate: '%s | Phits.Tech'
  },
  components: { NavBar }
})
export default class App extends Vue {}
