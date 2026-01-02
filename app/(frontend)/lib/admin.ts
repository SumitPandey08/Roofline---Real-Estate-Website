import axios from "axios";

async function getAdminById(agentId: string) {
  if (!agentId) {
    throw new Error("agentId is required");
  }

  const res = await axios.get(`/api/admin/get-admin-from-id/${agentId}`);


  return res.data.data;
}

export { getAdminById };
