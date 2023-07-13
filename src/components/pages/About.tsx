import { ReactComponent as Croissant } from '../../assets/croissant.svg';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-extrabold">
          <span className="drop-shadow-lg"> About Family Cookbook</span>
        </h1>
      </div>
      <div className="text-center bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Croissant className="max-h-[32rem] mx-auto" />
            <p className="mt-4 text-lg text-gray-500">
              Welcome to our recipe sharing community! We are passionate about
              food and believe that sharing delicious recipes can bring people
              together. Our platform allows you to discover, create, and share
              your favorite recipes with others.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
            <p className="mt-4 text-lg text-gray-500">
              At Recipe Central, our mission is to inspire and empower people to
              explore their culinary creativity. We want to make cooking
              enjoyable and accessible for everyone, whether you are a seasoned
              chef or just starting out in the kitchen.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900">How It Works</h3>
            <p className="mt-4 text-lg text-gray-500">
              Sharing your recipes on Recipe Central is easy! Simply create an
              account, and you will be able to upload your recipes, complete
              with ingredients, step-by-step instructions, and mouthwatering
              photos. You can also browse through the extensive collection of
              recipes contributed by other users, leave comments, and save your
              favorite recipes for later.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900">Get Involved</h3>
            <p className="mt-4 text-lg text-gray-500">
              We are always looking for passionate food lovers to join our
              community. Whether you are an amateur cook, professional chef, or
              simply enjoy trying out new recipes, Recipe Central is the place
              for you. Connect with like-minded individuals, share your culinary
              creations, and explore the world of flavors together.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
            <p className="mt-4 text-lg text-gray-500">
              If you have any questions, suggestions, or feedback, we would love
              to hear from you! You can reach out to our team through the
              contact form on our website, and we will get back to you as soon
              as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
