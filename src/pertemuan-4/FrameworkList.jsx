import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    <div className="p-8">
      {frameworkData.map((item) => (
        <div
          key={item.id}
          className="border p-4 mb-4 rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>

          <p className="text-gray-600">{item.description}</p>

          <p
            className="mb-5 bg-amber-300 p-2 rounded-lg 
                        shadow-md border">
            {item.details.developer}
            <span> {item.details.releaseYear}</span>
          </p>

          <a
            target="_blank"
            href={item.details.officialWebsite}
            className="border p-2
                         bg-blue-400 shadow-md font-bold rounded-lg ">
            Visit Website 
          </a>

          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-2 py-1 
              text-xs rounded-full mr-2 ml-4">
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
