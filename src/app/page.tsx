"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [images, setImages] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${baseUrl}/files/all`);

      setImages(data);
    };
    getData();
  }, []);

  return (
    <main className="p-6">
      <h2 className="font-thin text-6xl mb-4">Images</h2>
      <section className="flex gap-1 flex-wrap justify-around">
        {images.map((image: any) => {
          return (
            <Link
              href={`/image/${image.id}`}
              key={image.id}
              className="w-[20%] p-2">
              <img
                src={`${baseUrl}/image/${image.filename}`}
                alt={image.name}
              />
              <h3 className="text-2xl font-thin">{image.name}</h3>
              <p>{image.description}</p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
