import { setup, Vue } from 'vue-class-component'
import { useMeta } from 'vue-meta'

import { Route } from '@/router/route-decorator'

@Route({ name: 'Spaces', path: '/spaces' })
export default class Spaces extends Vue {
  meta = setup(() => useMeta({ title: 'Spaces' }))
  spaces = [
    {},
    {},
    {},
    {
      name: 'Maker Club, NU',
      logo: '',
      banner: 'https://images.unsplash.com/photo-1585980243496-fe29a36bd382',
      spaceType: 'community'
    }
  ]
}
