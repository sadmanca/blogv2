import { defineCollection, z } from 'astro:content'
import { feedLoader } from "@ascorbic/feed-loader";
import xml2js from 'xml2js'

const goodreads_read_books = defineCollection({
  schema: z.object({
    id: z.string(),
    title: z.string(),
    shelves: z.array(z.string()),
    date_read: z.string(),
    rating: z.string(),
    author_name: z.string(),
    book_image_url: z.string(),
    book_id: z.string(),
  }),
  loader: async () => {
    const response = await fetch(`${import.meta.env.GOODREADS_URL}`);
    const data = await response.text();
    const result = await xml2js.parseStringPromise(data);
    const goodreads_read_books = result.rss.channel[0].item.map((item: any) => {
      const highResImageUrl = item.book_image_url[0]
        .replace(/\._[^.]+_/g, '') // remove any substring starting with "._" and ending with "_"
        .replace(/(\.\w+)$/, '._SX300_SY300_$1'); // add height and width size before the file extension

      return {
        id: item.book_id[0],
        title: item.title[0],
        shelves: item.user_shelves,
        date_read: item.user_read_at[0],
        rating: item.user_rating[0],
        author_name: item.author_name[0],
        book_image_url: highResImageUrl,
        book_id: item.book_id[0],
      };
    });

    return goodreads_read_books;
  }
});

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z
        .string()
        .max(
          100,
          'Title should be 60 characters or less for optimal Open Graph display.',
        ),
      description: z
        .string()
        .max(
          200,
          'Description should be 155 characters or less for optimal Open Graph display.',
        ),
      date: z.coerce.date(),
      image: image()
        .refine((img) => img.width === 1200 && img.height === 630, {
          message:
            'The image must be exactly 1200px × 630px for Open Graph requirements.',
        })
        .optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    full_name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.string(),
    bio: z.string().optional(),
    mail: z.string().email().optional(),
    website: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    bluesky: z.string().url().optional(),
    threads: z.string().url().optional(),
    mastodon: z.string().url().optional(),
    instagram: z.string().url().optional(),
    spotify: z.string().url().optional(),
    lastfm: z.string().url().optional(),
    goodreads: z.string().url().optional(),
    discord: z.string().url().optional(),
  }),
})

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      image: image().refine((img) => img.width === 1200 && img.height === 630, {
        message:
          'The image must be exactly 1200px × 630px for Open Graph requirements.',
      }),
      link: z.string().url(),
    }),
})

export const collections = { posts, authors, projects, goodreads_read_books }
