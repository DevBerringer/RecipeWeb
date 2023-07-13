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
    '/assets/dumpling.jpg',
    '/assets/spicyNoodle.jpg',
  ];

  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-extrabold text-black">
          <span className="drop-shadow-lg">Welcome to Family Cookbook!</span>
        </h1>
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <div className="floating-carousel-container mt-5 mx-36 bg-recipecentral rounded-md shadow-md">
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
        <p className=" mr-36 text-right">Sketches by Xiuwen Ye</p>
      </div>
    </div>
  );
}

export default Home;
