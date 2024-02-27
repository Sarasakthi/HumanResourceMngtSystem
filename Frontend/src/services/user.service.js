import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const API_URL_tech = 'http://localhost:8080/api/';

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

passwordUpdate(data){
  return axios.post(API_URL + 'updatePassword', data);
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

deleteEmployee(idEmployee){
  return axios.post(API_URL + 'delete/' + `${idEmployee}`, { headers: authHeader() });
}


getTechnology(){
  return axios.get(API_URL_tech + 'getTechnologies', { headers: authHeader() });
}

submitDocumentToHR(data){
  return axios.post(API_URL_tech + 'submitDocument',data, { headers:  authHeader(),                                                                      
                                                                      "Content-Type" : "multipart/form-data",
                                                                      
                                                                    });
}



submitSkiilsToHR(data){
  return axios.post(API_URL_tech + 'submitSkills',data, { headers: authHeader() });
}

approvalPending(){
  return axios.get(API_URL + 'getPendingApproval', { headers: authHeader() });
}

verifyingEmpSkills(imageName){
  return axios.get(API_URL + 'downloadImage/'+ `${imageName}`,{responseType : 'arraybuffer', headers: authHeader(), Accept : 'application/json' });
}

gettingImageNames(idImages){
  return axios.get(API_URL + 'getImageNames/'+ `${idImages}`, { headers: authHeader() });
}
}

export default new UserService();