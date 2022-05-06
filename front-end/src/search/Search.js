import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations/Reservations";
import { listReservations } from "../utils/api";
import cooking from "../images/cooking-bg.jpg";

export default function Search() {
  const [reservations, setReservations] = useState([]);
  const [number, setNumber] = useState("");
  const [error, setError] = useState(null);
  const [found, setfound] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setfound(false);
    try {
      const response = await listReservations(
        { mobile_number: number },
        abortController.signal
      );
      setReservations(response);
      setfound(true);
      setNumber("");
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  }

  function handleChange({ target }) {
    setNumber(target.value);
  }

  return (
    <div
      style={{ backgroundImage: `url(${cooking})` }}
      className="w-full min-h-screen sm:h-full bg-no-repeat bg-cover bg-top"
    >
      <div className="text-center p-4">
        <ErrorAlert error={error} />
        <h2 className="font-bold text-teal-700 text-3xl sm:text-5xl mx-2 ">
          Search Reservations By Phone Number
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className="text-md text-teal-700 border-2 border-teal-500 rounded-3xl text-center mx-2 my-4 w-70 h-12"
            type="tel"
            name="mobile_number"
            value={number}
            onChange={handleChange}
            placeholder="123-456-7890"
            required
          />
          <button
            className="focus:outline-none text-white bg-teal-500 hover:bg-teal-700 bg-teal-500 font-bold text-lg w-20 h-11 rounded-3xl"
            type="submit"
          >
            Find
          </button>
        </form>
        {reservations.length > 0 ? (
          <Reservations reservations={reservations} />
        ) : found && reservations.length === 0 ? (
          <p>No reservations found</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
