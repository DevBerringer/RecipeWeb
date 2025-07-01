import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bottom-0 block w-full bg-recipecentral-light shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} B and M Apps
            </p>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link to="about">About</Link>
              </li>
              <li>
                <Link to="contactUs">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
