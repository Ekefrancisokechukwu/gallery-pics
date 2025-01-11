const colors = [
  "black",
  "white",
  "yellow",
  "orange",
  "red",
  "purple",
  "magenta",
  "green",
  "teal",
  "blue",
];

const FilterSidebar = () => {
  return (
    <div>
      <div className="flex items-center gap-x-4 mb-4">
        <h4 className="text-sm font-semibold">Colors</h4>
        <div className="size-[1.2rem] rounded-full border" />
      </div>
      <ul className="flex flex-wrap flex-shrink-0 gap-2">
        {colors.map((color, i) => {
          return (
            <li key={i}>
              <button
                style={{ background: color }}
                className="size-[1.2rem] border hover:ring ring-neutral-300 transition-all duration-500"
              ></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default FilterSidebar;
