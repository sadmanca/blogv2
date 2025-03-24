import { defineCollection, z } from 'astro:content'
import { RateLimiter } from 'limiter'
import { XMLParser } from 'fast-xml-parser'
import { goodreadsLoader } from 'astro-loader-goodreads';

const goodreads_read_books = defineCollection({
  loader: goodreadsLoader({
    url: import.meta.env.GOODREADS_URL,
    refreshIntervalDays: 1,
  })
});

const goodreads_user_updates = defineCollection({
  loader: goodreadsLoader({
    url: "https://www.goodreads.com/user/show/152185079-sadman-hossain",
    refreshIntervalDays: 1,
  })
});

const TRAKT_WATCHED_URL = `https://api.trakt.tv/users/sadmanca/watched`
const TRAKT_RATINGS_URL = `https://api.trakt.tv/users/sadmanca/ratings`
const TRAKT_CLIENT_ID = import.meta.env.TRAKT_CLIENT_ID
const TMDB_API_KEY = import.meta.env.TMDB_API_KEY

const limiter_trakt = new RateLimiter({ tokensPerInterval: 1, interval: 'second' })
const limiter_tmdb = new RateLimiter({ tokensPerInterval: 50, interval: 'second' })

async function fetchWithRetry(url: string, type: string, options = {}) {
  let response;
  let retries = 5;

  while (retries > 0) {
    if (type == 'trakt') {
      await limiter_trakt.removeTokens(1);
    } else {
      await limiter_tmdb.removeTokens(1);
    }
    response = await fetch(url, options);

    if (response.status !== 429) {
      return response;
    }

    retries -= 1;
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
  }

  throw new Error('Too many requests, please try again later.');
}

const trakt_watched_movies = defineCollection({
  schema: z.object({
    id: z.string(),
    title: z.string(),
    year: z.number(),
    rating: z.number(),
    last_watched_at: z.string(),
    poster: z.string(),
    imdb: z.string(),
  }),
  loader: async () => {
    const type = 'movie'
    const alt_type = 'movies'
    const alt_type2 = 'movie'
    
    const watchedResponse = await fetchWithRetry(`${TRAKT_WATCHED_URL}/${alt_type}`, "trakt", {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': TRAKT_CLIENT_ID,
      },
    });
    const watchedData = await watchedResponse.json();

    const ratingsResponse = await fetchWithRetry(`${TRAKT_RATINGS_URL}/${alt_type}`, "trakt", {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': TRAKT_CLIENT_ID,
      },
    });
    const ratingsData = await ratingsResponse.json();

    const ratings = ratingsData.reduce(
      (
        acc: { [x: string]: any },
        item: { [x: string]: { ids: { tmdb: string | number } }; rating: any },
      ) => {
        acc[item[type].ids.tmdb] = item.rating
        return acc
      },
      {},
    );

    const movies = await Promise.all(watchedData.map(async (item: any) => {
      const tmdbId = item[type].ids.tmdb;
      const image_api_request = `https://api.themoviedb.org/3/${alt_type2}/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`;

      const tmdbResponse = await fetchWithRetry(image_api_request, "tmdb");
      const tmdbData = await tmdbResponse.json();

      return {
        id: item[type].ids.imdb,
        title: item[type].title,
        year: item[type].year,
        rating: ratings[tmdbId] || 0,
        last_watched_at: item.last_watched_at,
        poster: `https://image.tmdb.org/t/p/w200${tmdbData.poster_path}`,
        imdb: item[type].ids.imdb
      };
    }));

    return movies;
  }
});

const trakt_watched_shows = defineCollection({
  schema: z.object({
    id: z.string(),
    title: z.string(),
    year: z.number(),
    rating: z.number(),
    last_watched_at: z.string(),
    poster: z.string(),
    imdb: z.string(),
  }),
  loader: async () => {
    const type = 'show'
    const alt_type = 'shows'
    const alt_type2 = 'tv'
    
    const watchedResponse = await fetchWithRetry(`${TRAKT_WATCHED_URL}/${alt_type}`, "trakt", {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': TRAKT_CLIENT_ID,
      },
    });
    const watchedData = await watchedResponse.json();

    const ratingsResponse = await fetchWithRetry(`${TRAKT_RATINGS_URL}/${alt_type}`, "trakt", {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': TRAKT_CLIENT_ID,
      },
    });
    const ratingsData = await ratingsResponse.json();

    const ratings = ratingsData.reduce(
      (
        acc: { [x: string]: any },
        item: { [x: string]: { ids: { tmdb: string | number } }; rating: any },
      ) => {
        acc[item[type].ids.tmdb] = item.rating
        return acc
      },
      {},
    );

    const shows = await Promise.all(watchedData.map(async (item: any) => {
      const tmdbId = item[type].ids.tmdb;
      const image_api_request = `https://api.themoviedb.org/3/${alt_type2}/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`;

      const tmdbResponse = await fetchWithRetry(image_api_request, "tmdb");
      const tmdbData = await tmdbResponse.json();

      return {
        id: item[type].ids.imdb,
        title: item[type].title,
        year: item[type].year,
        rating: ratings[tmdbId] || 0,
        last_watched_at: item.last_watched_at,
        poster: `https://image.tmdb.org/t/p/w200${tmdbData.poster_path}`,
        imdb: item[type].ids.imdb
      };
    }));

    return shows;
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
      thumbnail: image()
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
    pixelfed: z.string().url().optional(),
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

export const collections = { 
  posts,
  authors, 
  projects, 
  goodreads_read_books, 
  trakt_watched_movies,
  trakt_watched_shows,
  goodreads_user_updates,
}
