function Contact() {
  return (
    <div className="mx-auto max-w-7xl text-lg">
      <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
      <div className="flex flex-wrap gap-8">
        <div className="w-full md:w-1/3">
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
                id="name" // <-- must exactly match htmlFor
                name="name"
                type="text"
                className="w-full rounded border border-gray-300 px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-xl font-bold">
                Email:
              </label>
              <input
                id="email" // <-- must exactly match htmlFor
                name="email"
                type="email"
                className="w-full rounded border border-gray-300 px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-xl font-bold">
                Message:
              </label>
              <textarea
                id="message" // <-- must exactly match htmlFor
                name="message"
                rows={4}
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

        <div className="w-full md:w-2/3">
          <img
            src="/assets/noFood.jpg"
            alt="No food"
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
