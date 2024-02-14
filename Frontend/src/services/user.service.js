import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

 /* getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }*/
  getAdminBoard(position){
    return axios.get(API_URL + 'managers/' + `${position}`, { headers: authHeader() });
  }

getAllDepartments(){
  return axios.get(API_URL + 'departments', { headers: authHeader() });
}  

create(data){
  return axios.post(API_URL + 'add', data,{ headers: authHeader() });
}

getAllEmployees() {
  return axios.get(API_URL + 'employees', { headers: authHeader() });
}

getSelectedEmployee(searchword){
  return axios.get(API_URL + 'search/' + `${searchword}`, { headers: authHeader() });
}

update(idEmployee,data){
  return axios.post(API_URL + 'updateEmployee/' + `${idEmployee}`,data, { headers: authHeader() });
}

delete(idEmployee){
  return axios.post(API_URL + 'deleteEmployee/' + `${idEmployee}`, { headers: authHeader() });
}
}

export default new UserService();