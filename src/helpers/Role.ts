import jwtDecode, { JwtPayload } from "jwt-decode";
import { TypeIssuerEnum } from "../constants/TokenType";
import { RoleModel } from "../models/Role";

export class RoleHelper {

    public static getRoles(requiredRoles: RoleModel[], componentId: string): string[] {
        if(requiredRoles!== undefined) {
          const returnRoles = [];
          const arrRoles = requiredRoles
            .filter((value) => value.id === componentId);
          for(let i=0; i<arrRoles.length;i++){
            returnRoles.push(...arrRoles[i].roles)
          }
          return returnRoles;
        }
        return [];
      };
    
      public static checkIfRoleIsInArray (role: string, requiredRoles: RoleModel[], componentId: string):boolean {
        const roles = RoleHelper.getRoles(requiredRoles, componentId);
        for(let i=0; i<roles.length;i++){
          if(roles[i] === role){
            return true;
          }
        }
        return false;
      };
    
      public static checkIfIdIsInRequiredRoles (id: string, requiredRoles: RoleModel[]):boolean {
        return requiredRoles!.filter((item)=>item.id===id).length>0;
      };

      public static _getTokenIssuer() {
        const objectJwt = jwtDecode<JwtPayload>(localStorage.getItem("jwt")!);
        return this._findTypeJwt("cognito", objectJwt.iss!)
          ? TypeIssuerEnum.COGNITO
          : TypeIssuerEnum.AZURE;
      }
      private static _findTypeJwt(type: string, issuer: string) {
        return RegExp("\\b" + type + "\\b").test(issuer);
      }

      public static _getTokenRoles() {
        const tokenRoles = jwtDecode<any>(localStorage.getItem("jwt")!);
    
        return tokenRoles.roles;
      }
}

