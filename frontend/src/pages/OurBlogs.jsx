import {
  NewsletterForm,
  ThinNewsletterForm,
} from "../components/NewsLetterForm";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FlightDetailsComponent } from "../components/FlightDetailsComponent";
import {
  BlogComponent,
  BlogComponentSkeleton,
} from "../components/BlogComponent";
import { useFetch } from "../hooks/useFetch";

export const BlogPosts = () => {
  const GLOMESPACE_APP_URL = import.meta.env.VITE_GLOMESPACE_APP_URL;
  const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;

  const { loading, error, data } = useFetch(
    `${STRAPI_API_URL}/api/blogs?populate=*`,
  );

  return (
    <div className="min-h-screen font-headerFont bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <section className="pt-20 bg-blue-100 sm:px-6 lg:px-8">
        <div className="">
          <div className="flex flex-col-reverse md:flex-row  md:gap-2 items-center">
            <div className="px-8 w-full md:w-7/10  mt-10  text-center lg:text-left">
              <SlotMachine />

              <p className=" md:mt-10 font-bold text-gray-900 text-[20px]">
                Read some of our latest blogs and insights on logistics, travel,
                e-commerce and more.
              </p>
              <p className=" mt-3 md:mt-10 ">
                Are you a logistics enthusiast, a traveler, an e-commerce seller
                or just curious about the future of travel and logistics? Our
                blog covers a wide range of topics related to the logistics
                industry, travel trends, e-commerce insights, innovation in
                logistics and much more. Stay informed and inspired with our
                latest blog
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
                <Button className="text-[13px] px-2  bg-blue-400">
                  <a
                    href={`${GLOMESPACE_APP_URL}/find-deliverer`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Become a Deliverer
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center  gap-5 h-50 md:h-100 w-6/10">
              <div className="absolute top-0 md:left-80 ">
                <FlightDetailsComponent />
              </div>
              <div className="absolute bottom-0">
                <img src="/photos/blogimage.png" width={500} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <>
                <BlogComponentSkeleton />
                <BlogComponentSkeleton />
                <BlogComponentSkeleton />
                <BlogComponentSkeleton />
                <BlogComponentSkeleton />
                <BlogComponentSkeleton />
              </>
            ) : (
              <BlogComponent data={data} />
            )}
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row items-center w-full gap-5 py-20 px-4 sm:px-6 lg:px-8 bg-blue-100">
        <div className=" flex flex-col  gap-2 md:w-1/2 ">
          <p className="text-[20px] font-primaryFont">
            Join a growing community of nerds and other friendly readers that
            have Subscribed to our newsletter.
          </p>
          <NewsletterForm />
        </div>

        <div className="  md:w-1/2 ">
          <h2 className="font-semibold text-4xl text-center md:text-left md:text-5xl font-fancyFontAgain mb-5">
            Subscribe to our newsletter
          </h2>
          <p className="font-primary text-xl text-center">
            Each week, through our newsletter, We craft and share thoughtful
            insights, actionable strategies, and carefully curated resources
            that are meant to empower you on your journey. It’s a personal note
            from us to you delivered straight to your inbox. Designed to help
            you stay informed, inspired, and connected to the latest trends and
            insights in the world of logistics, travel, e-commerce and more.
          </p>
        </div>
      </div>
    </div>
  );
};

const words = [
  "logistics",
  "technology",
  "travel",
  "e-commerce",
  "sustainability",
  "innovation",
  "globalization",
  "supply chain",
  "mobility",
  "future of travel",
];

const SlotMachine = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 font-bold">
      <h1 className="text-[20px] md:text-4xl sm:text-5xl lg:text-5xl font-bold text-blue-900 ">
        At GlomeSpace, we keep you updated with latest insights from the{" "}
        <span className="inline-flex h-max overflow-hidden px-2 rounded align-bottom ">
          <AnimatePresence mode="wait">
            <motion.div
              key={words[index]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-blue-900"
            >
              {words[index]}
            </motion.div>
          </AnimatePresence>
        </span>
        world.
      </h1>
    </div>
  );
};
