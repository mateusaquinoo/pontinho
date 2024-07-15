export interface UserDTO {
    name: string;
    phone: string;
    email: string;
    password: string;
    role: 'director' | 'teacher' | 'parent';
  }