import React from "react";
import { RoleModel } from "../../models/Role";

export interface ISecurityComponentWrapperProps {
  children?: React.ReactNode;
  requiredRoles?: RoleModel[];
  componentId?: string;
  userRoles?: string[];
}
