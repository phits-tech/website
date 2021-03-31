import dayjs, { Dayjs } from 'dayjs'
import { Vue } from 'vue-class-component'

interface Banner { src: string }
interface Event { id: string, name: string, dateStart: Dayjs, dateEnd: Dayjs, time: string, location: string }
interface DayAndEvent { day: string, events: Event[] }

export default class Home extends Vue {
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
      { src: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec' },
      { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998' },
      { src: 'https://images.unsplash.com/photo-1507361617237-221d9f2c84f7' },
      { src: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06' }
    ]
  }

  get sevenDaysAhead(): DayAndEvent[] {
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
    setInterval(this.nextSlide, 3000)
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
