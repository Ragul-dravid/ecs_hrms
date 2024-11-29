import toast from "react-hot-toast";
import api from "../../../config/URL";

const cpmId = sessionStorage.getItem("cmpId");
const employeeListByCompId = async () => {
  try {
    const response = await api.get(`getEmpolyeeWithRole/${cpmId}`);
    console.log("getEmpolyeeWithRole",response.data);
    return response.data;    
  } catch (error) {
    toast.error("Error fetching Course data:", error);
    throw error;
  }
};

export default employeeListByCompId;
