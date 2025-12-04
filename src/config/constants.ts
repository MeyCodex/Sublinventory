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

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
}
