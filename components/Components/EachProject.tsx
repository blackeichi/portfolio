import Link from "next/link";
import React from "react";
import { Tproject } from "../Containers/Project";

type Teach = {
  project: Tproject;
  index: number;
};

export const EachProject = ({ project, index }: Teach) => {
  return (
    <div className="">
      <div id="Project_title" className="flex">
        <h1 className="px-10" style={{ borderRight: "1px solid black" }}>
          project {index + 1}
        </h1>
        <h1 className="px-10">{project.title}</h1>
      </div>
      <div id="Project_subtitle">
        <h1>{project.subtitle}</h1>
      </div>
      <div id="Project_stack">
        {project.stack.map((stack, index) => (
          <h1 key={index}>{stack}</h1>
        ))}
      </div>
      <div id="Project_func">
        {project.function.map((func, index) => (
          <h1 key={index}>{func}</h1>
        ))}
      </div>
      <div id="Project_Link">
        <Link target="_blank" href={project.Link.git}>
          GITHUB
        </Link>
        <Link target="_blank" href={project.Link.app}>
          SEE LIVE
        </Link>
        <Link target="_blank" href={project.Link.velog}>
          VELOG
        </Link>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        {project.image.map((pic, index) => (
          <img
            className="ProjectImg"
            key={index}
            style={{ width: "650px" }}
            src={pic}
          />
        ))}
        <div className="bg-slate-500" style={{ width: "650px" }}></div>
      </div>
    </div>
  );
};
