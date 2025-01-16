import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectsFetcher from "../components/ProjectsFetcher";
import Animate from "../components/Animate"; // Import the Animate component
import TopLoadingBarWrapper from "../components/TopLoadingBarWrapper"; // Import the TopLoadingBarWrapper

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <TopLoadingBarWrapper /> {/* Add this component at the top to display the loading bar */}
      <Header />
      <main className="container mx-auto px-8 py-12">
        {/* Profile Section */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img
              src="https://github.com/NikeGunn/imagess/blob/main/nikhil.png?raw=true" // Replace with your profile image URL
              alt="Profile Image of Nikhil Bhagat"
              className="w-40 h-40 rounded-full border-4 border-teal-500 shadow-lg object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
            />
          </div>

          <Animate animation="fade-up" delay="100">
            <h1 className="text-6xl font-extrabold gradient-text">
              Crafting the Future of the Web | Android | AI
            </h1>
          </Animate>

          <Animate animation="fade-up" delay="200">
            <p className="mt-4 text-lg text-gray-300">
              Empowering businesses and individuals with clean code, innovative solutions, and creative designs to drive digital transformation.
            </p>
          </Animate>
        </section>

        {/* About Me Section */}
        <section className="text-center mb-12 px-4">
          <Animate animation="fade-up" delay="400">
            <h2 className="text-4xl font-extrabold text-teal-400 mb-6">
              About Me
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I am a passionate Full-Stack Developer specializing in creating scalable, secure, and high-performance applications. With expertise in AI, machine learning (ML), deep learning (DL), and generative AI (GenAI) technologies, I tackle complex challenges to deliver cutting-edge solutions that make a meaningful impact on businesses and industries worldwide.
            </p>
          </Animate>
        </section>

        {/* Technical Expertise Section */}
        <section className="text-center mb-12 px-4">
          <Animate animation="fade-up" delay="500">
            <h2 className="text-4xl font-extrabold text-teal-400 mb-6">
              My Technical Expertise in Full-Stack Development & AI
            </h2>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Animate animation="fade-right">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500">
                <h3 className="text-2xl font-semibold mb-4 text-teal-500">Backend Development</h3>
                <p className="text-gray-300">
                  Expertise in Django, building robust and scalable APIs that power web and mobile applications. Proficient in using Redis and Kafka for real-time data processing and message queues. Deep knowledge of Docker and Kubernetes for CI/CD pipeline automation, along with Grafana and Prometheus for system monitoring and performance analytics.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-left">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500">
                <h3 className="text-2xl font-semibold mb-4 text-teal-500">Frontend Development</h3>
                <p className="text-gray-300">
                  Advanced expertise in React.js, Next.js, and React Native, delivering high-performance, SEO-optimized, and user-friendly web and mobile applications. I ensure seamless, responsive, and interactive user experiences with a strong focus on scalability, performance, speed, and cutting-edge innovation.
                </p>
              </div>
            </Animate>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <Animate animation="fade-right">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500">
                <h3 className="text-2xl font-semibold mb-4 text-teal-500">AI, Machine Learning & MLOps</h3>
                <p className="text-gray-300">
                  Skilled in TensorFlow for developing, training, and deploying impactful machine learning and deep learning models. Expertise in MLOps for automating machine learning workflows and model lifecycle management. I also leverage GenAI technologies to build next-generation applications powered by artificial intelligence.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-left">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500">
                <h3 className="text-2xl font-semibold mb-4 text-teal-500">What Sets Me Apart.??</h3>
                <p className="text-gray-300">
                  Known for delivering creative, scalable solutions and for combining DevOps and MLOps practices to streamline workflows. A lifelong learner, I stay ahead of technological trends to integrate the latest advancements in AI, ML, and GenAI into practical, real-world applications.
                </p>
              </div>
            </Animate>
          </div>
        </section>

        {/* Looking For Section */}
        <section className="text-center mb-12 px-4">
          <Animate animation="fade-up" delay="600">
            <h2 className="text-4xl font-extrabold text-teal-400 mb-6">Opportunities I am Excited About</h2>
          </Animate>

          <Animate animation="fade-up" delay="800">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I am looking for opportunities to:
            </p>
            <ul className="text-lg text-gray-300 list-disc list-inside">
              <li>Design and develop scalable backend systems using cutting-edge technologies.</li>
              <li>Build innovative web and mobile applications that offer a seamless, user-friendly experience.</li>
              <li>Create and deploy AI-powered solutions that transform industries and drive efficiency.</li>
            </ul>
          </Animate>
        </section>

        {/* Client-side project fetching */}
        <ProjectsFetcher />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
