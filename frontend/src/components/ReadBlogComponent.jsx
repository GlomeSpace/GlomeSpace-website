import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { NewsletterForm, ThinNewsletterForm } from "./NewsLetterForm";
import { useFetch } from "../../../glomespace_blogs/src/hooks/useFetch";
import { UseDataFetcher } from "../hooks/UseDataFetcher";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export const ReadBlogComponent = () => {
  const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;
  const { documentId } = useParams();
  const { formatTimestamp } = UseDataFetcher();
  console.log("Document ID from URL:", documentId); // Debugging log
  const { loading, error, data } = useFetch(`${STRAPI_API_URL}/api/blogs`);

  // 1. Check loading state FIRST
  if (loading) return <div className="pt-20 text-center">Loading blog...</div>;

  // 2. Check for errors
  if (error)
    return (
      <div className="pt-20 text-center text-red-500">
        Error: {error.message}
      </div>
    );

  // 3. Now find the blog
  const blog = data?.find((b) => b.documentId === documentId);
  console.log("Found blog:", blog.documentId); // Debugging log

  // 4. ONLY IF loading is done and data is here, check if blog exists
  if (!blog) {
    return <div className="pt-20 text-center">Blog not found!</div>;
  }
  return (
    <div>
      <section className="mt-20 md:mt-0 bg-blue-100  ">
        <div className="">
          <div className="flex flex-col-reverse md:flex-row w-full md:gap-2 items-center">
            <div className="px-8 w-full gap-5 md:w-7/10  lg:text-left">
              <h1 className="text-[20px] md:text-4xl sm:text-5xl lg:text-4xl font-bold text-blue-900 ">
                {blog.Title}
              </h1>

              <p className=" md:mt-10  italic text-gray-900 text-[15px]">
                {blog.description}
              </p>

              <p className=" md:mt-10  italic text-gray-700 text-[15px]">
                Written by {blog.author} on {formatTimestamp(blog.publishedAt)}
              </p>

              <div className=" flex items-center gap-3 md:mt-10   text-gray-700 ">
                <p className="font-fancyFontAgain text-black font md:text-[20px]">
                  Share post on
                </p>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 "
                >
                  <FaFacebook size={25} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.Title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 hover:underline"
                >
                  <FaXTwitter size={25} />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${blog.Title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 hover:underline"
                >
                  <FaLinkedin size={25} />
                </a>

                {/* Add more social platforms as needed */}
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center gap-5 h-80 md:h-100 w-full md:w-6/10">
              <div className="w-full md:h-9/10  absolute md:top-5 md:left-10 ">
                <img
                  src={blog.thumbnail || "/photos/travelers.jpeg"}
                  alt={blog.Title}
                  className="w-full h-full object-cover rounded-md md:mb-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="flex flex-col md:flex-row gap-5 py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="md:w-6/10 md:px-20">
          <BlogContent blocks={blog.content} />

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
            <Button className="text-[13px] px-2  bg-blue-400">
              <Link to="/blog-posts">Go Back to Blogs</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-3/10 mx-auto">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
};

const BlogContent = ({ blocks }) => {
  return blocks.map((block, index) => {
    // Check the block type (paragraph, heading, list, etc.)
    if (block.type === "paragraph") {
      return (
        <p key={index} className="md:mb-10  md:text-justify">
          {block.children.map((child) => child.text).join("")}
        </p>
      );
    }
    // Add more types as needed (heading, image, etc.)
    return null;
  });
};
