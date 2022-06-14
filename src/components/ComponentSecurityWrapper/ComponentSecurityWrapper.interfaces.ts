import React from "react";
import { RoleModel } from "../../models/Role";

export interface ISecurityComponentWrapperProps {
  children?: React.ReactNode;
  requiredRoles?: RoleModel[];
  componentId?: string;
  userRoles?: string[];
}



/**
 * requiredRoles: ROLE_ADMIN, ROLE_READ
 * userRoles: ROLE_ADMIN
 * retorna disabled = false
 */

/**
 * requiredRoles: ROLE_ADMIN, ROLE_READ
 * userRoles: []
 * retorna disabled = true
 */

/**
 * requiredRoles: []
 * userRoles: ROLE_ADMIN
 * retorna disabled = false
 */

/**
 * requiredRoles: ROLE_ADMIN. ROLE_WRITE
 * userRoles: ROLE_WRITE, ROLE_READ
 * retorna disabled = false
 */
/**
 * si id no existe dentro de requiredRoles, igual mostrarse
 */

/**
 *
 * [
 *     {
 *         "id": "M_HOME",
 *         "description": "This is the module's description.",
 *         "parent": "M_HOME",
 *         "roles": [
 *             "Console.Home.Read"
 *         ],
 *         "type": "MODULE"
 *     },
 *     {
 *         "id": "M_FRAUD_PREVENTION",
 *         "description": "This is the module's description.",
 *         "parent": "M_FRAUD_PREVENTION",
 *         "roles": [
 *             "Console.FraudPrevention.Read"
 *         ],
 *         "type": "MODULE"
 *     },
 *     {
 *         "id": "M_MERCHANTS",
 *         "description": "This is the module's description.",
 *         "parent": "M_MERCHANTS",
 *         "roles": [
 *             "Console.Merchants.Read"
 *         ],
 *         "type": "MODULE"
 *     }
 * ]
 *
 *
 *
 */