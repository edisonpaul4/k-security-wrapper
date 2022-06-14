import React from "react";
import { RoleModel } from "../../models/Role";

export interface ISecurityComponentWrapperProps {
  children?: React.ReactNode;
  componentId?: string;
  requiredRoles?: RoleModel[];
  userRoles?: string[];
}
