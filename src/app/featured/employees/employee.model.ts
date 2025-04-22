export interface IEmployee {
  EmpId: string;
  EmpName: string;
  Email: string;
  Password: string;
  ActiveStatus: boolean;
  AssignedProject: string[];
  IsAdmin: boolean;
  CreatedDate: Date;
  LastUpdate: Date;
}

export interface ICreateEmployee {
  EmpName: string;
  Email: string;
  Password: string;
}
