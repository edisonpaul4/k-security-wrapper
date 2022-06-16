import { IUseSecurityModuleWrapperState } from "./useSecurityWrapperState.interfaces";
import { useEffect, useState } from "react";
import { RoleHelper } from "../../../helpers/Role";
import { ISecurityModuleWrapperProps } from "../ModuleSecurityWrapper.interfaces";
import axios, { AxiosRequestConfig } from "axios";
import { RoleModel } from "../../../models/Role";
import { TypeIssuerEnum } from "../../../constants/TokenType";

export const useSecurityWrapperState = (
  props: ISecurityModuleWrapperProps
): IUseSecurityModuleWrapperState => {
  const { componentId, basePath } = props;
  const [allow, setAllow] = useState(false);
  const [requiredRoles, setRequiredRoles] = useState<RoleModel[]>([]);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    let requiredRoles: RoleModel[] = [];
    let userRoles: string[] = [];
    setAllow(false);
    async function getRolesAndVerify() {
      try {
        // Verifica el issuer, si es Cognito para la logica y retorna, caso contrario pide los requiredRoles
        if (RoleHelper._getTokenIssuer() === TypeIssuerEnum.COGNITO) {
          setAllow(true);
          return;
        } else {
          userRoles = RoleHelper._getTokenRoles();
          setUserRoles(userRoles);
        }
        // Verifica si componentId al menos existe
        if (componentId === undefined || componentId === "") {
          setAllow(true);
          return;
        }
        // Pregunta al back por los roles requeridos
        requiredRoles = (
          await RoleHelper._getRequiredRolesFromAPI(basePath, componentId!)
        ).data;
        setRequiredRoles(requiredRoles);

        // Verifica si requiredRoles al menos existe y tiene longitud de mas de 0
        if (requiredRoles === undefined || requiredRoles.length === 0) {
          setAllow(true);
          return;
        }

        // Verifica si userRoles al menos existe y tiene longitud de mas de 0
        if (userRoles === undefined || userRoles.length === 0) {
          setAllow(false);
          return;
        }

        //Verificar si existe en requiredRoles el modulo en base al componentId y si este contiene roles
        if (
          RoleHelper.verifyIfComponentIsInRequiredRoles(
            requiredRoles,
            componentId!
          )
        ) {
        } else {
          setAllow(true);
          return;
        }

        // Verifica si el userRoles tiene algun rol en requiredRoles
        if (
          RoleHelper.checkIfUserRoleIsInRequiredRole(
            userRoles,
            requiredRoles,
            componentId!
          )
        ) {
          setAllow(true);
          return;
        }
        setAllow(false);
      } catch (error) {
        setAllow(true);
      }
    }
    getRolesAndVerify();
  }, [componentId]);

  return { allow, requiredRoles, userRoles };
};
