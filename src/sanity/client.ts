import { createClient, type QueryParams } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2022-03-07",
  useCdn: false,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/",
  }
});

// export async function sanityFetch<QueryResponse>({
//   query,
//   params = {},
//   tags,
// }: {
//   query: string;
//   params?: QueryParams;
//   tags?: string[];
// }) {
//   return client.fetch<QueryResponse>(query, params, {
//     next: {
//       revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
//       tags,
//     },
//   });
// }