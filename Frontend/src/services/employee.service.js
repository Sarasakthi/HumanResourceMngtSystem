import http from "../http-common";

class EmployeeDataService {

  create(data) {
    return http.post("/add",data);
  }

  get(position){
    return http.get(`/managers/${position}`);
  }

  getAll() {
    return http.get("/departments");
  }

  getAllEmployees() {
    return http.get("/employees");
  }

  getSelectedEmployee(searchword){
    return http.get(`/search/${searchword}`)
  }

  getSelectedEmployeeArray(value){
    return http.get(`/searchid/${value}`)
  }

  update(idEmployee,data){
    return http.post(`/updateEmployee/${idEmployee}`,data)
  }

  delete(idEmployee){
    return http.post(`/deleteEmployee/${idEmployee}`)
  }
}

export default new EmployeeDataService();