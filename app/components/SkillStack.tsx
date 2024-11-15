import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { BRAND_COLORS } from "../constants/colors";

interface Skill {
  icon: React.ComponentType;
  name: keyof typeof BRAND_COLORS;
}

interface SkillStackProps {
  skills: Skill[];
}

export function SkillStack({ skills }: SkillStackProps) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <div className="relative h-[120px] w-[120px]">
        <div className="absolute right-0 flex">
          {skills.map((skill) => (
            <Tooltip.Root key={skill.name}>
              <Tooltip.Trigger asChild>
                <div
                  className="rounded-full p-2"
                  style={{
                    backgroundColor: `${BRAND_COLORS[skill.name]}15`,
                  }}
                >
                  {React.createElement(skill.icon, {
                    className: "w-6 h-6",
                    style: { color: BRAND_COLORS[skill.name] },
                  })}
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="rounded-md px-3 py-1.5 text-sm bg-gray-800/95 text-gray-100 
                    shadow-lg border border-gray-700 select-none
                    animate-in fade-in-0 zoom-in-95 
                    data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
                    data-[state=closed]:zoom-out-95 backdrop-blur-sm"
                  sideOffset={5}
                >
                  {skill.name}
                  <Tooltip.Arrow className="fill-gray-800/95" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          ))}
        </div>
      </div>
    </Tooltip.Provider>
  );
}
