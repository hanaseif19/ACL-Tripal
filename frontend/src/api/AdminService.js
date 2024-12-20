import { axios } from "./axios";

export const getUsers = async () => {
  try {
    const response = await axios.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("Can't return users", error);
    throw error;
  }
}

export async function changeAdminPassword(oldPassword, newPassword) {
  try {
    const body = {
      "oldPassword": oldPassword,
      "newPassword": newPassword
    }
    console.log("the body in admin change pass is ", body);
    const response = await axios.patch("/admin-change-pass", body);
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

export async function getTotalUsers() {
  try {

    const response = await axios.get(`/admin/getTotalUsers`);
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

export async function getUsersPerMonth(searchYear){
  try {
   
    const response = await axios.get(`/admin/getUsersPerMonth/${searchYear}`);
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

export async function deleteUser(role, userId) {
  try {
    const response = await axios.delete(`/admin/user/${role}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${userId}:`, error);
    throw error;
  }
}

export const createAdmin = async (name, password) => {
  const requestBody = {
    userName: name,
    password: password
  };
  try {
    const response = await axios.post(`/admin/addAdmin`, requestBody);
    return response.data;
  }
  catch (error) {
    const errorMessage = error.response?.data?.error || "An error occurred while creating the request.";
    console.log("ERRPR MESSAGE", errorMessage)
    throw new Error(errorMessage);
  }
}

export const createGovernor = async (name, password) => {
  const requestBody = {
    userName: name,
    password: password
  };
  try {
    const response = await axios.post(`/governor`, requestBody);
    return response.data;
  }
  catch (error) {
    const errorMessage = error.response?.data?.error || "An error occurred while creating the request.";
    console.log("ERRPR MESSAGE", errorMessage)
    throw new Error(errorMessage);
  }
}

export const flagItinerary = async (itineraryId, userData) => {
  try {
    const response = await axios.put(`/admin/flag-itinerary/${itineraryId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error flagging itinerary with id ${itineraryId}`, error);
    throw error;
  }
};

export const getAdminItineraries = async () => {
  try {
    const response = await axios.get("/admin/itineraries");
    return response;
  } catch (error) {
    console.error("Can't fetch itineraries", error);
    throw error;
  }
};

export const getAdminActivities = async () => {
  try {
    const response = await axios.get("/admin/activities");
    return response;
  } catch (error) {
    console.error("Can't fetch activities", error);
    throw error;
  }
};

export const flagActivity = async (activityId, userData) => {
  try {
    const response = await axios.patch(`/admin/flag-activity/${activityId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error flagging activity with id ${activityId}`, error);
    throw error;
  }
};

export const createPromoCode = async (body) => {
  try {
    const response = await axios.post(`/admin/promocode`, body);
    return response.data;
  } catch (error) {
    console.error(`Error creating promo code`, error);
    throw error;
  }
};

export const getPromoCodes = async () => {
  try {
    const response = await axios.get(`/admin/promocode`);
    return response.data;
  } catch (error) {
    console.error(`Error getting promo cods`, error);
  }
};

export const getEventOwnerData = async (userId) => {
  try {
    const response = await axios.get(`/admin/getDataForEventOwner/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting data for event owner with id ${userId}`, error);

    throw error;
  }
};

export async function getAdminNotifications() {
  try {
    const response = await axios.get('/admin/notifications');
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}