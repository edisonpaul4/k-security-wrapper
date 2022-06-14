import React, {FC, useContext} from "react";
import {ISecurityComponentWrapperProps} from "./ComponentSecurityWrapper.interfaces";
import {useSecurityWrapperState} from "./hook/useSecurityWrapperState";
import {SecurityContext} from "../ModuleSecurityWrapper/ModuleSecurityWrapper";

function map(children: React.ReactNode | React.ReactElement, fn: any): React.ReactNode | React.ReactElement {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }
    return fn(child);
  });
}

export const ComponentSecurityWrapper: FC<ISecurityComponentWrapperProps> = ( { children,componentId } : ISecurityComponentWrapperProps) => {
  const args = useContext(SecurityContext)
  const { disabled } = useSecurityWrapperState({...args, componentId});
  const disableProps = {
    disabled: disabled,
    onClick: (e: React.MouseEvent<unknown>) => e.preventDefault(),
    onKeyDown: (e: React.KeyboardEvent<unknown>) => e.preventDefault(),
    style: {
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: 0.3,
    },
  };
  return (<>{map(children, (child: any) => React.cloneElement(child, disabled ? {...disableProps} : {}))}</>);
};

export default ComponentSecurityWrapper;