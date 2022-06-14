import React from "react";
import { RoleModel } from "../../models/Role";

export interface ISecurityModuleWrapperProps {
  children?: React.ReactNode;
  componentId?: string;
  apiURL: string;
  // render: (userRoles: RoleModel[], )
}
