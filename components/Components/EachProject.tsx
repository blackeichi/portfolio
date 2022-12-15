import Link from "next/link";
import React from "react";
import { cls } from "../../utils/utils";
import { Tproject } from "../Page/Project";
import { HoveredText } from "./HoveredText";

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
        <div
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
        </div>
        <div
          id="Project_subtitle"
          className={cls("flex flex-col", right ? " items-end" : "")}
        >
          <div className="flex max-w-fit py-6 text-4xl">
            <h1>{project.subtitle}</h1>
          </div>
          <div
            style={{ borderBottom: "3px solid rgba(0,0,0,0.7)" }}
            className="h-1 w-40"
          ></div>
        </div>
        <div
          id="Project_stack"
          className={cls("flex flex-col", right ? " items-end" : "")}
        >
          <div
            className={cls(
              "flex flex-wrap gap-3 py-6",
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
        </div>
        <div
          id="Project_func"
          className={cls(
            "flex flex-col gap-3 py-6 font-GothicA1Light font-semibold",
            right ? " items-end" : ""
          )}
        >
          {project.function.map((func, index) => (
            <h1 key={index}>{func}.</h1>
          ))}
        </div>
        <div
          id="Project_Link"
          className={cls("flex gap-6", right ? " justify-end" : "")}
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
        </div>
      </div>
      <div className="relative mt-14 flex w-screen flex-col items-center py-14 px-10">
        <div className="absolute top-0 h-full w-full py-14 px-10">
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
        </div>
        <div
          className={cls(
            "z-10 mt-14 flex w-full grid-cols-2 gap-2 overflow-x-scroll md:my-14 md:grid md:overflow-clip"
          )}
        >
          {project.image.map((pic, index) => (
            <img className="ProjectImg " key={index} src={pic} />
          ))}
          <div className="hidden h-full w-full md:flex"></div>
        </div>
        <div
          style={{ height: "300px" }}
          className="h-70 mb-14 flex w-full bg-black md:hidden"
        ></div>
      </div>
    </div>
  );
};
