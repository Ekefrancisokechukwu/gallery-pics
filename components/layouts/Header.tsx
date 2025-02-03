import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <header className="w-full  bg-white/95 px-8 py-4 flex items-center gap-x-8">
      <div className="font-bold text-lg">Gallery Pic</div>
      <SearchBox />
    </header>
  );
};
export default Header;
