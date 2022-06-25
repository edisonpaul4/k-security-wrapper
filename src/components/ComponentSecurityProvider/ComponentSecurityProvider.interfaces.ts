import React from "react";
import { RoleModel } from "../../models/Role";

export interface ISecurityComponentProviderProps {
  children?: React.ReactNode;
  componentId?: string;
  requiredRoles?: RoleModel[];
  userRoles?: string[];
}
