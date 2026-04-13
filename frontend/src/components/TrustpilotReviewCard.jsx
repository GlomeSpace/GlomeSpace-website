import React from "react";
import { Star, ExternalLink } from "lucide-react";

export const TrustpilotReviewCard = () => {
  // Replace this with your actual Trustpilot profile link
  const TRUSTPILOT_LINK = "https://www.trustpilot.com/review/glomespace.com";

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-gray-100 shadow-sm">
          {/* Left Side: Branding & Trust Signal */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-1 mb-4">
              {/* Trustpilot Star Icon logic */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-[#00b67a] p-1 rounded-sm">
                  <Star size={18} fill="white" color="white" />
                </div>
              ))}
              <span className="ml-3 font-bold text-gray-900 text-xl tracking-tight">
                Trustpilot
              </span>
            </div>

            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Our community trusts us.
            </h2>
            <p className="text-gray-600 max-w-md">
              We believe in 100% transparency. Read what shipment owners and
              travelers have to say about their GlomeSpace experience.
            </p>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="mt-8 md:mt-0 flex flex-col sm:flex-row gap-4">
            <a
              href={TRUSTPILOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00b67a] text-white font-semibold rounded-lg hover:bg-[#00a36c] transition-colors"
            >
              Rate us on Trustpilot
              <ExternalLink size={18} />
            </a>

            <a
              href={TRUSTPILOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Read our reviews
            </a>
          </div>
        </div>

        {/* Sub-text disclaimer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Verified customer feedback powered by Trustpilot®
        </p>
      </div>
    </section>
  );
};
