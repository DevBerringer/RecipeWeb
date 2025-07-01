import React from 'react';

function Contact() {
  return (
    <div className="mx-auto max-w-7xl text-lg">
      <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
      <div className="flex">
        <div className="w-1/3">
          <p className="text-xl">
            If you have any questions or need further information, please feel
            free to reach out to us.
          </p>
          <form className="mt-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-xl font-bold">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded border border-gray-300 px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-xl font-bold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded border border-gray-300 px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-xl font-bold">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full rounded border border-gray-300 px-4 py-2"
              />
            </div>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-2/3 pl-8">
          <img
            src="public/assets/noFood.jpg"
            alt="No food"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
