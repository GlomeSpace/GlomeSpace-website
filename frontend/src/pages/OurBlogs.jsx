import { Button } from "@/components/ui/button";
import { NewsletterForm } from "../components/NewsLetterForm";
export const BlogPosts = () => {
  const GLOMESPACE_APP_URL = import.meta.env.VITE_GLOMESPACE_APP_URL;

  return (
    <div className="min-h-screen font-headerFont bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <section className="pt-20 bg-blue-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col h-300 md:h-max md:flex-row gap-2 items-center">
            <div className=" mt-20 md:w-7/10 h-100  text-center lg:text-left">
              <p className=" md:mt-10 font-bold text-gray-900 text-[20px]">
                We're still working on this page, but in the meantime, join our
                newsletter here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
                {/**
                * <Button className="text-[13px] px-2  bg-blue-400">
                  <a
                    href={`https://letter.glomespace.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit our Newsletter
                  </a>
                </Button>
                */}
              </div>
            </div>

            <div className=" flex flex-col  items-center justify-center  gap-5 h-100 md:h-100 md:w-6/10">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
