import React, { useEffect, useState } from "react";
import {
  getTrainingSchedules,
  createTrainingSchedule,
  updateTrainingSchedule,
  deleteTrainingSchedule,
} from "../api/trainingScheduleApi";

const emptyForm = {
  name: "",
  description: "",
  days: [],
  time: "",
  activities: [],
  trainer: "",
};

const AdminTrainingSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const data = await getTrainingSchedules();
      setSchedules(data);
    } catch (err) {
      setError("Failed to load schedules");
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDaysChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, days: value.split(",").map((d) => d.trim()).filter(Boolean) }));
  };

  const handleActivitiesChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, activities: value.split("\n").map((a) => a.trim()).filter(Boolean) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateTrainingSchedule(editing.id, form);
      } else {
        await createTrainingSchedule(form);
      }
      setForm(emptyForm);
      setEditing(null);
      fetchSchedules();
    } catch (err) {
      setError("Failed to save schedule");
    }
  };

  const handleEdit = (schedule) => {
    setEditing(schedule);
    setForm({
      name: schedule.name,
      description: schedule.description,
      days: Array.isArray(schedule.days) ? schedule.days : [],
      time: schedule.time,
      activities: Array.isArray(schedule.activities) ? schedule.activities : [],
      trainer: schedule.trainer,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await deleteTrainingSchedule(id);
      fetchSchedules();
    } catch (err) {
      setError("Failed to delete schedule");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin: Training Schedules</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Days (comma separated, e.g. Monday,Wednesday,Friday)</label>
          <input
            type="text"
            name="days"
            value={form.days.join(",")}
            onChange={handleDaysChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Time (e.g. 07:00-08:00 AM)</label>
          <input
            type="text"
            name="time"
            value={form.time}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Activities (one per line)</label>
          <textarea
            name="activities"
            value={form.activities.join("\n")}
            onChange={handleActivitiesChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Trainer</label>
          <input
            type="text"
            name="trainer"
            value={form.trainer}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
        >
          {editing ? "Update Schedule" : "Create Schedule"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => { setEditing(null); setForm(emptyForm); }}
            className="ml-4 px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>
      <h3 className="text-xl font-bold mb-4">All Training Schedules</h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.id} className="mb-4 border-b pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">{schedule.name}</span> ({schedule.trainer})
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(schedule)}
                    className="mr-2 px-3 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(schedule.id)}
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="text-gray-700 text-sm mt-1">{schedule.description}</div>
              <div className="text-gray-600 text-xs mt-1">
                Days: {Array.isArray(schedule.days) ? schedule.days.join(", ") : ""} | Time: {schedule.time}
              </div>
              <div className="text-gray-600 text-xs mt-1">
                Activities: {Array.isArray(schedule.activities) ? schedule.activities.join(", ") : ""}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminTrainingSchedule;
