import React, { Suspense, lazy, memo, useMemo } from "react";
import TopLoadingBarWrapper from "../components/TopLoadingBarWrapper";
import Animate from "../components/Animate";

const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));
const ProjectsFetcher = lazy(() => import("../components/ProjectsFetcher"));

const ProfileImage = memo(() => (
  <div className="flex justify-center mb-6">
    <img
      src="https://github.com/NikeGunn/imagess/blob/main/nikhil.png?raw=true"
      alt="Profile Image of Nikhil Bhagat"
      className="w-40 h-40 rounded-full border-4 border-teal-500 shadow-lg object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
      loading="lazy"
    />
  </div>
));

const Home = () => {
  const fadeUp = useMemo(() => "fade-up", []);
  const fadeRight = useMemo(() => "fade-right", []);
  const fadeLeft = useMemo(() => "fade-left", []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <TopLoadingBarWrapper />
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>

      <main className="container mx-auto px-8 py-12">
        {/* Profile Section */}
        <section className="text-center mb-12">
          <ProfileImage />
          <Animate animation={fadeUp} delay="100">
            <h1 className="text-6xl font-extrabold gradient-text">
              Crafting the Future of the Web | Android | AI
            </h1>
          </Animate>
          <Animate animation={fadeUp} delay="200">
            <p className="mt-4 text-lg text-gray-300">
              Empowering businesses and individuals with clean code, innovative solutions, and creative designs to drive digital transformation.
            </p>
          </Animate>
        </section>

        {/* About Section */}
        <section className="text-center mb-12 px-4">
          <Animate animation={fadeUp} delay="400">
            <h2 className="text-4xl font-extrabold text-teal-400 mb-6">About Me</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I am a passionate Full-Stack Developer specializing in creating scalable, secure, and high-performance applications...
            </p>
          </Animate>
        </section>

        {/* Client-side project fetching */}
        <Suspense fallback={<div>Loading Projects...</div>}>
          <ProjectsFetcher />
        </Suspense>

        {/* Game Section */}
        <section className="text-center my-12">
          <h2 className="text-4xl font-extrabold text-teal-400 mb-6">Play My Game 🎮</h2>
          <p className="text-lg text-gray-300 mb-6">
            Try out my fun interactive game: <strong>"Hiring Manager Catching Nikhil - A Company Chaser"</strong>.
          </p>
          <div className="flex justify-center">
            <iframe
              src="/game/index.html"
              width="100%"
              height="500px"
              className="border-2 border-teal-500 rounded-lg shadow-lg"
              style={{ maxWidth: "800px" }}
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </main>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default memo(Home);
