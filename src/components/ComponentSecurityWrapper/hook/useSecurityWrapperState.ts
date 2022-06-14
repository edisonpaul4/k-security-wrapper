import {IUseSecurityWrapperState} from "./useSecurityWrapperState.interfaces";
import {useEffect, useState} from "react";
import { RoleHelper } from "../../../helpers/Role";
import { ISecurityComponentWrapperProps } from "../ComponentSecurityWrapper.interfaces";

export const useSecurityWrapperState = (props: ISecurityComponentWrapperProps): IUseSecurityWrapperState => {
  const {componentId, requiredRoles, userRoles} = props;
  const [disabled, setDisabled] = useState(false);

  useEffect(()=>{
    if(requiredRoles===undefined || requiredRoles.length===0){
      setDisabled(false);
      return;
    }
    if(userRoles!==undefined){
      for(let i=0; i<userRoles.length;i++){
        if(RoleHelper.checkIfRoleIsInArray(userRoles[i], requiredRoles, componentId ? componentId : "")){
          setDisabled(false);
          return;
        }
      }
    }
    if(componentId !== undefined
      && !RoleHelper.checkIfIdIsInRequiredRoles(componentId, requiredRoles)){
      setDisabled(false);
      return;
    }
    setDisabled(true);
  },[userRoles,requiredRoles]);

  return {disabled};
};