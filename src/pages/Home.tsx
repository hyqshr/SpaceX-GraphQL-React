import React from "react";
import backgroundImage from "assets/image/spacex-bg.jpg";
import { ScrollToTop } from "components/util";
import Panel from "components/Panel";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-200 dark:bg-[#25282a] min-h-screen">
      <div className="relative pb-48 bg-gray-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={backgroundImage}
            alt="Rocket Launch"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            SpaceX Launches
          </h1>
        </div>
      </div>

      <section
        className="mt-16 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <Panel />
      </section>

      <ScrollToTop />
    </div>
  );
};
export default Home;
