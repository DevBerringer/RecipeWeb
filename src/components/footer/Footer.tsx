import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="block w-full bottom-0 shadow-lg bg-recipecentral-light">
      <div className="container mx-auto py-4 px-6">
        <div className="flex justify-between items-center">
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
