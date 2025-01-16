const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">Ready to collaborate..?? Let's connect..!!</p>
        <div className="mt-4 flex justify-center space-x-6">
          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/bhagatnikhil/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-teal-500 transition-all duration-300 flex items-center space-x-2"
          >
            <i className="fab fa-linkedin text-2xl"></i>
            <span className="text-lg">LinkedIn</span>
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/NikeGunn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-teal-500 transition-all duration-300 flex items-center space-x-2"
          >
            <i className="fab fa-github text-2xl"></i>
            <span className="text-lg">GitHub</span>
          </a>
        </div>

        {/* Email Address Section */}
        <div className="mt-4">
          <p className="text-gray-300 text-lg">Email: programmer@nikhilbhagat.com.np</p>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          © 2025 Nikhil Bhagat. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
