import axios from "axios";

export const verifyAadhaarQrCode = async (qrImage) => {
  const formData = new FormData();
  formData.append("image", qrImage);

  try {
    const response = await axios.post(`${import.meta.env.VITE_FLASK_API_URL}/verify`, formData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred during verification.";
    throw new Error(errorMessage);
  }
};
