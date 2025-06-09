export class Employee {
    private _employeeId: number;
    private _hireDate: Date;
    private _name: string;
    private _email: string;
    private _department: string;
    private _jobTitle: string;
    private _password: string;
  
    constructor(
      employeeId: number,
      hireDate: Date,
      name: string,
      email: string,
      department: string,
      jobTitle: string,
      password: string
    ) {
      this._employeeId = employeeId;
      this._hireDate = hireDate;
      this._name = name;
      this._email = email;
      this._department = department;
      this._jobTitle = jobTitle;
      this._password = password;
    }
  
    // Getters
    get employeeId(): number {
      return this._employeeId;
    }
  
    get hireDate(): Date {
      return this._hireDate;
    }
  
    get name(): string {
      return this._name;
    }
  
    get email(): string {
      return this._email;
    }
  
    get department(): string {
      return this._department;
    }
  
    get jobTitle(): string {
      return this._jobTitle;
    }
  
    get password(): string {
      return this._password;
    }
  
    // Setters
    set employeeId(employeeId: number) {
      this._employeeId = employeeId;
    }
  
    set hireDate(hireDate: Date) {
      this._hireDate = hireDate;
    }
  
    set name(name: string) {
      this._name = name;
    }
  
    set email(email: string) {
      this._email = email;
    }
  
    set department(department: string) {
      this._department = department;
    }
  
    set jobTitle(jobTitle: string) {
      this._jobTitle = jobTitle;
    }
  
    set password(password: string) {
      this._password = password;
    }
  }
  