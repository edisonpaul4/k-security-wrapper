import axios, { AxiosRequestConfig } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { TypeIssuerEnum } from "../constants/TokenType";
import { RoleModel } from "../models/Role";

export class RoleHelper {
  public static getRolesForComponent(
    requiredRoles: RoleModel[],
    componentId: string
  ): string[] {
    if (requiredRoles !== undefined) {
      const returnRoles: string[] = [];
      const enabledRoles =
        RoleHelper.filterRequiredRolesByStatus(requiredRoles);

      const arrRoles = enabledRoles.filter((value) => value.id === componentId);

      arrRoles.map((element) => {
        returnRoles.push(...element.roles);
      });

      return returnRoles;
    }
    return [];
  }
  private static filterRequiredRolesByStatus(
    requiredRoles: RoleModel[]
  ): RoleModel[] {
    return requiredRoles.filter(
      (item) =>
        item.status === undefined ||
        item.status === "ENABLED" ||
        item.status === ""
    );
  }
  public static checkIfUserRoleIsInRequiredRole(
    role: string[],
    requiredRoles: RoleModel[],
    componentId: string
  ): boolean {
    const roles = RoleHelper.getRolesForComponent(requiredRoles, componentId);
    const matchedUserRoles = roles.filter((element) => role.includes(element));
    return matchedUserRoles.length > 0;
  }

  public static verifyIfComponentIsInRequiredRoles(
    requiredRoles: RoleModel[],
    componentId: string
  ) {
    const roles = RoleHelper.getRolesForComponent(requiredRoles, componentId);
    return roles.length > 0;
  }

  public static _getTokenIssuer() {
    const objectJwt = jwtDecode<JwtPayload>(RoleHelper._getJWT()!);
    return this._findTypeJwt("cognito", objectJwt.iss!)
      ? TypeIssuerEnum.COGNITO
      : TypeIssuerEnum.AZURE;
  }
  private static _findTypeJwt(type: string, issuer: string): boolean {
    return RegExp("\\b" + type + "\\b").test(issuer);
  }

  public static _getTokenRoles() {
    const tokenRoles = jwtDecode<any>(RoleHelper._getJWT()!);
    return tokenRoles.roles;
  }

  public static _getJWT() {
    return localStorage.getItem("jwt");
  }

  public static async _getRequiredRolesFromAPI(
    basePath: string,
    componentId: string
  ) {
    let config: AxiosRequestConfig = {
      headers: {
        Authorization: RoleHelper._getJWT()!,
        "Content-type": "application/json",
      },
    };
    return await axios.get(
      `${basePath}/api/v1/security/modules/${componentId}/components`,
      config
    );
  }
}
