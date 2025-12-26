export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className={`font-bold text-xl sm:text-3xl text-gray-700`}>
      {children}
    </h1>
  );
};
