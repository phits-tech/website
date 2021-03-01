import { Options, Vue } from 'vue-class-component'

@Options({
  metaInfo: {
    title: 'Welcome',
    titleTemplate: '%s | Phits.Tech'
  }
})
export default class App extends Vue {}
