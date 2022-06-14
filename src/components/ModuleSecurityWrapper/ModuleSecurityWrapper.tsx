import React, { FC } from "react";
import { ISecurityModuleWrapperProps } from "./ModuleSecurityWrapper.interfaces";
import { useSecurityWrapperState } from "./hook/useSecurityWrapperState";

function map(children: React.ReactNode | React.ReactElement, fn: any): React.ReactNode | React.ReactElement {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }
    return fn(child);
  });
}

export const ModuleSecurityWrapper: FC<ISecurityModuleWrapperProps> = (props: ISecurityModuleWrapperProps) => {
  const { allow, requiredRoles, userRoles } = useSecurityWrapperState(props);
  const { children } = props;
  return (<>
    {
      !allow && (<div>nopermitido</div>)}
    {allow && (children)}
  </>);
};

export default ModuleSecurityWrapper;