import React, {FC} from "react";
import {ISecurityModuleWrapperProps} from "./ModuleSecurityWrapper.interfaces";
import {useSecurityWrapperState} from "./hook/useSecurityWrapperState";

function map(children: React.ReactNode | React.ReactElement, fn: any): React.ReactNode | React.ReactElement {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }
    return fn(child);
  });
}

export const SecurityWrapper: FC<ISecurityModuleWrapperProps> = (props: ISecurityModuleWrapperProps) => {
  const { allow } = useSecurityWrapperState(props);
  const disableProps = {
    disabled: !allow,
    onClick: (e: React.MouseEvent<unknown>) => e.preventDefault(),
    onKeyDown: (e: React.KeyboardEvent<unknown>) => e.preventDefault(),
    style: {
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: 0.3,
    },
  };
  const {children} = props;
  return (<>{map(children, (child: any) => React.cloneElement(child, !allow ? {...disableProps} : {}))}</>);
};

export default SecurityWrapper;