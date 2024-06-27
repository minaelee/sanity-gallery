import Link from "next/link";
import { SanityDocument } from "next-sanity";
import { client, sanityFetch } from "@/sanity/client";
import Image from 'next/image';
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

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
      <h1 className="text-6xl text-center tracking-tighter">
        Gallery
      </h1>
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
              <h2 className="text-xl text-center font-semibold">{painting?.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}