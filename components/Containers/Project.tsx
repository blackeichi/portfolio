import { color } from "../../styles/color";
import { EachProject } from "../Components/EachProject";
import { Subtitle } from "../Components/Subtitle";
import data from "../../utils/data.json";

export type Tproject = {
  title: string;
  subtitle: string;
  stack: string[];
  function: string[];
  Link: {
    git: string;
    app: string;
    velog: string;
  };
  image: string[];
};

export const Project = () => {
  const projects = data.projects;
  return (
    <div className="flex min-h-screen w-full items-center">
      <div
        className="flex w-full flex-col items-center justify-center md:items-start md:pl-28"
        style={{
          borderBottom: `3px solid ${color.brown}`,
          minHeight: "90vh",
        }}
      >
        <Subtitle color={color.greenColor} size="40px" text="Projects" />
        {projects.map((project: Tproject, index) => (
          <div key={index}>
            <EachProject project={project} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};
