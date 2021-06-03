import { Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '~/router/route-decorator'

@Route({ name: 'HeroesWhy', path: '/heroes-why' })
export default class HeroesWhy extends Vue {
  meta = useMeta({ title: 'Why Be a Hero?' })
}
