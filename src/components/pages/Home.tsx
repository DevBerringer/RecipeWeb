import { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function Home() {
  const imagePaths = [
    '/assets/burgerBig.jpg',
    '/assets/sushiSnackBig.jpg',
    '/assets/drinksBig.jpg',
    '/assets/croissantBig.jpg',
    '/assets/eggTartBig.jpg',
    '/assets/watermelonBig.jpg',
    '/assets/cakeBig.jpeg',
  ];

  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement your search functionality here
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-extrabold text-white">
          <span className="drop-shadow-lg">Welcome to Recipe Central!</span>
        </h1>
      </div>
      <div className="w-2/5 mx-auto flex">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 py-2 px-4 bg-white  rounded-l text-black font-semibold shadow-md focus:outline-none"
        />
        <button
          type="button"
          className="bg-recipecentral-dark hover:bg-recipecentral-light hover:text-black rounded-r px-4 text-white font-semibold shadow-md focus:outline-none"
        >
          Search
        </button>
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <div className="floating-carousel-container mt-5 bg-white rounded-md shadow-md">
          <AliceCarousel
            touchMoveDefaultEvents
            autoPlay
            infinite
            mouseTracking
            autoPlayInterval={2000}
            disableButtonsControls
            responsive={responsive}
            items={imagePaths.map((path, index) => (
              <div key={index} className="carousel-item">
                <div className="mt-10 carousel-image-container">
                  <img
                    src={path}
                    alt={`${index + 1}`}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          />
        </div>
        <p className="text-right">Sketches by Xiuwen Ye</p>
      </div>
    </div>
  );
}

export default Home;
