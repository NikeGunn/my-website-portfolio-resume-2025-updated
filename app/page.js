import React, { Suspense, lazy, memo } from "react";
import TopLoadingBarWrapper from "../components/TopLoadingBarWrapper";
import Animate from "../components/Animate";

const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));
const ProjectsFetcher = lazy(() => import("../components/ProjectsFetcher"));
const ChatComponent = lazy(() => import("../components/chat/ChatComponent"));

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
        <Animate animation="fade-up" delay="100">
          <h2 className="text-4xl font-extrabold text-teal-400 mb-6">Resume</h2>
          <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6 border border-teal-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Nikhil Bhagat</h3>
              <p className="text-lg text-teal-300 mb-4">Full-Stack Developer | AI & Android Specialist</p>
              <p className="text-base text-gray-300 mb-4">
                Full-Stack Developer with expertise in Next.js, React, Android, and AI-driven solutions. Delivering scalable, innovative applications for modern businesses.
              </p>
              <a
                href="/nikhil-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 underline hover:text-teal-300 transition-all duration-300"
              >
                Download Resume (PDF)
              </a>
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Preview</h4>
                <a
                  href="/nikhil-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/nikhil-resume-preview.png"
                    alt="Nikhil Bhagat Resume Preview"
                    className="w-full max-w-md mx-auto rounded-lg border border-gray-700 shadow-md hover:opacity-90 transition-all duration-300"
                    loading="lazy"
                  />
                </a>
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

        {/* Chat Section */}
        <section className="my-16">
          <Animate animation="fade-up" delay="100">
            <h2 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-[#30C2CB] to-teal-400 bg-clip-text text-transparent text-center">
              Chat With My First AI Model Hauba<span className="text-white">💬</span>
            </h2>
            <div className="max-w-3xl mx-auto text-center mb-8">
              <p className="text-lg text-gray-300 leading-relaxed">
                Have questions about my projects, skills, or experience? My AI assistant is ready to help you learn more about me and my work. Feel free to start a conversation!
              </p>
            </div>
            <div className="flex justify-start w-full max-w-4xl mx-auto px-4 md:px-0">
              <Suspense fallback={
                <div className="h-96 flex items-center justify-center w-full">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-[#30C2CB] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-[#30C2CB]">Loading chat interface...</p>
                  </div>
                </div>
              }>
                <ChatComponent />
              </Suspense>
            </div>
          </Animate>
        </section>
      </main>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default memo(Home);