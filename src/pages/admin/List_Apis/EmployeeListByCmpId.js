import toast from "react-hot-toast";
import api from "../../../config/URL";

const cpmId = localStorage.getItem("cmpId");
const employeeListByCompId = async () => {
  try {
    const response = await api.get(`emp-reg-details-by-companyId/${cpmId}`);
    console.log("emp-reg-details-by-companyId",response.data);
    return response.data;    
  } catch (error) {
    toast.error("Error fetching Course data:", error);
    throw error;
  }
};

export default employeeListByCompId;
