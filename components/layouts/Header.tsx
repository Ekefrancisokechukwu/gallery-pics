import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full  bg-white/95 px-8 py-4 flex items-center gap-x-8">
      <div className="font-bold text-lg">Gallery Pic</div>
      <div className="ml-12 relative  gap-x-1 flex items-center ">
        <span className="absolute top-1/2 -translate-y-1/2 left-5 ">
          <Search size={18} className="text-gray-600" />
        </span>
        <input
          type="text"
          className=" w-[30rem] pl-14 font-semibold  hover:bg-gray-200 focus:bg-gray-200 transition-all duration-300 pr-4  outline-none bg-gray-100  rounded-full py-2"
        />
      </div>
    </header>
  );
};
export default Header;
