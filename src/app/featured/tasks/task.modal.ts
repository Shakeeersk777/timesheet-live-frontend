export interface ITask {
  TaskId: string;
  ProjectId: string;
  TaskName: string;
  CreatedDate: Date;
  TaskStatus: boolean;
  TotalAllocatedHours: number;
  TotalWorkedHours?: number;
  StartDate: Date;
  EndDate: Date;
  CompletedDate?: Date;
  LastUpdated: Date;
  AssignedTo: string[];
  AssignedEmployeesList?: string[]
}

export interface ITaskUpdatePayload {
  TaskName: string;
  TaskStatus: boolean;
  TotalAllocatedHours: number;
  StartDate: Date;
  EndDate: Date;
  CompletedDate?: Date;
  AssignedTo: string[];
}


export interface ICreateTaskPayload {
  ProjectId: string;
  TaskName: string;
  TotalAllocatedHours: number;
}

export interface IAssignTaskPayload {
  StartDate: Date;
  EndDate: Date;
  AssignTo: string[]; // Array of Employee IDs
}
