"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ImagePage() {
  const { id } = useParams();
  const [image, setImage] = useState<{
    name: string;
    filename: string;
    description: string;
  } | null>(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:8080/files/${id}`);

      setImage(data);
    };
    getData();
  }, []);

  if (!image) {
    return <p>Loading...</p>;
  }
  return (
    <main className="flex justify-around">
      <img
        src={`http://localhost:8080/image/${image.filename}`}
        alt={image.name}
        className="flex-1"
      />
      <section className=" flex justify-center flex-col items-start flex-1 p-4">
        <h3 className=" font-thin text-5xl mb-5">{image.name}</h3>
        <p className="mb-8">{image.description}</p>

        <button className="px-2 py-1 border-2 border-black rounded mb-2">
          Edit
        </button>
        <button className="px-2 py-1 rounded bg-red-700 text-white">
          Delete
        </button>
      </section>
    </main>
  );
}
