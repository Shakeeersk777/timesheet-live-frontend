export interface IEmployee {
  EmployeeId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  ActiveStatus: boolean;
  AssignedProjects: string[];
  IsAdmin: boolean;
  CreatedDate: Date;
  LastUpdate: Date;
  AssignedProjectsList?: IAssignedProjectList[];
}

export interface ICreateEmployee {
  FirstName: string;
  LastName: string;
  Email: string;
}

export interface IEditEmployee {
  FirstName: string;
  LastName: string;
  Email: string;
  ActiveStatus: boolean;
}

export interface IAssignedProjectList {
  ProjectId: string;
  ProjectName: string;
}
