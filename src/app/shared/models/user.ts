// src/app/shared/models/user.ts

export interface User {
  email: string;
  token: string;
  name: string;
  lastName: string;
  secondLastName: string;
  controlNumber: string;
  careerName: string;
}

export interface UserDTO {
  name: string;
  lastName: string;
  secondLastName: string;
  controlNumber: string;
  careerName: string;
}
