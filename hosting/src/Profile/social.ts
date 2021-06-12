import { UserSocialAccount } from '@phits-tech/common/dist/dao-firestore'

export const socialRanking: Record<UserSocialAccount, number> = {
  github: 0,
  gitlab: 1,
  stackoverflow: 2,
  linkedin: 3,
  twitter: 4,
  facebook: 5,
  line: 6,
  email: 7
}

export const getSocialUrl = ([network, id]: [UserSocialAccount, string]): string => {
  switch (network) {
    case 'github': return `https://github.com/${id}`
    case 'gitlab':return `https://gitlab.com/${id}`
    case 'stackoverflow': return `https://stackoverflow.com/users/${id}`
    case 'linkedin':return `https://www.linkedin.com/in/${id}/`
    case 'twitter':return `https://twitter.com/${id}`
    case 'facebook':return `https://www.facebook.com/${id}`
    case 'line':return `https://line.me/R/ti/p/@${id}`
    case 'email':return `mailto:${id}`
  }
}
