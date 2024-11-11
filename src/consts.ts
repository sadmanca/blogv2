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
  NUM_POSTS_ON_HOMEPAGE: 5,
  POSTS_PER_PAGE: 10,
  SITEURL: 'https://astro-erudite.vercel.app',
}

export const NAV_LINKS: Link[] = [
  { href: '/blog', label: 'blog' },
  { href: '/authors', label: 'authors' },
  { href: '/about', label: 'about' },
  { href: '/tags', label: 'tags' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/sadmanca', label: 'GitHub' },
  { href: 'https://twitter.com/sadmanca', label: 'Twitter' },
  { href: 'm.sadman.h@gmail.com', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
