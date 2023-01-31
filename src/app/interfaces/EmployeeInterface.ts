import { PersonInterface } from "./PersonInterface";

export interface EmployeeInterface extends PersonInterface{
  idEmp: string,
  isAdmin: boolean
}
