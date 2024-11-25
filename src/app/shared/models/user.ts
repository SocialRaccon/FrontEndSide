export interface User {
    idUser?: number;
    name: string;
    lastName: string;
    secondLastName: string;
    email: string;
    controlNumber: string;
    careerName?: string;
    token?: string;
  }

export interface UserDTO {
  name: string;
  lastName: string;
  secondLastName: string;
  email: string;
  controlNumber: string;
  careerName: string;
}