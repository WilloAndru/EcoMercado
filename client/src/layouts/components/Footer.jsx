function Footer() {
  return (
    <footer className="p-8 flex flex-col gap-4 bg-primary text-white font-bold">
      <p>Copyright © {new Date().getFullYear()} Country Ltd.</p>
      <p>Street ### Number #### City, Country</p>
    </footer>
  );
}

export default Footer;
