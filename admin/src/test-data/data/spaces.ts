import { Space } from '@phits-tech/common/dao-firestore'

export const spaces: Space[] = [
  {
    slug: 'maker-club-nu',
    name: 'Maker Club, NU',
    description: {
      en: 'A lab for working on hardware, IoT, Arduino and other engineering projects.',
      th: 'ห้องปฏิบัติการสำหรับทำงานเกี่ยวกับ hardware, IoT, Arduino และโครงการวิศวกรรมอื่น ๆ'
    },
    banner: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/spaces/maker-club-nu-banner.jpg',
    logo: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/spaces/maker-club-nu-logo.jpg',
    category: 'community',
    locationText: '4th floor SC2, Naresuan University',
    locationLatitude: 16.742_235_085_922_57,
    locationLongitude: 100.193_572_537_988_8
  },
  {
    slug: 'setic-nu',
    name: 'SET Investment Center, NU',
    description: {
      en: 'A co-working space for individuals and groups, supported by Stock Exchange of Thailand. Also has a selection of boardgames!',
      th: 'พื้นที่ทำงานร่วมกันสำหรับบุคคลและกลุ่มที่ได้รับการสนับสนุนจากตลาดหลักทรัพย์แห่งประเทศไทย นอกจากนี้ยังมีเกมกระดานให้เลือกอีกด้วย'
    },
    banner: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/spaces/setic-nu-banner.jpg',
    logo: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/spaces/setic-nu-logo.jpg',
    category: 'coworking',
    locationText: 'Near BEC, Naresuan University',
    locationLatitude: 16.748_156_316_592_908,
    locationLongitude: 100.196_996_297_037_84
  },
  {
    slug: 'usit-nu',
    name: 'USIT, NU',
    description: {
      en: 'A coffee shop and small co-working space behind Engineering.',
      th: 'ร้านกาแฟและพื้นที่ทำงานร่วมกันขนาดเล็กด้านหลังวิศวกรรม'
    },
    banner: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/spaces/usit-nu-banner.jpg',
    logo: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/spaces/usit-nu-logo.jpg',
    category: 'cafe',
    locationText: 'Near Engineering, Naresuan University',
    locationLatitude: 16.744_032_818_990_863,
    locationLongitude: 100.195_160_148_854_64
  },
  {
    slug: 'pt-discord',
    name: 'PT Discord',
    description: {
      en: 'A virtual meeting place to learn and socialize with the tech community in Phitsanulok.',
      th: 'สถานที่พบกันเสมือนจริงเพื่อเรียนรู้และสังสรรค์กับชุมชนเทคโนโลยีในพิษณุโลก'
    },
    banner: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/spaces/discord-banner.png',
    logo: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/spaces/phits-tech-logo.png',
    category: 'online',
    locationText: 'https://discord.gg/4CHb53F'
  },
  {
    slug: 'pt-youtube',
    name: 'PT YouTube',
    description: {
      en: 'A place to re-live streamed events run by Phits Tech.',
      th: 'สถานที่สำหรับถ่ายทอดสดกิจกรรมที่ดำเนินการโดย Phits Tech'
    },
    banner: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/spaces/youtube-banner.png',
    logo: 'https://storage.googleapis.com/phits-tech-emu.appspot.com/spaces/phits-tech-logo.png',
    category: 'online',
    locationText: 'https://www.youtube.com/channel/UC83wlCFD2-FOYxSUzVG-oUg'
  }
]
