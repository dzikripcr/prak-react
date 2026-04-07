import { useState } from "react";
import frameworkData from "./framework.json";
useState;

export default function FrameworkListSeacrhFilter() {
  /** Deklrasai state **/
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  /** Deklrasai Logic Search & Filter **/
  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm) ||
      framework.details.releaseYear.toString().includes(_searchTerm);

    const matchesTag = selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  /** Deklarasi pengambilan unique tags di frameworkData **/
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Container untuk mengatur grid agar tidak menumpuk satu kolom saja di layar lebar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search framework..."
          onChange={(e)=>setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <select
          name="selectedTag"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e)=>setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="group border border-gray-200 p-6 rounded-2xl shadow-sm bg-white 
                       hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out"
          >
            {/* Header & Judul */}
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h2>
              <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
                {item.details.releaseYear}
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Info Developer */}
            <div className="flex items-center mb-6 text-sm text-gray-500">
              <span className="font-semibold text-gray-700">Dev:</span>
              <span className="ml-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                {item.details.developer}
              </span>
            </div>

            {/* Action & Tags */}
            <div className="flex flex-col gap-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.details.officialWebsite}
                className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white 
                           font-semibold py-2 px-4 rounded-xl shadow-md active:scale-95 
                           transition-all duration-200"
              >
                Visit Website
              </a>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-500 px-2 py-1 text-[10px] 
                               uppercase tracking-wider font-bold rounded-md border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
