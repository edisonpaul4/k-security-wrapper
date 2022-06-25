import { IUseSecurityWrapperState } from "./useSecurityWrapperState.interfaces";
import { useEffect, useState } from "react";
import { RoleHelper } from "../../../helpers/Role";
import { ISecurityComponentProviderProps } from "../ComponentSecurityProvider.interfaces";

export const useSecurityWrapperState = (
  props: ISecurityComponentProviderProps
): IUseSecurityWrapperState => {
  const { componentId, requiredRoles, userRoles } = props;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Verifica si requiredRoles al menos existe
    if (requiredRoles === undefined || requiredRoles.length === 0) {
      setEnabled(true);
      return;
    }
    // Verifica si componentId al menos existe
    if (componentId === undefined || componentId === "") {
      setEnabled(true);
      return;
    }
    // Verifica si userRoles al menos existe
    if (userRoles === undefined || userRoles.length === 0) {
      setEnabled(true);
      return;
    }
    //Verificar si existe en requiredRoles el componente en base al componentId y si este contiene roles
    if (
      RoleHelper.verifyIfComponentIsInRequiredRoles(
        requiredRoles,
        componentId ? componentId : ""
      )
    ) {
    } else {
      setEnabled(true);
      return;
    }
    // Verifica si el userRoles tiene algun rol en requiredRoles
    if (
      RoleHelper.checkIfUserRoleIsInRequiredRole(
        userRoles,
        requiredRoles,
        componentId ? componentId : ""
      )
    ) {
      setEnabled(true);
      return;
    }

    setEnabled(false);
  }, [userRoles, requiredRoles]);

  return { enabled };
};
