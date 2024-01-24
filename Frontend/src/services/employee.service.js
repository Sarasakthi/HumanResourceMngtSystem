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
}

export default new EmployeeDataService();