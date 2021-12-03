import AuthApi from '../api/AuthApi';

export default  class AuthService {
  static async login(email, password){
    return await AuthApi.post('/login', {email, password});
  }

  static async registration(email, name, password){
    return await AuthApi.post('/registration', {email, name, password});
  }

  static async checkAuth(){
    return await AuthApi.post('/checkAuth');
  }

  static async refresh() {
    return await AuthApi.post('/refresh');
  }

  static async logout(email){
    return await AuthApi.post('/logout', {email});
  }
}
