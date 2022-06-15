import { createContext } from "react";
import { ISecurityContextValue } from "../ModuleSecurityWrapper.interfaces";

export const SecurityContext = createContext<ISecurityContextValue>({
  requiredRoles: [],
  userRoles: [],
});

export default SecurityContext;
