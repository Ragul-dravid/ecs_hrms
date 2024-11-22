import toast from "react-hot-toast";
import api from "../../../config/URL";

const cpmId = localStorage.getItem("cmpId");
const departmentListByCompId = async () => {
  try {
    const response = await api.get(`department-by-companyId/${cpmId}`);
    console.log("department-by-companyId",response.data);
    return response.data;    
  } catch (error) {
    toast.error("Error fetching Course data:", error);
    throw error;
  }
};

export default departmentListByCompId;
