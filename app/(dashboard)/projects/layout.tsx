import Projects from "@/components/projects/Projects";
function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full p-4 flex flex-col">
      <Projects />
      {children}
    </div>
  );
}

export default layout;
