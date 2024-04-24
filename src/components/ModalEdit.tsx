`use client`;
import React from "react";
import Popup from "reactjs-popup";
import { useState } from "react";
import axios from "axios";
export const ModalEdit = ({
  name,
  description,
  id,
}: {
  name: string;
  description: string;
  id: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [formFields, setFormFields] = useState({
    name: name,
    description: description,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    await axios.patch(`${baseUrl}/files/${id}`, formFields);
  };
  return (
    <Popup
      trigger={
        <button className="px-2 py-1 border-2 border-black rounded mb-2">
          Edit
        </button>
      }
      modal>
      <article className="bg-white p-6 rounded w-full ">
        <h4 className="font-thin text-5xl mb-5">Edit {name}</h4>

        <form
          className="flex flex-col gap-5 items-start"
          onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Enter name</label>
            <input
              name="name"
              type="text"
              placeholder="name"
              id="name"
              className="outline-none border-2 border-black rounded p-2"
              value={formFields.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Enter Description</label>
            <textarea
              name="description"
              placeholder="description"
              id="description"
              className="outline-none border-2 border-black rounded p-2"
              value={formFields.description}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="px-2 py-1 bg-black text-white rounded mb-2">
            Change
          </button>
        </form>
      </article>
    </Popup>
  );
};
