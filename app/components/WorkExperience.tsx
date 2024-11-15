import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { SkillStack } from "./SkillStack";
import { experiences } from "../constants/experiences";

type ExperienceType = "internship" | "freelance" | "volunteer" | null;

export function WorkExperience() {
  const [selectedType, setSelectedType] = useState<ExperienceType>(null);
  const [modifier, setModifier] = useState(1);

  useEffect(() => {
    setModifier(0);
  }, [selectedType]);

  const positionKey = (
    <motion.div
      className="flex gap-6 justify-center mb-6 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 * modifier, duration: 0.5 * modifier }}
    >
      <button
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          selectedType === "internship" || selectedType === null
            ? "bg-blue-500/20 text-blue-600 font-medium"
            : "bg-blue-500/5 text-gray-600"
        }`}
        onClick={() =>
          setSelectedType(selectedType === "internship" ? null : "internship")
        }
      >
        Internship
      </button>
      <button
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          selectedType === "freelance" || selectedType === null
            ? "bg-[#1bab08]/20 text-[#1bab08] font-medium"
            : "bg-[#1bab08]/5 text-gray-600"
        }`}
        onClick={() =>
          setSelectedType(selectedType === "freelance" ? null : "freelance")
        }
      >
        Freelance
      </button>
      <button
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
          selectedType === "volunteer" || selectedType === null
            ? "bg-purple-500/20 text-purple-600 font-medium"
            : "bg-purple-500/5 text-gray-600"
        }`}
        onClick={() =>
          setSelectedType(selectedType === "volunteer" ? null : "volunteer")
        }
      >
        Volunteer
      </button>
    </motion.div>
  );

  const filteredExperiences = selectedType
    ? experiences.filter((exp) => exp.type === selectedType)
    : experiences;

  return (
    <motion.div
      className="w-full max-w-4xl px-4 mt-16 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.8 * modifier }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 * modifier, duration: 0.5 * modifier }}
      >
        Work Experience
      </motion.h2>

      {positionKey}

      <div className="space-y-8">
        {filteredExperiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: (0.4 + index * 0.2) * modifier,
              duration: 0.5 * modifier,
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button
                      className={`px-2.5 py-1 rounded-full text-sm font-medium
                        ${
                          exp.type === "internship"
                            ? "bg-blue-500/20 text-blue-600"
                            : exp.type === "freelance"
                            ? "bg-[#1bab08]/20 text-[#1bab08]"
                            : "bg-purple-500/20 text-purple-600"
                        }`}
                    >
                      {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                    </button>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {exp.company}
                    </h3>
                  </div>
                  <SkillStack skills={exp.skills} />
                </div>
                <p className="text-gray-700">{exp.role}</p>
                <span className="text-sm text-gray-600">{exp.period}</span>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mt-4">
              {exp.highlights.map((highlight, i) => (
                <motion.li
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: (0.6 + index * 0.2 + i * 0.1) * modifier,
                    duration: 0.5 * modifier,
                  }}
                >
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {(selectedType === "freelance" || selectedType === null) && (
        <motion.p
          className="text-center mt-8 text-gray-700 px-3 py-2  
          relative bg-[#1bab0817] rounded-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 * modifier, duration: 0.8 * modifier }}
        >
          Check out my full{" "}
          <a
            href="https://www.upwork.com/freelancers/~015a070d319e28a0fa"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block px-2 py-1 rounded-md 
            text-[#1bab08] font-medium
            before:absolute before:inset-0 before:bg-white before:opacity-10 
            before:rounded-md before:transform before:scale-x-0 before:origin-left
            before:transition-transform before:duration-300 hover:before:scale-x-100"
          >
            Upwork profile
          </a>{" "}
          for other freelancing work.
        </motion.p>
      )}
    </motion.div>
  );
}
