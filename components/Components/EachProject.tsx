import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { color } from "../../styles/color";
import { cls } from "../../utils/utils";
import { cardVariants } from "../Page/FrontCover";
import { Tproject } from "../Page/Project";
import { HoveredText } from "./HoveredText";
import { Subtitle } from "./Subtitle";

type Teach = {
  project: Tproject;
  index: number;
};

export const EachProject = ({ project, index }: Teach) => {
  const right = (index + 1) % 2 === 1 ? true : false;
  //짝수번째, 홀수번째에 따라 정렬 다르게 하기.
  return (
    <div
      className={cls(
        "flex w-full flex-col font-SF_HambakSnow font-semibold",
        right ? " items-end" : ""
      )}
    >
      <div className="px-10 md:px-28">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={cardVariants}
            id="Project_title"
            className={cls("flex flex-col", right ? " items-end" : "")}
          >
            <div className={"flex max-w-fit py-6"}>
              <div className="border-r border-solid border-gray-400 pr-10">
                project {index + 1}
              </div>
              <h1 className="pl-10 ">{project.title}</h1>
            </div>
            <div
              style={{ borderBottom: "3px solid rgba(0,0,0,0.7)" }}
              className="h-1 w-20"
            ></div>
          </motion.div>
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={cardVariants}
            id="Project_subtitle"
            className={cls("flex flex-col", right ? " items-end" : "")}
          >
            <div className="flex max-w-fit py-12 font-PuradakGentleGothicR text-4xl text-zinc-700">
              <h1>{project.subtitle}</h1>
            </div>
            <div
              style={{ borderBottom: "3px solid rgba(0,0,0,0.7)" }}
              className="h-1 w-40"
            ></div>
          </motion.div>
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={cardVariants}
            id="Project_stack"
            className={cls("flex flex-col", right ? " items-end" : "")}
          >
            <div
              className={cls(
                "flex flex-wrap gap-3 py-8",
                right ? " justify-end" : ""
              )}
            >
              {project.stack.map((stack, index) => (
                <h1 key={index}>{stack}</h1>
              ))}
            </div>
            <div
              style={{ borderBottom: "3px solid rgba(0,0,0,0.7)" }}
              className="h-1 w-40"
            ></div>
          </motion.div>
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={cardVariants}
            id="Project_func"
            className={cls(
              "flex flex-col gap-4 py-6 font-GothicA1Light font-semibold",
              right ? " items-end" : ""
            )}
          >
            {project.function.map((func, index) => (
              <h1 key={index}>{func}.</h1>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={cardVariants}
            id="Project_Link"
            className={cls("mt-7 flex gap-6", right ? " justify-end" : "")}
          >
            <Link target="_blank" href={project.Link.git}>
              <HoveredText btn={true} text="GITHUB" />
            </Link>
            <Link target="_blank" href={project.Link.app}>
              <HoveredText btn={true} text="SEE LIVE" />
            </Link>
            <Link target="_blank" href={project.Link.velog}>
              <HoveredText btn={true} text="VELOG" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mt-10 flex w-screen flex-col items-center py-14 px-10 xl:px-28"
      >
        <motion.div
          variants={cardVariants}
          className="absolute top-0 h-full w-full py-14 px-10 xl:px-28"
        >
          <h1
            className={cls(
              "absolute top-7 text-4xl ",
              right ? "left-20" : "right-20"
            )}
            style={{ color: project.color }}
          >
            {project.title}
          </h1>
          <div className="grid h-full grid-cols-2 ">
            <div
              style={
                right
                  ? { borderBottom: `3px solid ${project.color}` }
                  : { borderTop: `3px solid ${project.color}` }
              }
            ></div>
            <div
              style={
                right
                  ? { borderTop: `3px solid ${project.color}` }
                  : { borderBottom: `3px solid ${project.color}` }
              }
            ></div>
          </div>
        </motion.div>
        <motion.div
          variants={cardVariants}
          className="grid grid-rows-2 md:block"
        >
          <div
            className={cls(
              "scrollBox z-10 mt-14 flex w-full gap-2 overflow-x-scroll md:my-14 md:grid md:grid-cols-2 md:overflow-clip"
            )}
          >
            {project.image.map((pic, index) => (
              <img className="ProjectImg" key={index} src={pic} />
            ))}
            <div className="hidden h-full w-full justify-center gap-4 md:flex md:flex-col lg:gap-10">
              {project.description.map((des: any, index) => (
                <div className="font-GothicA1Light" key={index}>
                  <div
                    style={{
                      textShadow:
                        "-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white",
                    }}
                  >
                    <Subtitle
                      color={project.color}
                      size="20px"
                      text={des.title}
                      font={false}
                    />
                  </div>

                  <h1 className="mt-1 text-sm ">{des.text}</h1>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ height: "300px" }}
            className="mb-14 flex w-full flex-col justify-center gap-4 md:hidden lg:gap-10"
          >
            {project.description.map((des: any, index) => (
              <div className="font-GothicA1Light" key={index}>
                <Subtitle
                  color={color.brown}
                  size="17px"
                  text={des.title}
                  font={false}
                />
                <h1 className="mt-1 text-sm ">{des.text}</h1>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
