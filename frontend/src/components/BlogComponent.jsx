import { useFetch } from "../../../glomespace_blogs/src/hooks/useFetch";

export const BlogComponent = () => {
  const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;

  const { loading, error, data } = useFetch(`${STRAPI_API_URL}/api/blogs`);
  console.log("Blogs data:", data); // Debugging log

  return (
    <>
      {data?.map((blog) => (
        <div key={blog.id} className="bg-white rounded-lg shadow-md p-1">
          {/* If you don't have an imageUrl in the object yet, use a placeholder or check your CMS fields */}
          <img
            src={blog.thumbnail || "/photos/travelers.jpeg"}
            alt={blog.Title}
            className="w-full h-48 object-cover rounded-md"
          />

          {/* Use blog.Title (Capital T) */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-blue-900">
              {blog.Title}
            </h3>

            <p className="text-gray-600 mb-4 text-[13px]">{blog.description}</p>

            {/* Use documentId or id for the link */}
            <a
              href={`/read-blog/${blog.documentId}`}
              className="text-blue-500 hover:underline font-medium text-[13px]"
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </>
  );
};
