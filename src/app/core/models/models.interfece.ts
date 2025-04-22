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
  _data: any
}
