const Footer = ({ links }) => {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Hiring, admitting or collaborating? Write to me.
        </h2>
        <p className="mt-6 font-sans text-lg">
          <a href="mailto:programmer@nikhilbhagat.com.np" className="font-semibold">
            programmer@nikhilbhagat.com.np
          </a>
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-sans text-[0.92rem]">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 font-sans text-sm text-muted">
          © {new Date().getFullYear()} Nikhil Bhagat
        </p>
      </div>
    </footer>
  );
};

export default Footer;
