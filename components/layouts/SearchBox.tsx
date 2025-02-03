"use client";

import { useQuery as useUrlQuery } from "@/hooks/useQuery";
import { useQuery } from "@tanstack/react-query";
import { Search, TrendingUp, X } from "lucide-react";
import { useEffect, useState } from "react";

const trending = [
  "crypto",
  "calender",
  "sloth",
  "wallpaper",
  "mobile application",
];

type Suggestion = {
  word: string;
};

async function getWordSuggestions(query: string): Promise<Suggestion[]> {
  const res = await fetch(`https://api.datamuse.com/sug?s=${query}`);
  if (!res.ok) {
    throw new Error("Failed to fetch suggestions");
  }
  return res.json();
}

const SearchBox = () => {
  const { setParam } = useUrlQuery();
  const [recentSearches, setRecentSearches] = useState<string[] | []>([]);
  const [searchInput, setInput] = useState("");

  const { data = [] } = useQuery({
    queryKey: ["suggestions", searchInput],
    queryFn: () => getWordSuggestions(searchInput),
    enabled: !!searchInput,
  });

  const addSearch = (value: string) => {
    setParam("query", value);

    setRecentSearches((prev) => {
      const updatedSearches = [
        value,
        ...prev.filter((item) => item !== value),
      ].slice(0, 10);
      localStorage.setItem(
        "@gallerypicRecentSearch",
        JSON.stringify(updatedSearches)
      );
      return updatedSearches;
    });
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setInput(value);
  };

  console.log(data);

  useEffect(() => {
    const storeRecentSearches = localStorage.getItem("@gallerypicRecentSearch");
    setRecentSearches(
      storeRecentSearches ? JSON.parse(storeRecentSearches) : []
    );
  }, []);

  return (
    <div>
      <div className="ml-12 relative z-[70]  gap-x-1 flex items-center ">
        <span className="absolute top-1/2 -translate-y-1/2 left-5 ">
          <Search size={18} className="text-gray-600" />
        </span>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearch}
          className=" w-[40rem] pl-14   hover:bg-gray-200 focus:bg-gray-200 transition-all duration-300 pr-4  outline-none bg-gray-100  rounded-full py-2"
        />

        <div className="w-full bg-white border rounded-xl shadow-lg absolute z-[70] space-y-3   left-0 top-[110%]">
          {searchInput ? (
            <>
              {data?.length > 0 && (
                <div className="py-5 space-y-1">
                  {data?.slice(0, 6).map((suggestion, i) => {
                    return (
                      <button
                        key={i}
                        onClick={() => addSearch(suggestion.word)}
                        className="w-full text-sm capitalize px-5 py-3 hover:bg-neutral-100 transition-all duration-200 text-start"
                      >
                        {suggestion.word}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-8 p-5">
              {recentSearches.length > 0 && (
                <div>
                  <h1 className="text-sm font-medium">Recent Searches</h1>
                  <div className="flex items-center gap-x-2 flex-wrap mt-3">
                    {recentSearches.map((recent, i) => {
                      return (
                        <button
                          key={i}
                          onClick={() => addSearch(recent)}
                          className="flex items-center capitalize gap-x-3 text-sm border  text-neutral-600 px-2 py-1  rounded-md"
                        >
                          {recent}{" "}
                          <button className="rounded-full bg-neutral-200 p-1">
                            <X size={15} />
                          </button>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <h1 className="text-sm font-medium">Trending Searches</h1>
                <div className="flex items-center gap-x-2 flex-wrap mt-3">
                  {trending.map((trend, i) => {
                    return (
                      <button
                        key={i}
                        className="flex items-center capitalize gap-x-2 text-sm border hover:bg-transparent text-neutral-600 px-2 py-1 bg-neutral-100 rounded-md"
                      >
                        <TrendingUp size={18} />
                        {trend}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchBox;
