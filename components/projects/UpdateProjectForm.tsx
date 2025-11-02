"use client";
import SelectMembersInput from "./SelectMembersInput";
import { projectCategory, projectPriority } from "@/constants/projects/project";

function UpdateProjectForm({ data, action }: TNewProjectForm) {
  return (
    <form
      id="update-project-form"
      className="w-full h-full overflow-y-auto"
      action={action}
    >
      <div className="w-full h-full flex flex-col gap-8  mt-4 items-start p-2">
        {/* for display */}
        <input
          type="text"
          name="project_id_display"
          placeholder="Project ID"
          required
          defaultValue={data?.project_id}
          disabled
          className="w-full focus:border-2 focus:outline-none border-solid bg-secondary/10 border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary hover:cursor-not-allowed"
        ></input>
        {/* Hidden field actually sent in form */}
        <input type="hidden" name="projectId" value={data?.project_id} />
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          required
          defaultValue={data?.name}
          className="w-full focus:border-2 focus:outline-none border-solid border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary"
        ></input>
        <textarea
          name="projectDescription"
          placeholder="Project Description"
          defaultValue={data?.description}
          className="w-full focus:border-2 focus:outline-none border-solid resize-y min-h-[100px] border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary"
        ></textarea>
        <select
          required
          name="projectPriority"
          defaultValue={
            projectPriority.find((priority) => priority.label == data?.priority)
              ?.value ?? ""
          }
          className="w-full border border-primary rounded-sm h-10 p-2 focus:border-2 focus:border-primary focus:outline-none appearance-none bg-white"
        >
          <option value="" disabled>
            Select Priority
          </option>
          {projectPriority.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>
        <select
          required
          name="projectCategory"
          defaultValue={
            projectCategory.find((category) => category.label == data?.category)
              ?.value ?? ""
          }
          className="w-full border border-primary rounded-sm h-10 p-2 focus:border-2 focus:border-primary focus:outline-none appearance-none bg-white"
        >
          <option value="" disabled>
            Select Category
          </option>
          {projectCategory.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <SelectMembersInput data={data?.members} />
      </div>
    </form>
  );
}

type TNewProjectForm = {
  data: any;
  action: any;
};

export default UpdateProjectForm;
