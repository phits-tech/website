import dayjs, { Dayjs } from 'dayjs'
import { Vue } from 'vue-class-component'

import { Route } from '@/router/route-decorator'

interface Banner { src: string, url?: string, eventId?: string, route?: string }
interface Event { id: string, name: string, dateStart: Dayjs, dateEnd: Dayjs, time: string, location: string }
interface DayAndEvents { day: string, events: Event[] }

@Route({ path: '/' })
export default class Home extends Vue {
  nextSlideInterval: NodeJS.Timeout | null = null

  events: Event[] = [
    {
      id: '456',
      name: 'Web Wednesdays',
      dateStart: dayjs('2021-03-31T18:00:00+07:00'),
      dateEnd: dayjs('2021-03-31T19:00:00+07:00'),
      time: '18:00-19:00',
      location: 'The Sandbox'
    },
    {
      id: '789',
      name: 'TypeScript is Awesome Wednesdays',
      dateStart: dayjs('2021-03-31T19:00:00+07:00'),
      dateEnd: dayjs('2021-03-31T20:00:00+07:00'),
      time: '19:00-20:00',
      location: 'The Sandbox'
    },
    {
      id: '654',
      name: 'Another event',
      dateStart: dayjs('2021-03-31T21:00:00+07:00'),
      dateEnd: dayjs('2021-03-31T22:00:00+07:00'),
      time: '21:00-22:00',
      location: 'The Sandbox'
    },
    {
      id: '123',
      name: 'Mobile Mondays',
      dateStart: dayjs('2021-04-05T19:00:00+07:00'),
      dateEnd: dayjs('2021-04-05T21:00:00+07:00'),
      time: '19:00-21:00',
      location: 'The Sandbox'
    }
  ]

  get banners(): Banner[] {
    return [
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/phits-tech.appspot.com/o/banners%2F79af5d39-aa69-4aaa-ad56-6ece7395c827.png?alt=media&token=ca130503-1b0b-41dd-87d1-4736b9aa3553',
        eventId: '1'
      },
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/phits-tech.appspot.com/o/banners%2F2c2fd102-91d1-4cee-8071-c035cef08ac2.jpg?alt=media&token=59df0bcf-38c4-41e8-acdc-411650b26d88',
        url: 'https://otap.phits.tech'
      }
    ]
  }

  async bannerClick(banner: Banner): Promise<unknown> {
    if (banner.eventId) return await this.$router.push({ name: 'Event', params: { eventId: banner.eventId } })
    if (banner.route) return await this.$router.push({ name: banner.route })
    if (banner.url) window.location.href = banner.url
  }

  get sevenDaysAhead(): DayAndEvents[] {
    const startOfDayLocal = dayjs().startOf('day')

    return Array.from({ length: 7 }, (x, i) => {
      const day = startOfDayLocal.add(i, 'day')
      return {
        day: (i === 0) ? 'Today' : (i === 1) ? 'Tomorrow' : day.format('ddd'),
        events: this.events.filter(e => day.isBefore(e.dateStart) && day.add(1, 'day').isAfter(e.dateStart))
      }
    })
  }

  mounted(): void {
    this.nextSlideInterval = setInterval(this.nextSlide, 5000)
  }

  beforeUnmount(): void {
    if (this.nextSlideInterval) clearInterval(this.nextSlideInterval)
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
  }

  previousSlide(): void {
    const activeSlide = document.querySelector('.slide.translate-x-0')
    const previousSlide = activeSlide?.previousElementSibling
    if (activeSlide === null || previousSlide === null || previousSlide === undefined) return
    activeSlide.classList.remove('translate-x-0')
    activeSlide.classList.add('translate-x-full')
    previousSlide.classList.remove('-translate-x-full')
    previousSlide.classList.add('translate-x-0')
  }
}
