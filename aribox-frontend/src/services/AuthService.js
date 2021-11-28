import api from '../api';

export default  class AuthService {
  static async login(email, password){
    return await api.post('/login', {email, password});
  }

  static async registration(email, name, password){
    return api.post('/registration', {email, name, password});
  }

  static async checkAuth(){
    return api.post('/checkAuth');
  }

  static async refresh() {
    return api.post('/refresh');
  }

  static async logout(){
    return api.post('/logout');
  }
}
