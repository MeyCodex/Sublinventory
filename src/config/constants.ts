export const ROLES = {
  ADMIN: "administrator",
  EMPLOYEE: "employee",
  VIEWER: "viewer",
} as const;
export type UserRoleType = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_DISPLAY_NAMES: Record<UserRoleType, string> = {
  [ROLES.ADMIN]: "Administrador",
  [ROLES.EMPLOYEE]: "Empleado",
  [ROLES.VIEWER]: "Visualizador",
};
