import React from "react";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { supabase } from "./supebaseClient";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    try {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .limit(100);

      if (error) throw error;
      if (data != null) {
        setBooks(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  async function createBook() {
    try {
      const { data, error } = await supabase
        .from("books")
        .insert({
          name: name,
          description: description,
        })
        .single();

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <React.Fragment>
      <nav className="flex items-center justify-center bg-slate-700 text-white p-4 border-b-2 border-yellow-300">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl">CRUD APP</h1>
        </div>
      </nav>
      <section className="bg-slate-700 text-white">
        <div className="w-5/6 m-auto p-4">
          <div className="border border-yellow-300 p-4 rounded-lg">
            <form className="flex flex-col items-center justify-center gap-4">
              <h3 className="text-lg my-2">Book store Supabase Database</h3>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Book Name"
              />
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Book Description"
              />
              <button
                onClick={() => createBook()}
                className="border-none bg-yellow-300 text-slate-900 rounded-md py-2 px-4"
              >
                Create
              </button>
            </form>
          </div>
        </div>
        <div className="w-5/6 m-auto">
          <h1 className="text-2xl flex flex-col items-center justify-center">
          Stored Database
          <span className="bg-yellow-300 h-1 w-1/6"></span></h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {books.map((book,index) => (
              <div key={index}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
