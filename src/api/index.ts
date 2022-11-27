import {instance} from "api/instance";
import {GetUsers} from "api/types";

export const appApi = {

  getUsers({currentRegion, errorCount, seed, pageNumber}: GetUsers){
    return instance.get('', {
      params: {
        currentRegion,
        errorCount,
        seed,
        pageNumber,
      }
    })
  }

}