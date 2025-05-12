import { IEmployee } from '../employees/employee.model';
import { IProject } from '../projects/project.modal';
import { ITask } from '../tasks/task.modal';

export interface ITimeSheetEntryPayload {
  EmployeeId: string;
  TaskId: string;
  ProjectId: string;
  StartDate: Date;
  EndDate: Date;
  Hours: string;
  Description: string;
}

export interface ITimesheet {
  Id: string;
  Employee: IEmployee;
  Project: IProject;
  Task: ITask;
  StartDate: Date;
  EndDate: Date;
  Hours: string;
  Status: TimesheetStatus;
  Description: string;
  CreatedDate: Date;
  LastUpdated: Date;
  StatusBorderColor?: string;
}

export enum TimesheetStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}
