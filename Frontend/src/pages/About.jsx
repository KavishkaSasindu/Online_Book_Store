import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Alexandra Rivers",
      role: "Founder & CEO",
      bio: "Book enthusiast with 15 years in publishing who believes everyone deserves access to quality literature.",
      image:
        "https://t4.ftcdn.net/jpg/04/04/84/35/360_F_404843510_CVgjxWxhW2ipkOM8Vuk5IQEnc1Q54by6.jpg",
    },
    {
      name: "Marcus Chen",
      role: "Head Curator",
      bio: "Former librarian with a passion for discovering hidden literary gems and connecting readers with their perfect match.",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Nora Patel",
      role: "Community Manager",
      bio: "Literary critic and social media expert dedicated to building our vibrant community of book lovers.",
      image:
        "https://img.freepik.com/free-photo/selfie-portrait-videocall_23-2149186122.jpg",
    },
  ];

  // Timeline/milestones data
  const milestones = [
    {
      year: 2018,
      title: "Our Beginnings",
      description:
        "BookHaven started as a small online community of passionate readers.",
    },
    {
      year: 2020,
      title: "Launch of BookHaven Store",
      description:
        "We expanded into e-commerce, offering carefully curated books across all genres.",
    },
    {
      year: 2022,
      title: "Author Partnership Program",
      description:
        "Launched initiatives to support independent authors and publishers.",
    },
    {
      year: 2024,
      title: "Community Milestone",
      description: "Reached 500,000 members in our global reading community.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-80 bg-[#504B38] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#504B38] opacity-90"></div>
          {/* Decorative book patterns */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  width: `${Math.random() * 40 + 20}px`,
                  height: `${Math.random() * 60 + 40}px`,
                  backgroundColor: "#B9B28A",
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Story
          </h1>
          <div className="w-16 h-1 bg-[#EBE5C2] mb-6"></div>
          <p className="text-[#EBE5C2] text-xl max-w-2xl">
            A journey of passion, community, and a shared love for the written
            word.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[#504B38] mb-10">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            At BookHaven, we believe that books have the power to transform
            lives, expand horizons, and build bridges between people and
            cultures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-[#dfded5] rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#504B38] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#504B38] mb-3">
                Curate
              </h3>
              <p className="text-gray-700">
                We carefully select books that inspire, challenge, and delight
                readers of all ages and interests.
              </p>
            </div>

            <div className="p-6 bg-[#dfded5] rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#504B38] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#504B38] mb-3">
                Connect
              </h3>
              <p className="text-gray-700">
                We build bridges between authors and readers, creating a vibrant
                community bound by a love of literature.
              </p>
            </div>

            <div className="p-6 bg-[#dfded5] rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#504B38] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#504B38] mb-3">
                Inspire
              </h3>
              <p className="text-gray-700">
                We empower readers to explore new worlds and perspectives
                through the transformative power of books.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-16 px-6 bg-[#EBE5C2]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-[#504B38] mb-12 text-center">
            Our Journey
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#504B38] opacity-30"></div>

            {/* Timeline items */}
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative mb-16 flex ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2">
                  <div className="w-10 h-10 rounded-full bg-[#504B38] border-4 border-[#EBE5C2] flex items-center justify-center text-white font-bold">
                    {milestone.year.toString().slice(2)}
                  </div>
                </div>
                <div className="md:w-1/2 ml-12 md:ml-0 md:px-12">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-[#504B38] mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-[#B9B28A] mb-3">
                      {milestone.year}
                    </p>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      {/* Personal Profile Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="px-2 py-2 font-bold">About Me</div>
            <div className="md:flex">
              {/* Profile Details */}
              <div className=" p-8">
                <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
                  Aspiring | DevOps Engineer
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  I am third-year undergraduate in Computer Networks, passionate
                  about bridging the gap between development and operations. I
                  thrive on automating infrastructure, optimizing CI/CD
                  pipelines, and transforming complex technical challenges into
                  elegant solutions.
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">
                    Tech Ecosystem
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Docker",
                      "SpringBoot",
                      "React",
                      "Ansible",
                      "Jenkins",
                      "Terraform",
                      "AWS",
                      "Git",
                      "Linux",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-600 text-white rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 items-center">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2C3E50] hover:text-[#3498DB] transition duration-300 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="sr-only">GitHub Profile</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2C3E50] hover:text-[#3498DB] transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span className="sr-only">LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-[#504B38] text-black">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center bg-opacity-20 bg-white p-6 rounded-lg">
              <div className="md:w-1/6 flex justify-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-[#EBE5C2] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#504B38]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>
              <div className="md:w-5/6 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p>
                  We maintain the highest standards in our book selections,
                  business practices, and community engagement.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center bg-opacity-20 bg-white p-6 rounded-lg">
              <div className="md:w-1/6 flex justify-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-[#EBE5C2] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#504B38]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="md:w-5/6 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Diversity</h3>
                <p>
                  We celebrate diverse voices, perspectives, and stories that
                  reflect the richness of human experience.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center bg-opacity-20 bg-white p-6 rounded-lg">
              <div className="md:w-1/6 flex justify-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-[#EBE5C2] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#504B38]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="md:w-5/6 md:pl-6">
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p>
                  We continuously seek new ways to enhance the reading
                  experience and connect people through literature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 px-6 bg-[#dfded5]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[#504B38] mb-6">
            Join Our Story
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Become part of our community of book lovers and help us write the
            next chapter of BookHaven's journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-[#504B38] text-white rounded-md hover:bg-[#3A3728] transition duration-300 shadow-md"
            >
              Create Account
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-[#504B38] rounded-md border border-[#504B38] hover:bg-gray-50 transition duration-300 shadow-md"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - you can reuse the footer from your Home component */}
    </div>
  );
};

export default About;
