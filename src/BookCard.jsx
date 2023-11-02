import React, { useState } from "react";
import { supabase } from "./supebaseClient";
export default function bookCard(props) {
  const book = props.book;

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(book.name);
  const [description, setDescription] = useState(book.description);

  async function updateBook() {
    try {
      const { data, error } = await supabase
        .from("books")
        .update({
          name: name,
          description: description,
        })
        .eq("id", book.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }
  async function deleteBook() {
    try {
      const { data, error } = await supabase
        .from("books")
        .delete()
        .eq("id", book.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <section className="mt-4 mb-4">
      <div className="flex flex-col gap-2 border border-yellow-300 rounded-md p-4">
        {edit == false ? (
          <React.Fragment>
            <h1 className="text-xl bg-slate-600 px-4 py-2">{book.name}</h1>
            <p className="text-xl bg-slate-600 px-4 py-2">{book.description}</p>
            <button onClick={() => deleteBook()} className="text-xl rounded-lg px-4 py-2 bg-red-600">
              Delete
            </button>
            <button onClick={() => setEdit(true)} className="text-xl rounded-lg px-4 py-2 bg-green-600">
              Edit
            </button>
            </React.Fragment>
        ) : (
          <React.Fragment>
            <h4>Editing Book</h4>
            <button size="sm" onClick={() => setEdit(false)}>
              Go Back
            </button>
            <br></br>
            <label>Book Name</label>
            <input
              type="text"
              id="name"
              defaultValue={book.name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Book Description</label>
            <input
              type="text"
              id="description"
              defaultValue={book.description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button onClick={() => updateBook()}>Update</button>
            </React.Fragment>
        )}
      </div>
    </section>
  );
}
//32sdbkrguq3
