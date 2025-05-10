import axios from "axios";
import { getAccessToken, getAdminToken } from "../utils/auth";

const BASE_URL = "http://localhost:8080/api/trainingschedules";

export const getTrainingSchedules = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createTrainingSchedule = async (schedule) => {
  const token = getAdminToken();
  const res = await axios.post(BASE_URL, schedule, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateTrainingSchedule = async (id, schedule) => {
  const token = getAdminToken();
  const res = await axios.put(`${BASE_URL}/${id}`, schedule, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteTrainingSchedule = async (id) => {
  const token = getAdminToken();
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserTrainingSchedules = async () => {
  const token = getAccessToken();
  const res = await axios.get(`${BASE_URL}/user/enrolled`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const enrollUserTrainingSchedules = async (schedule_ids) => {
  const token = getAccessToken();
  const res = await axios.post(
    `${BASE_URL}/user/enrolled`,
    { schedule_ids },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const unenrollUserTrainingSchedule = async (schedule_id) => {
  const token = getAccessToken();
  const res = await axios.delete(`${BASE_URL}/user/enrolled/${schedule_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const unenrollAllUserTrainingSchedules = async () => {
  const token = getAccessToken();
  const res = await axios.delete(`${BASE_URL}/user/enrolled`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
