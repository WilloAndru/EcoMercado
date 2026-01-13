function Footer() {
  return (
    <footer className="h-[12vh] w-full flex flex-col justify-center pl-10 gap-[1vh] bg-primary text-white font-bold">
      <p>Copyright © {new Date().getFullYear()} Country Ltd.</p>
      <p>Street ### Number #### City, Country</p>
    </footer>
  );
}

export default Footer;
