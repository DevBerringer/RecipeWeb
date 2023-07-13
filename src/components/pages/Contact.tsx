function Contact() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center shadow-lg bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl text-lg mx-auto">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">
            If you have any questions or need further information, please feel
            free to reach out to us.
          </p>
          <p className="text-xl mt-4">
            <strong>Email:</strong>{' '}
            <a href="mailto:RecipeCentralSupport@RecipeCentral.com">
              RecipeCentralSupport@RecipeCentral.com
            </a>
          </p>
          <p className="text-xl mt-2">
            <strong>Phone:</strong> <a href="tel:+17372937022">555-293-7022</a>
          </p>
          <p className="text-xl mt-2">
            <strong>Office Address:</strong> 212 Fifth Avenue, New York, New
            York, 10010
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
