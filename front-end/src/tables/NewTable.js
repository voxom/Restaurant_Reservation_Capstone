
import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import cooking from "../images/cooking-bg.jpg";

export default function NewTable() {
  const initialFormState = {
    table_name: "",
    capacity: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleNumber = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: Number(target.value),
    });
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createTable(formData, abortController.signa);
      setFormData({ ...initialFormState });
      history.push("/dashboard");
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  }

  return (
    <div
      style={{ backgroundImage: `url(${cooking})` }}
      className="w-full h-screen bg-no-repeat bg-cover bg-top"
    >
      <h2 className="font-bold text-teal-700 text-center text-3xl sm:text-5xl mx-2 p-3">
        Create a Table
      </h2>
      <ErrorAlert error={error} />
      <div className="p-4">
        <form
          className="mx-auto sm:w-8/12 text-2xl font-bold leading-10 bg-teal-500 text-white text-center drop-shadow-3xl p-4 rounded-3xl"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="table_name">Table Name</label>
            <input
              type="text"
              className="form-control"
              id="table_name"
              name="table_name"
              placeholder="Table Name"
              value={formData.table_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              name="capacity"
              min={1}
              placeholder="1"
              value={formData.capacity}
              onChange={handleNumber}
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="focus:outline-none bg-gray-100 hover:bg-teal-600 hover:text-black text-teal-700 font-bold py-1 px-3 m-2 rounded-full"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={history.goBack}
              className="focus:outline-none bg-gray-100 hover:bg-teal-600 hover:text-black text-teal-700 font-bold py-1 px-3 rounded-full m-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
