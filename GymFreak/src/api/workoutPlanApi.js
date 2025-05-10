import axios from "axios";
import { getAccessToken, getAdminToken } from "../utils/auth";

const BASE_URL = "http://localhost:8080/api/workoutplans";

export const getWorkoutPlans = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createWorkoutPlan = async (plan) => {
  const token = getAdminToken();
  const res = await axios.post(BASE_URL, plan, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateWorkoutPlan = async (id, plan) => {
  const token = getAdminToken();
  const res = await axios.put(`${BASE_URL}/${id}`, plan, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteWorkoutPlan = async (id) => {
  const token = getAdminToken();
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserWorkoutPlan = async () => {
  const token = getAccessToken();
  const res = await axios.get(`${BASE_URL}/user/selected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const setUserWorkoutPlan = async (workoutplan_ids) => {
  const token = getAccessToken();
  const res = await axios.post(
    `${BASE_URL}/user/selected`,
    { workoutplan_ids },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const removeUserWorkoutPlan = async (workoutplan_id) => {
  const token = getAccessToken();
  const res = await axios.delete(`${BASE_URL}/user/selected/${workoutplan_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
