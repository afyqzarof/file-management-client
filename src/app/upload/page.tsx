"use client";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import React, { useState, useCallback } from "react";

const Upload = () => {
  // const baseUrl = import.meta.env.VITE_BASE_URL;
  const [myFiles, setMyFiles] = useState<any>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFileBig, setIsFileBig] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles.length !== 0) {
        setIsFileBig(false);
        setMyFiles(
          acceptedFiles.map((file: MediaSource) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        return;
      }
      setIsFileBig(true);
    },
    [myFiles]
  );

  const handleCreateUploadPin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = myFiles[0];

    const formData = new FormData();
    formData.append("file", file);
    // const { data } = await axios.post(baseUrl + "/upload", formData);
    // addNodes({
    //   id: nanoid(10),
    //   type: "ImageNode",
    //   position: getRandomCoords(),
    //   data: {
    //     file: data.filename,
    //   },
    // });
    // setMyFiles(null);
    // closeModal();
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 500000,
  });

  return (
    <main className="p-6">
      <h2 className="font-thin text-4xl mb-5">upload a file</h2>
      <form
        encType="multipart/form-data"
        className="flex justify-around gap-10">
        <div className="flex-1">
          <div
            {...getRootProps({ className: "dropzone" })}
            className="bg-slate-100 border-2 border-black rounded cursor-pointer flex flex-col justify-center items-center min-h-60">
            <input {...getInputProps()} name="file" />
            <p className="upload__dnd">
              drag and drop or click to select files
            </p>
          </div>
          <p>{isFileBig && "file is too large"}</p>
          <p className=" italic">
            please make sure your file does not exceed 500kb. we support .jpg,
            .png, .jpeg
          </p>
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="name">Enter name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="description">Enter description</label>
          <input type="text" name="description" id="description" />
        </div>
      </form>
    </main>
  );
};

export default Upload;
