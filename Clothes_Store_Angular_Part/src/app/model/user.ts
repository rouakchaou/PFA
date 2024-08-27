export class User {
  id: number;
  name: string;
  surname: string;
  emailId: string;
  password: string;
  phoneNumber: string;
  gender: string;

  constructor();

  constructor(emailId: string, password: string);

  constructor(emailId?: string, password?: string) {
    if (emailId && password) {
      this.emailId = emailId;
      this.password = password;
    }
  } 
}