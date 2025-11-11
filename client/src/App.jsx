import React, { useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [valid, setValid] = useState(false);

  const fetchUrl = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_HOST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientUrl: url }),
      });

      const data = await res.json();
      if (data.message.includes("success")) {
        setMessage(data.shortUrl);
        setValid(true);
      } else {
        setMessage(data.message);
        setValid(false);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again!");
      setValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() === "") {
      setMessage("Please enter a URL");
      setValid(false);
      return;
    }
    fetchUrl();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 text-center">
          URL Shortener
        </h1>

        <form
          className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg flex flex-col space-y-6 transition-colors duration-500"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label
              htmlFor="url"
              className="mb-2 text-gray-700 dark:text-gray-300 font-medium"
            >
              Enter your URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/long-url"
              className="border-2 border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
            />
          </div>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold py-3 rounded-2xl text-lg transition-all duration-300"
          >
            Shorten URL
          </button>

          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                valid ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </main>

      <footer className="py-4 bg-gray-200 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300 transition-colors duration-500">
        <p>
          KeMall Tech &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
