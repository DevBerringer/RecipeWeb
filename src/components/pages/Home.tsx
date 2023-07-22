import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { ReactComponent as LogoSVG } from '../../assets/FCBLogo.svg';
import { UseAuth } from '../../contexts/authContext';

function Home() {
  const { user } = UseAuth();

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
    <div className="container mx-auto px-4">
      <div className="text-center">
        <LogoSVG className="w-60 h-60 mx-auto" />
      </div>
      <p className="text-center text-lg">
        Welcome to the Website{user ? ` ${user?.username}` : ''}!
      </p>
      <div className="w-full max-w-5xl mx-auto">
        <div className="floating-carousel-container mx-36 rounded-md">
          <AliceCarousel
            touchMoveDefaultEvents
            autoPlay
            infinite
            touchTracking={false}
            autoPlayInterval={1000}
            animationDuration={3000}
            autoPlayStrategy="none"
            disableDotsControls
            items={imagePaths.map((path, index) => (
              <div key={index} className="carousel-item">
                <div className="carousel-image-container">
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
        <p className="mr-36 text-right">
          Designs and Sketches by 叶秀文（Ye Xiuwen）
        </p>
      </div>
    </div>
  );
}

export default Home;
