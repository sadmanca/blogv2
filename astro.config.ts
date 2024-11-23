import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import sectionize from '@hbsnow/rehype-sectionize'

import icon from 'astro-icon'

import partytown from '@astrojs/partytown'
import { imageService } from "@unpic/astro/service";

// https://astro.build/config
export default defineConfig({
  site: 'https://sadman.ca',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    react(),
    icon(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  image: {
    service: imageService({
      placeholder: "blurhash",
      layout: "constrained",
    }),
  },
  redirects: {
    '/uoft-pey-coop-jobs-2023': '/uoft-pey-coop-jobs-2023.html',
    '/uoft-work-study-2024': '/uoft-work-study-2024.html',
    '/uoft-work-study-jobs-2024': '/uoft-work-study-2024.html',

    '/blog/on-keeping-a-journal': '/posts/on-keeping-a-journal',
    '/blog/coming-up-with-good-ideas': '/posts/coming-up-with-good-ideas',
    '/blog/how-i-deal-with-email': '/posts/how-i-deal-with-email',
    '/blog/why-i-use-trello': '/posts/why-i-use-trello',
    '/blog/a-guide-to-learning': '/posts/a-guide-to-learning/',
    '/blog/my-old-vs-code-setup': '/posts/my-old-vs-code-setup/',
    '/blog/advice-for-high-school-freshmen': '/posts/advice-for-high-school-freshmen/',
    '/blog/analyzing-pey-postings-part-1': '/posts/analyzing-pey-postings-part-1/',
    '/blog/software-showcase-01-asciinema': '/posts/software-showcase-01-asciinema/',
    '/blog/how-to-put-20k+-words-on-a-cheatsheet': '/posts/how-to-put-20k+-words-on-a-cheatsheet/',
    '/blog/work-study-at-uoft': '/posts/work-study-at-uoft/',
    '/blog/pey-coop-jobs-at-uoft': '/posts/pey-coop-jobs-at-uoft/',

    '/categories': '/tags',
    '/archives': '/posts',
    '/blog': '/posts',
  },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
      // @ts-expect-error
      sectionize,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light-high-contrast',
            dark: 'github-dark-high-contrast',
          },
          transformers: [
            transformerNotationDiff(),
            transformerMetaHighlight(),
            transformerCopyButton({
              visibility: 'hover',
              feedbackDuration: 1000,
            }),
          ],
        },
      ],
    ],
    remarkPlugins: [remarkToc, remarkMath, remarkEmoji],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
})