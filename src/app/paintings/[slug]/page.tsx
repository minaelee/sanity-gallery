// import {PortableText} from '@portabletext/react'
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";

const PAINTING_QUERY = `*[
  _type == "painting" &&
  slug.current == $slug
][0]{
  title,
  slug,
  image,
  year,
  description,
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const customComponents = {
  block: {
    normal: ({ children }: any) => {
      if (children.length === 1 && children[0] === '') {
        return <br />;  // This adds a blank line
      }
      return <p className="blockText">{children}</p>;
    },
  },
};

export default async function PaintingPage({
  params,
}: {
  params: { slug: string };
}) {
  const painting = await sanityFetch<SanityDocument>({
    query: PAINTING_QUERY,
    params,
  });

  const { title, image, year, description } = painting;
  const paintingImageUrl = image
    ? urlFor(image)?.width(800).height(800).url()
    : null;

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4 text-xl">
        <Link href="/">← Return to the Gallery</Link>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={paintingImageUrl || "https://via.placeholder.com/550x310"}
          alt={title || "Painting"}
          className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="800"
          width="800"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {title ? (
              <h1 className="text-4xl mb-8">
                {title}
              </h1>
            ) : null}
            {year ? (
              <dl>
                <dd className="year text-2xl">Year</dd>
                <dt className="text-2xl">{year}</dt>
              </dl>
            ) : null}
          </div>
          <div>
            <PortableText value={description} components={customComponents} />
          </div>
        </div>
      </div>
    </main>
  );
}
