export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: "Sadman's Blog",
  DESCRIPTION:
    'Sometimes boring explorations into a world of software and beyond.',
  EMAIL: 'sadman.hossain@mail.utoronto.ca',
  NUM_POSTS_ON_HOMEPAGE: 5,
  POSTS_PER_PAGE: 15,
  SITEURL: process.env.NODE_ENV === 'development' ? 'http://localhost:1234' : 'https://sadman.ca',
}

export const NAV_LINKS: Link[] = [
  { href: '/posts', label: 'posts' },
  { href: '/tags', label: 'tags' },
  { href: '/projects', label: 'projects' },
  { href: '/about', label: 'about' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/sadmanca', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/sadmanca', label: 'LinkedIn' },
  { href: 'sadman.hossain@mail.utoronto.ca', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
