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
  const { componentId, apiURL } = props;
  const [allow, setAllow] = useState(false);
  const [requiredRoles, setRequiredRoles] = useState<RoleModel[]>([]);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    let requiredRoles: RoleModel[] = [];
    let userRoles: string[] = [];
    async function getRolesAndVerify() {
      try {
        setAllow(false);
        // Verifica el issuer, si es CG para la logica y deja continuar
        if (RoleHelper._getTokenIssuer() === TypeIssuerEnum.COGNITO) {
          setAllow(true);
          return;
        } else {
          userRoles = RoleHelper._getTokenRoles();
          setUserRoles(userRoles);
        }
        // Pregunta al back por los roles requeridos
        const jwt = localStorage.getItem("jwt")!;
        let config: AxiosRequestConfig = {
          headers: {
            Authorization: jwt,
            "Content-type": "application/json",
          },
        };
        const res = await axios.get(
          apiURL,
          config
        );
        requiredRoles = res.data;
        setRequiredRoles(requiredRoles);
        if (requiredRoles === undefined || requiredRoles.length === 0) {
          setAllow(true);
          return;
        }

        if (userRoles !== undefined) {
          for (let i = 0; i < userRoles.length; i++) {
            if (
              RoleHelper.checkIfRoleIsInArray(
                userRoles[i],
                requiredRoles,
                componentId ? componentId : ""
              )
            ) {
              setAllow(true);
              return;
            }
          }
        }
        if (
          componentId !== undefined &&
          !RoleHelper.checkIfIdIsInRequiredRoles(componentId, requiredRoles)
        ) {
          setAllow(true);
          return;
        }
        setAllow(false);
      } catch (error) {
        setAllow(false);
      }
    }
    getRolesAndVerify();
  }, [componentId]);

  return { allow, requiredRoles, userRoles };
};
