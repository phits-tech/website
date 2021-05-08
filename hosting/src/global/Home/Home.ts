import dayjs, { Dayjs } from 'dayjs'
import { Vue } from 'vue-class-component'

import { Banner, BANNERS } from '@phits-tech/common/dist/dao-firestore'

import { EventUi } from '@/events/models'
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
    // Banners
    const bannerSnapshot = await db.collection(BANNERS).where('dateExpire', '>', new Date()).get()
    this.banners = bannerSnapshot.docs.map(doc => doc.data() as Banner)
    this.resetSlideTimer() // must be called after banner query
  }

  beforeUnmount(): void {
    this.stopSlideTimer()
  }

  stopSlideTimer(): void {
    if (this.nextSlideInterval) clearInterval(this.nextSlideInterval)
  }

  resetSlideTimer(): void {
    this.stopSlideTimer()
    if (this.banners.length > 1) this.nextSlideInterval = setInterval(this.nextSlide, 5000)
  }

  nextSlide(): void {
    if (this.banners.length < 2) return

    const activeSlide = document.querySelector('.slide.translate-x-0')
    if (activeSlide === null) return // no slides

    const nextSlide = activeSlide.nextElementSibling
    if (nextSlide === null || !nextSlide.classList.contains('slide')) {
      // Return to start...
      const firstSlide = activeSlide.parentElement?.querySelector('.slide') ?? null
      if (firstSlide === null) return

      // Old => Exit to right
      activeSlide.classList.remove('translate-x-0')
      activeSlide.classList.add('translate-x-full')

      // New => Enter from left
      firstSlide.classList.remove('-translate-x-full')
      firstSlide.classList.add('translate-x-0')

      // Waiting => Ready to move on from right
      const otherSlides = document.querySelectorAll('.slide.-translate-x-full')
      otherSlides.forEach(element => {
        element.classList.remove('-translate-x-full')
        element.classList.add('translate-x-full')
      })
    } else {
      // Old => Exit to left
      activeSlide.classList.remove('translate-x-0')
      activeSlide.classList.add('-translate-x-full')

      // New => Enter from right
      nextSlide.classList.remove('translate-x-full')
      nextSlide.classList.add('translate-x-0')
    }
  }

  previousSlide(): void {
    if (this.banners.length < 2) return

    const activeSlide = document.querySelector('.slide.translate-x-0')
    if (activeSlide === null) return // no slides

    const previousSlide = activeSlide.previousElementSibling
    if (previousSlide === null || !previousSlide.classList.contains('slide')) {
      // Return to end...
      const allSlides = activeSlide.parentElement?.querySelectorAll('.slide') ?? []
      const lastSlide = allSlides.length > 0 ? allSlides[allSlides.length - 1] : null
      if (lastSlide === null) return

      // Old => Exit to left
      activeSlide.classList.remove('translate-x-0')
      activeSlide.classList.add('-translate-x-full')

      // New => Enter from right
      lastSlide.classList.remove('translate-x-full')
      lastSlide.classList.add('translate-x-0')

      // Waiting => Ready to move on from left
      const otherSlides = document.querySelectorAll('.slide.translate-x-full')
      otherSlides.forEach(element => {
        element.classList.remove('translate-x-full')
        element.classList.add('-translate-x-full')
      })
    } else {
      // Old => Exit to right
      activeSlide.classList.remove('translate-x-0')
      activeSlide.classList.add('translate-x-full')

      // New => Enter from left
      previousSlide.classList.remove('-translate-x-full')
      previousSlide.classList.add('translate-x-0')
    }
  }

  async bannerClick(banner: Banner): Promise<unknown> {
    if (banner.targetEventSlug !== undefined) return await this.$router.push({ name: 'Event', params: { slug: banner.targetEventSlug } })
    if (banner.targetRoute !== undefined) return await this.$router.push({ name: banner.targetRoute })
    if (banner.targetUrl !== undefined) window.location.href = banner.targetUrl
  }
}
