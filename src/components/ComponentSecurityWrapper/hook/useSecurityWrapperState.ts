import { IUseSecurityWrapperState } from "./useSecurityWrapperState.interfaces";
import { useEffect, useState } from "react";
import { RoleHelper } from "../../../helpers/Role";
import { ISecurityComponentWrapperProps } from "../ComponentSecurityWrapper.interfaces";

export const useSecurityWrapperState = (
  props: ISecurityComponentWrapperProps
): IUseSecurityWrapperState => {
  const { componentId, requiredRoles, userRoles } = props;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // Verifica si requiredRoles al menos existe
    if (requiredRoles === undefined || requiredRoles.length === 0) {
      setDisabled(false);
      return;
    }
    // Verifica si componentId al menos existe
    if (componentId === undefined || componentId === "") {
      setDisabled(false);
      return;
    }
    // Verifica si userRoles al menos existe
    if (userRoles === undefined || userRoles.length === 0) {
      setDisabled(false);
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
      setDisabled(false);
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
      setDisabled(false);
      return;
    }

    setDisabled(true);
  }, [userRoles, requiredRoles]);

  return { disabled };
};
