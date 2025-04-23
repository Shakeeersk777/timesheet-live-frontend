export interface IProject {
  ProjectsId: string;
  ProjectsName: string;
  TaskType?: string[];
  ProjectsStatus: boolean;
  ReceivedDate?: Date;
  StartDate?: Date;
  TotalAllocatedHours?: number;
  TotalCompletedHours?: number;
  TotalCompletedPercetage?: string;
  AssignedBy?: string[];
  AssignedTo?: string[];
  CompletedDate?: Date;
  LastUpdatedDate?: Date;
  LatestUpdates?: string[];
}

export interface ICreateProject {
  ProjectName: string;
  TotalAllocatedHours: number;
}

export interface IUpdateProject {
  ProjectsId: string;
  ProjectsName: string;
  ReceivedDate: Date;
  StartDate: Date;
  TotalAllocatedHours: number;
  ProjectsStatus: boolean;
  AssignedTo: string[];
}
