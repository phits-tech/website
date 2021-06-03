import { LocaleMessages } from '@intlify/core-base'
import { mapValues } from 'lodash'
import { VueMessageType } from 'vue-i18n'

import { TranslatedString } from '@phits-tech/common/dao-firestore'

const translations: { [key: string]: TranslatedString } = {
  becomeHeroTitle: {
    en: 'Become a Hero',
    th: 'การเป็นฮีโร่'
  },
  becomeHeroText: {
    en: 'The {linkCommunityHero} award is Phits.Tech\'s way to recognize and thank individuals for their contributions to our community. Every hour engaged in community events earns {boldCcus} (Community Contribution Units). The easiest way to become a Community Hero is to volunteer to run an event. Learn more about the {linkBenefits}, or get started now:',
    th: 'รางวัล {linkCommunityHero} คือวิธีของ Phis.Tech ในการยกย่องและขอบคุณบุคคลต่างๆ ที่มีส่วนร่วมกับชุมชนของเรา ทุก ๆ ชั่วโมงที่มีส่วนร่วมในกิจกรรมชุมชนจะได้รับ {boldCcus} (Community Contribution Units) วิธีที่ง่ายที่สุดในการเป็นฮีโร่ชุมชนคือการอาสาจัดกิจกรรม เรียนรู้เพิ่มเติมเกี่ยวกับ {linkBenefits} หรือเริ่มต้นตอนนี้:'
  },
  becomeHeroTextBenefits: {
    en: 'benefits of becoming a hero',
    th: 'ประโยชน์ของการเป็นฮีโร่'
  },
  yourContribution: {
    en: 'Your contribution',
    th: 'ผลงานของคุณ'
  },
  hallOfFame: {
    en: 'Hall of Fame',
    th: 'หอเกียรติยศ'
  },
  latestEvent: {
    en: 'Last event',
    th: 'เหตุการณ์ล่าสุด'
  }
}

export const messages: LocaleMessages<VueMessageType> = {
  en: mapValues(translations, vals => vals.en),
  th: mapValues(translations, vals => vals.th)
}
