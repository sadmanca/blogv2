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
  EMAIL: 'm.sadman.h@gmail.com',
  NUM_POSTS_ON_HOMEPAGE: 25,
  POSTS_PER_PAGE: 50,
  SITEURL: process.env.NODE_ENV === 'development' ? 'http://localhost:1234' : 'https://blogv2-brs.pages.dev',
}

export const NAV_LINKS: Link[] = [
  { href: '/blog', label: 'blog' },
  { href: '/tags', label: 'tags' },
  { href: '/projects', label: 'projects' },
  { href: '/about', label: 'about' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/sadmanca', label: 'GitHub' },
  { href: 'https://twitter.com/sadmanca', label: 'Twitter' },
  { href: 'm.sadman.h@gmail.com', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]