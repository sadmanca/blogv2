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

import playformInline from '@playform/inline';

// https://astro.build/config
export default defineConfig({
  site: 'https://sadman.ca',
  integrations: [tailwind({
    applyBaseStyles: false,
  }), sitemap(), mdx(), react(), icon(), partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  }), playformInline()],
  image: {
    service: imageService({
      placeholder: "blurhash",
      layout: "fixed",
    }),
  },
  redirects: {
    '/uoft-pey-coop-jobs-2023': '/uoft-pey-coop-jobs-2023.html',
    '/uoft-work-study-2024': '/uoft-work-study-2024.html',

    '/posts/on-keeping-a-journal': '/blog/on-keeping-a-journal',
    '/posts/coming-up-with-good-ideas': '/blog/coming-up-with-good-ideas',
    '/posts/how-i-deal-with-email': '/blog/how-i-deal-with-email',
    '/posts/why-i-use-trello': '/blog/why-i-use-trello',
    '/posts/a-guide-to-learning/': '/blog/a-guide-to-learning',
    '/posts/my-old-vs-code-setup/': '/blog/my-old-vs-code-setup',
    '/posts/advice-for-high-school-freshmen/': '/blog/advice-for-high-school-freshmen',
    '/posts/analyzing-pey-postings-part-1/': '/blog/analyzing-pey-postings-part-1',
    '/posts/software-showcase-01-asciinema/': '/blog/software-showcase-01-asciinema',
    '/posts/how-to-put-20k+-words-on-a-cheatsheet/': '/blog/how-to-put-20k+-words-on-a-cheatsheet',
    '/posts/work-study-at-uoft/': '/blog/work-study-at-uoft',
    '/posts/pey-coop-jobs-at-uoft/': '/blog/pey-coop-jobs-at-uoft',

    '/categories': '/tags',
    '/archives': '/blog',
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