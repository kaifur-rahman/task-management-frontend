"use client";
import SelectMembersInput from "./SelectMembersInput";
import { projectCategory, projectPriority } from "@/constants/projects/project";

function NewProjectForm({ action }) {
  return (
    <form
      id="add-project-form"
      className="w-full h-full overflow-y-auto"
      action={action}
    >
      <div className="w-full h-full flex flex-col gap-8  mt-4 items-start p-2">
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          required
          className="w-full focus:border-2 focus:outline-none border-solid border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary"
        ></input>
        <textarea
          name="projectDescription"
          placeholder="Project Description"
          className="w-full focus:border-2 focus:outline-none border-solid resize-y min-h-[100px] border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary"
        ></textarea>
        <select
          required
          name="projectPriority"
          className="w-full border border-primary rounded-sm h-10 p-2 focus:border-2 focus:border-primary focus:outline-none appearance-none bg-white"
        >
          <option value="" disabled selected>
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
          className="w-full border border-primary rounded-sm h-10 p-2 focus:border-2 focus:border-primary focus:outline-none appearance-none bg-white"
        >
          <option value="" disabled selected>
            Select Category
          </option>
          {projectCategory.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <SelectMembersInput />
      </div>
    </form>
  );
}

export default NewProjectForm;
