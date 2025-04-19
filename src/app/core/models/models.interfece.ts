export interface ISidebarItem {
  key: string;
  value: string;
  icon: string;
  url: string;
  isAdmin?: boolean;
  isCommon?: boolean;
}