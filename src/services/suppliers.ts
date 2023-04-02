import axios from "axios";
import config from "../config/config";
import { SUPPLIER } from "../constants/backend.constants";

type supplierListApi = {
  query?: Record<string, any>;
};

const suppliersList = (args?: supplierListApi) => {
  let url = config.BACKEND_BASE + SUPPLIER.LIST;

  let query = args?.query || {};
  return axios.get(url, {
    params: query,
  });
};

export { suppliersList };
