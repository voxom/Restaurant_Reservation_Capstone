import React, { useEffect, useState } from "react";
import { listTables, updateTable } from "../utils/api";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import cooking from "../images/cooking-bg.jpg";

export default function ReservationSeats() {
  const [tables, setTables] = useState([]);
  const [selectOptions, setSelectOptions] = useState("");
  const [error, setError] = useState(null);
  const { reservationId } = useParams();
  const history = useHistory();
  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    async function loadTables() {
      try {
        const response = await listTables(abortController.signal);
        setTables(response);
      } catch (error) {
        setError(error);
      }
    }
    loadTables();
    return () => abortController.abort();
  }, []);

  function changeHandler({ target }) {
    setSelectOptions({ [target.name]: target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    updateTable(
      reservationId,
      Number(selectOptions.table_id),
      abortController.signal
    )
      .then(() => history.push("/dashboard"))
      .catch(setError);

    return () => abortController.abort();
  }
  return (
    <div
      style={{ backgroundImage: `url(${cooking})` }}
      className="w-full h-full bg-no-repeat bg-cover bg-top"
    >
      <div className="h-screen px-8">
        <ErrorAlert error={error} />
        <h2 className="font-bold text-center text-teal-700 text-4xl sm:text-5xl mx-2 p-3">
          Seat a Reservation
        </h2>
        <div className="mx-auto sm:w-8/12 my-6 leading-10 bg-teal-500 text-white text-center drop-shadow-3xl p-4 rounded-3xl">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl sm:text-5xl font-bold">
              Table name - Table capacity
            </h2>
            {tables && (
              <div className="text-black my-3">
                <select
                  className="text-2xl border-2 border-teal-500 rounded-3xl px-3 py-2"
                  name="table_id"
                  required
                  onChange={changeHandler}
                >
                  <option value="">Choose a Table</option>
                  {tables.map((table) => (
                    <option value={table.table_id} key={table.table_id}>
                      {table.table_name} - {table.capacity}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <button
                className="focus:outline-none bg-gray-100 hover:bg-teal-600 hover:text-black text-teal-700 font-bold py-1 px-3 rounded-full mx-3"
                type="submit"
              >
                Submit
              </button>
              <button
                className="focus:outline-none bg-gray-100 hover:bg-teal-600 hover:text-black text-teal-700 font-bold py-1 px-3 rounded-full mx-3"
                onClick={history.goBack}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
