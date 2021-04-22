import dayjs, { Dayjs } from 'dayjs'
import { Vue } from 'vue-class-component'

import { EventUi } from '@/events/models'
import { Route } from '~/router/route-decorator'

interface Banner { src: string, url?: string, eventSlug?: string, route?: string }
interface EventSummary { slug: string, name: string, dateStart: Dayjs, dateEnd: Dayjs, location: string }
interface DayAndEvents { day: string, events: EventSummary[] }

@Route({ name: 'Home', path: '/' })
export default class Home extends Vue {
  nextSlideInterval: NodeJS.Timeout | null = null

  get banners(): Banner[] {
    return [
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/phits-tech.appspot.com/o/banners%2F79af5d39-aa69-4aaa-ad56-6ece7395c827.png?alt=media&token=ca130503-1b0b-41dd-87d1-4736b9aa3553',
        eventSlug: 'tech-clinic'
      },
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/phits-tech.appspot.com/o/banners%2F2c2fd102-91d1-4cee-8071-c035cef08ac2.jpg?alt=media&token=59df0bcf-38c4-41e8-acdc-411650b26d88',
        url: 'https://otap.phits.tech'
      }
    ]
  }

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

  mounted(): void {
    this.resetSlideTimer()
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
    if (banner.eventSlug) return await this.$router.push({ name: 'Event', params: { slug: banner.eventSlug } })
    if (banner.route) return await this.$router.push({ name: banner.route })
    if (banner.url) window.location.href = banner.url
  }
}
