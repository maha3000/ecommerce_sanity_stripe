import SanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'


export const client = SanityClient({
  projectId: 'v2cl8kuh',
  dataset: 'production',
  apiVersion: '2022-11-03',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source)