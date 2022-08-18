export interface AuthState {
  status: string;
  user: null | User;
  idtoken: null | string;
  refreshtoken: null | string;
}

interface User {
  email: string;
  name: string;
}
