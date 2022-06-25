import React, { FC, useContext } from "react";
import { SecurityContext } from "../ModuleSecurityWrapper/ModuleSecurityWrapper";
import { ISecurityComponentProviderProps } from "./ComponentSecurityProvider.interfaces";
import { useSecurityWrapperState } from "./hook/useSecurityWrapperState";

const ComponentSecurityProvider: FC<ISecurityComponentProviderProps> = ({ children }: ISecurityComponentProviderProps) => {
  const securityContext = useContext(SecurityContext)
  return (
    <SecurityContext.Provider value={securityContext}>
      {children}
    </SecurityContext.Provider>
  );
};

const VerifyIfComponentEnable = (componentId: string) => {
  const securityContext = useContext(SecurityContext)
  const { enabled } = useSecurityWrapperState({...securityContext, componentId});
  return enabled;
}

export { ComponentSecurityProvider, SecurityContext, VerifyIfComponentEnable};
