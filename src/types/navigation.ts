export interface NavLink {
  name?: string;
  label?: string; // Some parts of the app use 'label'
  title?: string; // Some parts of the app use 'title'
  href?: string;
  hasDropdown?: boolean;
  subLinks?: NavLink[];
}

export interface PaginatedResponse<T> {
  posts: T[];
  totalPages: number;
  total: number;
}
