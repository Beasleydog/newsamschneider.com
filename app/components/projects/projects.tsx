import customTab from "../../../public/projects/customtab.png";
import dining from "../../../public/projects/dining.png";
import helper from "../../../public/projects/helper.png";
import image from "../../../public/projects/image.png";
import lights from "../../../public/projects/lights.png";
import udpl from "../../../public/projects/udpl.png";
import elonvector from "../../../public/projects/elonvector.png";
import autostreamerclip from "../../../public/projects/autostreamerclip.png";
import { useWindowWidth } from "@/app/helpers/useWindowWidth";

export default function Projects() {
  const small = useWindowWidth() < 768;
  const BASE_TOP_VW = 10;
  const projects = [
    {
      image: elonvector,
      position: { left: "2%", topOffset: -12, width: "45vw" },
      title: "Elon Vector",
      titleAlign: "right" as const,
      link: "https://huggingface.co/spaces/beasleydogai/elonfeature",
      animationDelay: 3,
      zIndex: 27,
      rotation: "2" as const,
    },
    {
      image: autostreamerclip,
      position: { left: "62%", topOffset: 0, width: "50vw" },
      title: "Auto Streamer Clip",
      titleAlign: "left" as const,
      link: "https://github.com/Beasleydog/autostreamerclip",
      animationDelay: 3.5,
      zIndex: 26,
      rotation: "-2" as const,
    },
    {
      image: image,
      position: { left: "10%", topOffset: 20, width: "45vw" },
      title: "Magic Image Editor",
      titleAlign: "right" as const,
      link: "https://github.com/Beasleydog/imageeditor",
      animationDelay: 0,
      zIndex: 20,
      rotation: "2" as const,
    },
    {
      image: dining,
      position: { left: "65%", topOffset: 35, width: "40vw" },
      title: "MDining Stats",
      titleAlign: "left" as const,
      link: "https://github.com/Beasleydog/diningstats",
      animationDelay: 0.5,
      zIndex: 21,
      rotation: "-2" as const,
    },
    {
      image: lights,
      position: { left: "-10%", topOffset: 57.5, width: "45vw" },
      title: "Holiday Lights",
      titleAlign: "right" as const,
      link: "https://github.com/Beasleydog/christmaslights",
      animationDelay: 1,
      zIndex: 22,
      rotation: "2" as const,
    },
    {
      image: customTab,
      position: { left: "45%", topOffset: 65, width: "42vw" },
      title: "CustomTab Extension",
      titleAlign: "left" as const,
      link: "https://github.com/Beasleydog/customTab",
      animationDelay: 1.5,
      zIndex: 23,
      rotation: "-2" as const,
    },
    {
      image: helper,
      position: { left: "5%", topOffset: 90, width: "43vw" },
      title: "AI Helper",
      titleAlign: "right" as const,
      link: "https://github.com/Beasleydog/aiHelper",
      animationDelay: 2,
      zIndex: 24,
      rotation: "2" as const,
    },
    {
      image: udpl,
      position: { left: "55%", topOffset: 95, width: "50vw" },
      title: "UDPL Books",
      titleAlign: "left" as const,
      link: "https://www.udplbooks.org/",
      animationDelay: 2.5,
      zIndex: 25,
      rotation: "-2" as const,
    },
  ];

  if (small) {
    return (
      <div
        id="projects"
        className="w-full overflow-hidden relative mt-24 px-[5vw] pb-[10vw]"
      >
        <div className="flex flex-col gap-[8vw]">
          {projects.map((project, index) => (
            <div
              key={index}
              className="animate-float cursor-pointer overflow-hidden rounded-2xl"
              style={{
                animationDelay: `${project.animationDelay}s`,
              }}
              onClick={() => window.open(project.link, "_blank")}
            >
              <div className="relative shadow-sm rounded-2xl overflow-hidden">
                <img
                  src={project.image.src}
                  alt={`project-${index}`}
                  className="h-auto w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-[4vw] text-white">
                    <h3 className="text-[5vw] font-bold leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-[3vw] text-gray-300 break-all">
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

  return (
    <div
      id="projects"
      className="w-full h-[140vw] overflow-hidden relative mt-24"
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
              top: `${BASE_TOP_VW + project.position.topOffset}vw`,
              animationDelay: `${project.animationDelay}s`,
              zIndex: project.zIndex,
            }}
            onClick={() => window.open(project.link, "_blank")}
          >
            <div className="relative group shadow-sm transition-all duration-300 hover:rounded-2xl">
              <img
                src={project.image.src}
                alt={`project-${index}`}
                className={`h-auto transform rotate-${project.rotation} transition-all duration-300 hover:rounded-2xl`}
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
