import customTab from "../../../public/projects/customtab.png";
import dining from "../../../public/projects/dining.png";
import helper from "../../../public/projects/helper.png";
import image from "../../../public/projects/image.png";
import lights from "../../../public/projects/lights.png";
import udpl from "../../../public/projects/udpl.png";

export default function Projects() {
  const projects = [
    {
      image: image,
      position: { left: "5%", top: "10vw", width: "45vw" },
      title: "Magic Image Editor",
      titleAlign: "right" as const,
      link: "https://github.com/Beasleydog/imageeditor",
    },
    {
      image: dining,
      position: { left: "65%", top: "25vw", width: "40vw" },
      title: "MDining Stats",
      titleAlign: "left" as const,
      link: "https://github.com/Beasleydog/diningstats",
    },
    {
      image: lights,
      position: { left: "-10%", top: "47.5vw", width: "45vw" },
      title: "Holiday Lights",
      titleAlign: "right" as const,
      link: "https://github.com/Beasleydog/christmaslights",
    },
    {
      image: customTab,
      position: { left: "45%", top: "55vw", width: "42vw" },
      title: "CustomTab Extension",
      titleAlign: "left" as const,
      link: "https://github.com/Beasleydog/customTab",
    },
    {
      image: helper,
      position: { left: "5%", top: "80vw", width: "43vw" },
      title: "AI Helper",
      titleAlign: "right" as const,
      link: "https://github.com/Beasleydog/aiHelper",
    },
    {
      image: udpl,
      position: { left: "55%", top: "85vw", width: "50vw" },
      title: "UDPL Books",
      titleAlign: "left" as const,
      link: "https://www.udplbooks.org/",
    },
  ];

  return (
    <div
      id="projects"
      className="w-full h-[120vw] overflow-hidden relative mt-24"
    >
      <div className="w-full h-full absolute top-0 bg-gradient-to-b from-[#faf8f8] to-transparent z-10"></div>

      {/* Floating elements container */}
      <div className="w-full h-full relative">
        {projects.map((project, index) => (
          <div
            key={index}
            className="absolute animate-float cursor-pointer hover:rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              left: project.position.left,
              top: project.position.top,
              animationDelay: `${index * 0.5}s`,
              zIndex: 20 + index,
            }}
            onClick={() => window.open(project.link, "_blank")}
          >
            <div className="relative group shadow-sm transition-all duration-300 hover:rounded-2xl">
              <img
                src={project.image.src}
                alt={`project-${index}`}
                className={`h-auto transform rotate-${
                  index % 2 === 0 ? "2" : "-2"
                } transition-all duration-300 hover:rounded-2xl`}
                style={{
                  width: project.position.width,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 hover:rounded-2xl">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3
                    className="text-xl font-bold"
                    style={{
                      textAlign: project.titleAlign,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm text-gray-300"
                    style={{
                      textAlign: project.titleAlign,
                    }}
                  >
                    {project.link}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
