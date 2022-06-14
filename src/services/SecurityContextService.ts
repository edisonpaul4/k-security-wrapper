import { SecurityContext } from "../components/ModuleSecurityWrapper/ModuleSecurityWrapper";

export class SecurityContextService {
  constructor() {}
  public getSecurityContext() {
    return SecurityContext;
  }
}

export default SecurityContextService;
