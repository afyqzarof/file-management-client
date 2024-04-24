"use client";
import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { useRouter } from "next/navigation";

export const ModalDelete = ({ name, id }: { name: string; id: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const handleDelete = async () => {
    await axios.delete(`${baseUrl}/files/${id}`);
    router.push("/");
  };
  return (
    <Popup
      trigger={
        <button className="px-2 py-1 rounded bg-red-700 text-white">
          Delete
        </button>
      }
      modal>
      <article className="bg-white p-6 rounded w-full ">
        <h4 className="font-thin text-5xl mb-5">Delete {name}?</h4>
        <button
          className="px-2 py-1 rounded bg-red-700 text-white"
          onClick={handleDelete}>
          Delete
        </button>
      </article>
    </Popup>
  );
};
