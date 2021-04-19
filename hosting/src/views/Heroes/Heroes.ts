import { /* setup, */ Vue } from 'vue-class-component'

// import { useMeta } from 'vue-meta'
import { Route } from '@/router/route-decorator'

@Route({ name: 'Heroes', path: '/heroes' })
export default class Heroes extends Vue {
  // meta = setup(() => { useMeta({ title: 'Heroes' }) })
}
