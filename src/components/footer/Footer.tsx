function Footer() {
  return (
    <footer className="block w-full bottom-0 bg-indigo-950">
      <div className="container mx-auto py-4 px-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-white">
              &copy; {new Date().getFullYear()} B and M Apps
            </p>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="/about"
                  className="text-sm text-white hover:text-gray-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm text-white hover:text-gray-200"
                >
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
