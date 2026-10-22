import NavLinks from "./NavLinks";
import HomeLink from "../components/HomeLinks";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Logo and Website Info */}
        <HomeLink></HomeLink>
      </div>

      {/* Category Navigation */}
      <NavLinks />
    </header>
  );
};

export default Header;