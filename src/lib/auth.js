import axiosInstance from "@/lib/axios";

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const logoutUser = async () => {
  await axiosInstance.post("/users/logout");
};
