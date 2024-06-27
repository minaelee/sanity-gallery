import Link from "next/link";
import { SanityDocument } from "next-sanity";
import { client, sanityFetch } from "@/sanity/client";
import Image from 'next/image';
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { HeartFilledIcon } from '@sanity/icons'

const PAINTINGS_QUERY = `*[_type == "painting"]{
  _id,
  title,
  slug,
  "thumbnailUrl": thumbnail.asset->url
}|order(year)`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function IndexPage() {
  const paintings = await sanityFetch<SanityDocument[]>({query: PAINTINGS_QUERY});
  console.log('Paintings: ', paintings);

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="font-bebas-neue text-6xl text-center ">
        Gallery
      </h1>
      <h2 className="byline text-4xl text-center tracking-tighter">Artwork by Minae Lee</h2>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {paintings.map((painting) => (
          <li
            className="bg-white p-4 rounded-lg flex flex-col items-center"
            key={painting._id}
          >
            <Link
              className="hover:underline flex flex-col items-center"
              href={`/paintings/${painting.slug.current}`}
            >
              {painting.thumbnailUrl && (
                <Image
                  src={painting.thumbnailUrl}
                  alt={painting.title || "Untitled painting"}
                  width={400}
                  height={400} 
                  style={{objectFit: "cover"}}
                />
              )}
              <h2 className="text-xl text-center">{painting?.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <p className="text-center flex items-center justify-center">Created in 2024 with <HeartFilledIcon className="text-red-300 hover:text-red-500 text-2xl" /> by Minae Lee</p>
        <p className="text-center">
          Thanks to <a className="hover:text-red-500" href="https://www.sanity.io/">Sanity.io</a> & <a className="hover:text-red-500" href="https://nextjs.org/">Next.js</a></p>
      </div>
    </main>
  );
}