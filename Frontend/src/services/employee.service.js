import http from "../http-common";

class EmployeeDataService {

  create(data) {
    return http.post("/add",data);
  }

}

export default new EmployeeDataService();