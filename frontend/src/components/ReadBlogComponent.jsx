import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { NewsletterForm } from "./NewsLetterForm";
import { useFetch } from "../hooks/useFetch";
import { UseDataFetcher } from "../hooks/UseDataFetcher";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { TrustpilotReviewCard } from "./TrustpilotReviewCard";
import { Link2 } from "lucide-react";

export const ReadBlogComponent = () => {
  const PAYLOAD_API_URL = import.meta.env.VITE_PAYLOAD_API_URL;
  const { slug } = useParams();
  const { formatTimestamp } = UseDataFetcher();

  const { loading, error, data } = useFetch(
    `${PAYLOAD_API_URL}/api/blogs?where[slug][equals]=${slug}&depth=2`,
  );

  // 1. Check loading state FIRST
  if (loading) return <div className="pt-20 text-center">Loading blog...</div>;

  // 2. Check for errors
  if (error)
    return (
      <div className="pt-20 text-center text-red-500">
        Error: {error.message}
      </div>
    );
  const blog = data.docs[0];
  // 4. ONLY IF loading is done and data is here, check if blog exists
  if (!blog) {
    return <div className="pt-20 text-center">Blog not found!</div>;
  }
  return (
    <div>
      <section className="mt-12  md:mt-0 bg-blue-100  ">
        <div className="">
          <div className="flex flex-col-reverse md:flex-row w-full md:gap-2 items-center">
            <div className="flex flex-col px-4 md:py-20 w-full  md:w-7/10  lg:text-left">
              <h1 className="text-[20px] text-center md:text-4xl sm:text-5xl lg:text-4xl font-bold text-blue-900 ">
                {blog.title}
              </h1>

              <p className=" md:mt-10  italic text-gray-900 text-[15px]">
                {blog.description}
              </p>

              <p className=" md:mt-10  italic text-gray-700 text-[15px]">
                Written by {blog.author.firstName} {blog.author.lastName} on{" "}
                {formatTimestamp(blog.publishDate)}
              </p>

              <div className=" flex items-center gap-3 md:mt-10  mb-5 md:mb-0  text-gray-700 ">
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

                <a>
                  <Link2 />
                </a>

                {/* Add more social platforms as needed */}
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center gap-5 h-80 md:h-100 w-full md:w-6/10">
              <div className="w-full md:h-9/10  absolute md:top-5 md:left-10 ">
                <img
                  src={
                    blog.thumbnail?.sizes?.card?.url
                      ? `${PAYLOAD_API_URL}${blog.thumbnail.sizes.card.url}`
                      : "/photos/glomespace_thumbnail.png"
                  }
                  alt={blog.title} // ✅ lowercase 't' — JS is case sensitive
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
          <BlogContent blocks={blog.content?.root?.children} />

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
      <TrustpilotReviewCard />
    </div>
  );
};

const BlogContent = ({ blocks }) => {
  if (!blocks) return null;

  // Helper function to render text with formatting (bold, italic)
  const renderChildren = (children) => {
    return children.map((child, i) => (
      <span
        key={i}
        className={`${child.bold ? "font-bold" : ""} ${child.italic ? "italic" : ""}`}
      >
        {child.text}
      </span>
    ));
  };

  return blocks.map((block, index) => {
    // 1. Handle Paragraphs
    if (block.type === "paragraph") {
      return (
        <p
          key={index}
          className="mb-6 md:mb-10 text-gray-800 leading-relaxed md:text-justify"
        >
          {renderChildren(block.children)}
        </p>
      );
    }

    // 2. Handle Headings
    if (block.type === "heading") {
      const Tag = `h${block.level}`;
      const headingStyles = {
        h1: "text-4xl font-bold mt-12 mb-6 text-blue-900",
        h2: "text-3xl font-bold mt-10 mb-5 text-blue-900",
        h3: "text-2xl font-semibold mt-8 mb-4 text-blue-800",
        h4: "text-xl font-semibold mt-6 mb-3 text-blue-800",
        h5: "text-lg font-bold mt-4 mb-2 text-blue-800",
        h6: "text-base font-bold mt-4 mb-2 text-blue-800",
      };
      return (
        <Tag key={index} className={headingStyles[Tag] || headingStyles.h2}>
          {renderChildren(block.children)}
        </Tag>
      );
    }

    // 3. Handle Lists (Updated for Ordered/Numbered support)
    if (block.type === "list") {
      const isOrdered = block.format === "ordered";
      const ListTag = isOrdered ? "ol" : "ul";

      return (
        <ListTag
          key={index}
          className={`mb-8 ml-6 space-y-4 text-gray-800 ${
            isOrdered ? "list-decimal" : "list-disc"
          }`}
        >
          {block.children.map((item, i) => (
            <li key={i} className="pl-2 leading-relaxed">
              {renderChildren(item.children)}
            </li>
          ))}
        </ListTag>
      );
    }

    // 4. Handle Quotes
    if (block.type === "quote") {
      return (
        <blockquote
          key={index}
          className="my-8 pl-6 border-l-4 border-blue-500 italic text-xl text-gray-700 bg-blue-50 py-4 pr-4 rounded-r-lg"
        >
          {renderChildren(block.children)}
        </blockquote>
      );
    }

    return null;
  });
};
