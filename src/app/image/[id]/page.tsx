"use client";
import { ModalDelete } from "@/components/ModalDelete";
import { ModalEdit } from "@/components/ModalEdit";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ImagePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { id } = useParams();
  const [image, setImage] = useState<{
    name: string;
    filename: string;
    description: string;
  } | null>(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${baseUrl}/files/${id}`);

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
        src={`${baseUrl}/image/${image.filename}`}
        alt={image.name}
        className="flex-1"
      />
      <section className=" flex justify-center flex-col items-start flex-1 p-4">
        <h3 className=" font-thin text-5xl mb-5">{image.name}</h3>
        <p className="mb-8">{image.description}</p>
        <ModalEdit
          name={image.name}
          description={image.description}
          id={image.id}
        />
        <ModalDelete name={image.name} id={image.id} />
      </section>
    </main>
  );
}
