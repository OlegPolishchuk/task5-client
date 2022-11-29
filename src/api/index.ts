import {instance} from "api/instance";
import {GetData} from "api/types";

export const appApi = {

  getUsers({region, errorsCount, seed, pageNumber, isFirst}: GetData){
    return instance.get(
      `?pageNumber=${pageNumber}&region=${region}&seed=${seed}&errorsCount=${errorsCount}`,
      {params: {isFirst}}
    )
  },

  downloadCSV() {
    return instance.get('/file', {responseType: 'blob'})
  }

}