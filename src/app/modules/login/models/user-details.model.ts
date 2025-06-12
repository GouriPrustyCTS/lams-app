export interface UserDetails {
    email: string;
    name: string; // The user's full name (e.g., "John Doe")
    title: string; // The user's designation/title (e.g., "Manager", "Employee")
    roles: string[]; // An array of roles (e.g., ["ADMIN", "USER"])
    hireDate:string;
    employeeId: number;
    department: string; // The user's department (e.g., "Engineering", "HR")
    
  }