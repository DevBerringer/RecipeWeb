import { Link } from 'react-router-dom';
import { ReactComponent as Croissant } from '../../assets/croissant.svg';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Header with Prominent Croissant */}
      <div className="mx-auto max-w-6xl mb-12">
        <div className="relative rounded-2xl shadow-xl overflow-hidden">

          {/* Croissant as Background Element */}
          <div className="absolute inset-0 flex justify-center items-center z-0 opacity-30">
            <Croissant className="w-[52rem] h-[52rem] rotate-[-10deg]" />
          </div>

          {/* Text Content Overlaid */}
          <div className="relative z-10 px-6 md:px-16 py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 drop-shadow-lg">
              About Cozy Cookbook
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Discover the story behind Cozy Cookbook and join our passionate community of food lovers. 
              We believe that sharing delicious recipes can bring people together and inspire culinary creativity.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                We are passionate about food and believe that sharing delicious recipes can bring people together. 
                Our platform allows you to discover, create, and share your favorite recipes with a community 
                that celebrates culinary creativity and the joy of cooking.
              </p>
          </div>
          <div className="bg-white p-8 md:p-12 mb-8">
            <div className="text-center">
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl">


        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-recipecentral rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              At Cozy Cookbook, our mission is to inspire and empower people to explore their culinary creativity. 
              We want to make cooking enjoyable and accessible for everyone, whether you are a seasoned chef or 
              just starting out in the kitchen.
            </p>
          </div>

          {/* How It Works Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-recipecentral rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Sharing your recipes on Cozy Cookbook is easy! Simply create an account, and you will be able to 
              upload your recipes, complete with ingredients, step-by-step instructions, and mouthwatering photos. 
              Browse through our extensive collection and save your favorites.
            </p>
          </div>

          {/* Get Involved Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-recipecentral rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Get Involved</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We are always looking for passionate food lovers to join our community. Whether you are an amateur cook, 
              professional chef, or simply enjoy trying out new recipes, Cozy Cookbook is the place for you. 
              Connect with like-minded individuals and explore the world of flavors together.
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-recipecentral rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Get In Touch</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions, suggestions, or feedback, we would love to hear from you! 
              Reach out to our team and we will get back to you as soon as possible.
            </p>
            <div>
              <Link to="../contactUs" className="px-4 hover:underline">
                Visit our Contact page
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-recipecentral-light to-parchment-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Culinary Journey?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join home cooks and professional chefs who are sharing their favorite recipes and discovering new flavors every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/recipes" 
                className="inline-flex items-center justify-center px-6 py-3 bg-recipecentral text-white font-medium rounded-lg hover:bg-recipecentral-dark transition-colors"
              >
                Browse Recipes
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a 
                href="/login/register" 
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-recipecentral text-recipecentral font-medium rounded-lg hover:bg-recipecentral hover:text-white transition-colors"
              >
                Join Our Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
