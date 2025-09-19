import { IUserDetails } from "./user";

interface IProject {
  project_id: string;
  name: string;
  description?: string;
  archived: boolean;
  planned_start_date?: string;
  planned_end_date?: string;
  actual_start_date?: string;
  actual_end_date?: string;
  budget?: number;
  lead: IUserDetails;
  priority: string;
  category: string;
  stage?: string;
  members?: IUserDetails[];
}

export type { IProject };
