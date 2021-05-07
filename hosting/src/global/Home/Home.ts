import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { Vue } from 'vue-class-component'

import type { Banner } from '@phits-tech/common/dao-firestore'
import { BANNERS } from '@phits-tech/common/dao-firestore'

import type { EventUi } from '@/events/models'
import { db } from '~/firebase-initialized'
import { Route } from '~/router/route-decorator'

interface EventSummary { slug: string, name: string, dateStart: Dayjs, dateEnd: Dayjs, location: string }
interface DayAndEvents { day: string, events: EventSummary[] }

@Route({ path: '/' })
export default class Home extends Vue {
  nextSlideInterval: NodeJS.Timeout | null = null
  banners: Banner[] = []

  get sevenDaysAhead(): DayAndEvents[] {
    const events: EventUi[] = this.$store.getters.events
    const startOfDayLocal = dayjs().startOf('day')

    return Array.from({ length: 7 }, (_, i) => {
      const day = startOfDayLocal.add(i, 'day')
      return {
        day: (i === 0) ? 'Today' : (i === 1) ? 'Tomorrow' : day.format('ddd'),
        events: events.filter(e => day.isBefore(e.dateStart) && day.add(1, 'day').isAfter(e.dateStart))
      }
    })
  }

  async mounted(): Promise<void> {
    this.resetSlideTimer()
    this.banners = (await db.collection(BANNERS).where('dateExpire', '>', new Date()).get())
      .docs
      .map(doc => doc.data() as Banner)
  }

  beforeUnmount(): void {
    this.clearSlideTimer()
  }

  clearSlideTimer(): void {
    if (this.nextSlideInterval) clearInterval(this.nextSlideInterval)
  }

  resetSlideTimer(): void {
    this.clearSlideTimer()
    this.nextSlideInterval = setInterval(this.nextSlide, 5000)
  }

  nextSlide(): void {
    const activeSlide = document.querySelector('.slide.translate-x-0')
    if (activeSlide === null) return
    let nextSlide = activeSlide.nextElementSibling
    if (nextSlide === null || !nextSlide.classList.contains('slide')) {
      nextSlide = activeSlide.parentElement?.querySelector('.slide') ?? null
      if (nextSlide === null) return
      activeSlide.classList.remove('translate-x-0')
      activeSlide.classList.add('translate-x-full')
      nextSlide.classList.remove('-translate-x-full')
      nextSlide.classList.add('translate-x-0')
      const otherSlides = document.querySelectorAll('.slide.-translate-x-full')
      otherSlides.forEach(element => {
        element.classList.remove('-translate-x-full')
        element.classList.add('translate-x-full')
      })
    } else {
      activeSlide.classList.remove('translate-x-0')
      activeSlide.classList.add('-translate-x-full')
      nextSlide.classList.remove('translate-x-full')
      nextSlide.classList.add('translate-x-0')
    }

    this.resetSlideTimer()
  }

  // TODO: This should wrap-around left
  previousSlide(): void {
    const activeSlide = document.querySelector('.slide.translate-x-0')
    const previousSlide = activeSlide?.previousElementSibling
    if (activeSlide === null || previousSlide === null || previousSlide === undefined) return
    activeSlide.classList.remove('translate-x-0')
    activeSlide.classList.add('translate-x-full')
    previousSlide.classList.remove('-translate-x-full')
    previousSlide.classList.add('translate-x-0')

    this.resetSlideTimer()
  }

  async bannerClick(banner: Banner): Promise<unknown> {
    if (banner.targetEventSlug !== undefined) return await this.$router.push({ name: 'Event', params: { slug: banner.targetEventSlug } })
    if (banner.targetRoute !== undefined) return await this.$router.push({ name: banner.targetRoute })
    if (banner.targetUrl !== undefined) window.location.href = banner.targetUrl
  }
}
