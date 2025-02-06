"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useQuery as useUrlQuery } from "@/hooks/useQuery";
import { useQuery } from "@tanstack/react-query";
import { Search, TrendingUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [searchInput, setSearchInput] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, setIsopen } = useClickOutside(containerRef);

  const { data = [] } = useQuery({
    queryKey: ["suggestions", searchInput],
    queryFn: () => getWordSuggestions(searchInput),
    staleTime: 1000 * 60 * 60,
    enabled: !!searchInput,
  });

  const addSearch = (value: string) => {
    setParam("query", value);
    setSearchInput(value);
    setIsopen(false);
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
    setSearchInput(value);
  };

  const removeRecentSearch = (item: string) => {
    const updatedSearches = setRecentSearches((prev) =>
      prev.filter((word) => word !== item)
    );
    localStorage.setItem(
      "@gallerypicRecentSearch",
      JSON.stringify(updatedSearches)
    );
  };

  useEffect(() => {
    const storeRecentSearches = localStorage.getItem("@gallerypicRecentSearch");
    if (storeRecentSearches !== undefined) {
      setRecentSearches(
        storeRecentSearches ? JSON.parse(storeRecentSearches) : []
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="sm:ml-12  relative z-[70] md:w-auto w-full  gap-x-1 flex items-center "
    >
      <span className="absolute top-1/2 -translate-y-1/2 left-5 ">
        <Search size={18} className="text-gray-600" />
      </span>

      <input
        type="text"
        onFocus={() => setIsopen(true)}
        value={searchInput}
        onChange={handleSearch}
        className=" md:w-[40rem] w-full  pl-14   hover:bg-gray-200 focus:bg-gray-200 transition-all duration-300 pr-4  outline-none bg-gray-100  rounded-full py-2"
      />
      {searchInput && (
        <button
          onClick={() => setSearchInput("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-neutral-400 rounded-full"
        >
          <X size={14} />
        </button>
      )}

      {isOpen && (
        <div className="w-full bg-white border  rounded-xl shadow-lg absolute z-[900] space-y-3   left-0 top-[110%]">
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
                  <div className="flex items-center gap-2 flex-wrap mt-3">
                    {recentSearches.map((recent, i) => {
                      return (
                        <button
                          key={i}
                          onClick={() => addSearch(recent)}
                          className="flex items-center capitalize gap-x-3 text-sm border  text-neutral-600 px-2 py-1  rounded-md"
                        >
                          {recent}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              removeRecentSearch(recent);
                            }}
                            className="rounded-full inline-block bg-neutral-200 p-1"
                          >
                            <X size={15} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <h1 className="text-sm font-medium">Trending Searches</h1>
                <div className="flex items-center gap-2 flex-wrap mt-3">
                  {trending.map((trend, i) => {
                    return (
                      <button
                        key={i}
                        onClick={() => addSearch(trend)}
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
      )}
    </div>
  );
};
export default SearchBox;
