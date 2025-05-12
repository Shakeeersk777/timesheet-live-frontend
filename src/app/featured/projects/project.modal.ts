export interface IProject {
  ProjectId: string;
  ProjectName: string;
  ProjectStatus: boolean;
  StartDate?: Date;
  TotalAllocatedHours?: number;
  TotalCompletedHours?: number;
  AssignedTo?: string[];
  CompletedDate?: Date;
  CreatedDate?: Date,
  LastUpdated?: Date;
  AssignedToList?: AssignedToList[];
}

export interface ICreateProject {
  ProjectName: string;
  TotalAllocatedHours?: number;
}

export interface IUpdateProject {
  ProjectName: string;
  ProjectStatus: boolean;
  StartDate: Date;
  TotalAllocatedHours: number;
  TotalCompletedHours: number;
  AssignedTo: string[];
  CompletedDate: Date;
}

export interface AssignedToList {
  EmployeeId: string;
  FirstName: string;
  LastName: string;
}
