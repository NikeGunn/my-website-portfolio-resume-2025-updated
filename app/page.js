import React, { Suspense, lazy, memo } from "react";
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
          <Animate animation="fade-up" delay="100">
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Crafting the Future of the Web | Android | AI
            </h1>
          </Animate>
          <Animate animation="fade-up" delay="200">
            <p className="mt-4 text-lg text-gray-300">
              Empowering businesses and individuals with clean code, innovative solutions, and creative designs to drive digital transformation.
            </p>
          </Animate>
        </section>

        {/* About Section */}
        <section className="text-center mb-12 px-4">
          <Animate animation="fade-up" delay="400">
            <h2 className="text-4xl font-extrabold text-teal-400 mb-6">About Me</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I am a passionate Full-Stack Developer specializing in creating scalable, secure, and high-performance applications. With expertise in AI, machine learning (ML), deep learning (DL), and generative AI (GenAI) technologies, I tackle complex challenges to deliver cutting-edge solutions that make a meaningful impact on businesses and industries worldwide.
            </p>
          </Animate>
        </section>

     {/* Resume Section */}
      <section className="text-center my-12 px-4">
        <Animate animation="fade-up" delay="600">
          <h2 className="text-4xl font-extrabold text-teal-400 mb-6">Resume</h2>
          <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6 border border-teal-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Nikhil Bhagat</h3>
              <p className="text-lg text-teal-300 mb-4">Full-Stack Developer | AI & Android Specialist</p>
              <p className="text-base text-gray-300 mb-4">
                Full-Stack Developer with expertise in Next.js, React, Android, and AI-driven solutions. Delivering scalable, innovative applications for modern businesses.
              </p>
              <a
                href="/nikhil-resume.pdf" // Ensure this matches your file in public/nikhil-resume.pdf
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 underline hover:text-teal-300 transition-all duration-300"
              >
                Download Resume (PDF)
              </a>
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Preview</h4>
                <iframe
                  src="/nikhil-resume.pdf" // Matches your file in public/nikhil-resume.pdf
                  width="100%"
                  height="300"
                  className="rounded-lg border border-gray-700"
                  title="Nikhil Bhagat Resume Preview"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
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