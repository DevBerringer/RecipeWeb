import React from 'react';

function Contact() {
  return (
    <div className="mx-auto max-w-7xl text-lg">
      <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
      <p className="text-xl">
        If you have any questions or need further information, please feel free
        to reach out to us.
      </p>
      <p className="mt-4 text-xl">
        <strong>Email:</strong>{' '}
        <a
          href="mailto:RecipeCentralSupport@RecipeCentral.com"
          className="text-recipecentral hover:underline"
        >
          RecipeCentralSupport@RecipeCentral.com
        </a>
      </p>
    </div>
  );
}

export default Contact;
