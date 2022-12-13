type TStack = {
  src: string;
};

export const StackIcon = ({ src }: TStack) => {
  return <img src={src} className="h-7" />;
};
