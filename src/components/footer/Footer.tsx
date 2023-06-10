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
                <a href="/about" className="text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contactUs" className="text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
