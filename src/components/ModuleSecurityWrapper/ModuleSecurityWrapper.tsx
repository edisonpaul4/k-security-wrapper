import React, {createContext, FC, useContext} from "react";
import {ISecurityContextValue, ISecurityModuleWrapperProps} from "./ModuleSecurityWrapper.interfaces";
import { useSecurityWrapperState } from "./hook/useSecurityWrapperState";

function map(children: React.ReactNode | React.ReactElement, fn: any): React.ReactNode | React.ReactElement {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }
    return fn(child);
  });
}

export const SecurityContext = createContext<ISecurityContextValue>({
  requiredRoles:[],
  userRoles:[]
});

export const ModuleSecurityWrapper: FC<ISecurityModuleWrapperProps> = (props: ISecurityModuleWrapperProps) => {
  const { allow, requiredRoles, userRoles } = useSecurityWrapperState(props);

  const { children } = props;
  return (<>
    {
      !allow && (<>nopermitido</>)
    }
    {allow &&
        (<SecurityContext.Provider value={{requiredRoles, userRoles}}>
          {children}
        </SecurityContext.Provider>)
    }
  </>);
};

export default ModuleSecurityWrapper;