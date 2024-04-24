"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ImagePage() {
  const { id } = useParams();
  const [images, setImages] = useState({});
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:8080/files/${id}`);

      setImages(data);
    };
    getData();
  }, []);
  return (
    <>
      <h3>this is {id}</h3>
    </>
  );
}
