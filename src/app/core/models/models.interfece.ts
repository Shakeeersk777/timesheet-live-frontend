export interface ISidebarItem {
  key: string;
  value: string;
  icon: string;
  url: string;
  isAdmin?: boolean;
  isCommon?: boolean;
}

export interface IApiResponce {
  _status: boolean;
  _msg: string;
  _data: any;
}

export interface IColumnDef {
  key: string;
  header: string;
  type?: 'date' | null;
}

export interface IEmployeeDropdown {
  EmployeeId: string;
  FullName: string;
}

export interface ITaskDropdown {
  TaskId: string;
  TaskName: string;
}

export interface IProjectDropdown {
  ProjectId: string;
  ProjectName: string;
}

export interface IDropdownResponse {
  employees: IEmployeeDropdown[];
  projects: IProjectDropdown[];
}

export interface IProjectAssignedDropdownResponse {
  projectId: string;
  projectName: string;
  employees: IEmployeeDropdown[];
  tasks: ITaskDropdown[];
}

export interface ILoginResponse {
  isAdmin: boolean;
  employeeId: string;
  employeeName: string;
  token: string;
}

export interface IHeaderButton {
  label: string;
  type?: 'primary' | 'secondary' | 'success' | 'danger';
  disabled?: boolean;
}
