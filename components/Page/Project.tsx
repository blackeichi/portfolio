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
  color: string;
  description: any[];
};

export const Project = () => {
  const { projects } = data;
  return (
    <div
      id="project"
      className="flex min-h-screen w-full items-center py-10 pt-28"
    >
      <div
        className="flex w-full flex-col items-center justify-center gap-28 md:items-start "
        style={{
          borderBottom: `3px solid ${color.brown}`,
          minHeight: "90vh",
        }}
      >
        <div className="md:px-28">
          <Subtitle color={color.greenColor} size="40px" text="Projects" />
        </div>
        {projects.map((project: Tproject, index) => (
          <div key={index}>
            <EachProject project={project} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};
