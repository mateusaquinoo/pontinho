export interface ProfessorDTO {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  subject: string;
  password: string; // Novo campo para a senha
  years: string[];
  classes: { [key: string]: string[] };
}