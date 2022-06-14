import { RoleModel } from "../../../models/Role";

export interface IUseSecurityModuleWrapperState {
  allow: boolean;
  requiredRoles: RoleModel[];
  userRoles: string[];
}