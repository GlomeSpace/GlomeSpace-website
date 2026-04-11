import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "../hooks/useFetch";

export const BlogComponent = ({ data }) => {
  return (
    <>
      {data?.data
        ? data.data.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md p-1 h-max"
            >
              {/* If you don't have an imageUrl in the object yet, use a placeholder or check your CMS fields */}
              <img
                src={blog.thumbnail || "/photos/glomespace_thumnbail.png"}
                alt={blog.Title}
                className="w-full h-48 object-cover rounded-md"
              />

              {/* Use blog.Title (Capital T) */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {blog.Title}
                </h3>

                <p className="line-clamp text-gray-600 mb-4 text-[13px]">
                  {blog.description}
                </p>

                {/* Use documentId or id for the link */}
                <a
                  href={`/read-blog/${blog.documentId}`}
                  className="text-blue-500 hover:underline font-medium text-[13px]"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        : data?.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md p-1 h-100"
            >
              {/* If you don't have an imageUrl in the object yet, use a placeholder or check your CMS fields */}
              <img
                src={blog.thumbnail.url || "/photos/glomespace_thumnbail.png"}
                alt={blog.Title}
                className="w-full h-48 object-cover rounded-md"
              />

              {/* Use blog.Title (Capital T) */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">
                  {blog.Title}
                </h3>

                <p className="text-gray-600 mb-4 text-[13px]">
                  {blog.description}
                </p>

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

export const BlogComponentSkeleton = () => {
  return (
    <Skeleton className="flex flex-col gap-2 rounded-lg shadow-md p-1">
      <Skeleton className="h-6/10 bg-blue-100 w-full h-48 rounded-md" />

      <Skeleton className="flex flex-col gap-1 h-4/10 p-4">
        <Skeleton className="w-full h-3 bg-slate-200 bg-gray-200" />
        <Skeleton className="w-5/10 h-3 bg-slate-200 bg-gray-200" />
        <Skeleton className="w-full h-3 bg-slate-200 bg-gray-200" />
        <Skeleton className="w-7/10 h-3 bg-slate-200 bg-gray-200" />
        <Skeleton className="w-7/10 h-3 bg-slate-200 bg-gray-200" />
      </Skeleton>
    </Skeleton>
  );
};

export const BlogPostEmbeddable = () => {
  const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;
  const { loading, error, data } = useFetch(
    `${STRAPI_API_URL}/api/blogs?populate=*&pagination[limit]=3&sort[0]=createdAt:desc`,
  );

  return (
    <div className="flex flex-col h-max md:h-140 px-3 md:px-10 w-full">
      <div className="flex flex-col items-center justify-center h-2/10 ">
        <h3 className="font-bold text-[20px]">Get insipired</h3>
        <p className="text-gray-500 uppercase tracking-widest text-[12px] font-medium mb-5 md:mb-0">
          Explore strategies and stories from our global delivery network.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {loading ? (
          <>
            <BlogComponentSkeleton />
            <BlogComponentSkeleton />
            <BlogComponentSkeleton />
          </>
        ) : (
          <>
            <BlogComponent data={data} />
          </>
        )}
      </div>
    </div>
  );
};
