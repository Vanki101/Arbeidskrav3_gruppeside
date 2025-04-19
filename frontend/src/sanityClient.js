import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '4uzkz7t2',
  dataset: 'production',
  apiVersion: '2023-05-03', 
  useCdn: false, // sett til false under utvikling
  withCredentials: false, // viktig for CORS
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}