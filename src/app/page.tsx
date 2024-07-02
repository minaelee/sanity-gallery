import Link from "next/link";
import { SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/fetch";
import Image from 'next/image';
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { HeartFilledIcon } from '@sanity/icons'

const PAINTINGS_QUERY = `*[_type == "painting"]{
  _id,
  title,
  slug,
  "image": image.asset->,
  "thumbnailUrl": thumbnail.asset->url
}|order(year)`;

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) =>
  builder.image(source);

export default async function IndexPage() {
  const paintings = await sanityFetch<SanityDocument[]>({
    query: PAINTINGS_QUERY,
    perspective: "published",
    stega: false,
  });
  console.log('Paintings: ', paintings);

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="font-bebas-neue text-6xl text-center ">
        Gallery
      </h1>
      <h2 className="byline text-4xl text-center">Artwork by <a href="https://minaelee.com">Minae Lee</a></h2>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {paintings.map((painting) => (
          <li
            className="bg-white p-4 rounded-lg flex flex-col items-center"
            key={painting._id}
            style={{backgroundColor: painting.image.metadata.palette.darkVibrant.background}}
          >
            <Link
              className="flex flex-col items-center"
              href={`/paintings/${painting.slug.current}`}
            >
              {urlFor(painting.image) && (
                 <Image
                   src={urlFor(painting.image)
                    .size(400, 400)
                    .url() 
                      || "https://via.placeholder.com/550x310"} 
                   alt={painting.title || "Untitled painting"}
                   width={400}
                   height={400} 
                 />
              )}
              <h2 
                className="my-1 text-xl text-center"
                style={{color: painting.image.metadata.palette.darkVibrant.foreground}}
              >
                {painting?.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <p className="text-center flex items-center justify-center">Created with <HeartFilledIcon className="text-red-300 hover:text-red-500 text-2xl" /> by Minae Lee</p>
        <p className="text-center">
          Thanks to <a className="hover:text-red-500" href="https://www.sanity.io/">Sanity</a> & <a className="hover:text-red-500" href="https://nextjs.org/">Next.js</a></p>
      </div>
    </main>
  );
}