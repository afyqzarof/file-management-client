"use client";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import React, { useState, useCallback } from "react";

const Upload = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [myFiles, setMyFiles] = useState<any>(null);
  const [isFileBig, setIsFileBig] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
  });

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles.length !== 0) {
        setIsFileBig(false);
        setMyFiles(
          acceptedFiles.map((file: MediaSource) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        );
        return;
      }
      setIsFileBig(true);
    },
    [myFiles],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = myFiles[0];
    const name = formFields.name === "" ? "untitled" : formFields.name;
    const description =
      formFields.description === "" ? "no description" : formFields.description;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    await axios.post(baseUrl + "/upload", formData);
    setMyFiles(null);
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    setMyFiles(null);
  };
  return (
    <main className="p-6">
      <h2 className="mb-5 text-4xl font-thin">upload a file</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="flex justify-around gap-10">
          <div className="flex-1">
            {!myFiles ? (
              <>
                <div
                  {...getRootProps({ className: "dropzone" })}
                  className="flex min-h-60 cursor-pointer flex-col items-center justify-center rounded border-2 border-black bg-slate-100"
                >
                  <input {...getInputProps()} name="file" />
                  <p className="upload__dnd">
                    drag and drop or click to select files
                  </p>
                </div>
                <p>{isFileBig && "file is too large"}</p>
                <p className=" italic">
                  please make sure your file does not exceed 500kb. we support
                  .jpg, .png, .jpeg
                </p>
              </>
            ) : (
              <>
                <img
                  alt={myFiles[0].path}
                  src={myFiles[0].preview}
                  className="file-form__preview"
                />
                <p className="file-form__name">{myFiles[0].path}</p>
              </>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex flex-col ">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="rounded border-2 border-black p-2"
                placeholder="Enter name"
                value={formFields.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="rounded border-2 border-black p-2"
                placeholder="Enter description"
                value={formFields.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {myFiles && (
          <button
            type="submit"
            className=" mt-5 rounded bg-black p-3 text-white"
          >
            Upload Image
          </button>
        )}
      </form>
      {myFiles && (
        <button className="mt-2 text-lg underline" onClick={handleCancel}>
          cancel
        </button>
      )}
    </main>
  );
};

export default Upload;
