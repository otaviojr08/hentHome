import { PersonInterface } from "./PersonInterface";

export interface ClientInterface extends PersonInterface{
  idCli: string,
  creditCard: string
}
