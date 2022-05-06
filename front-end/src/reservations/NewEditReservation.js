import React, { useState, useEffect } from "react";
import {
  createReservations,
  readReservation,
  updateReservation,
} from "../utils/api";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import cooking from "../images/cooking-bg.jpg";
const dayjs = require("dayjs");

export default function NewEditReservation() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const { reservationId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const abortController = new AbortController();
    async function getData() {
      try {
        if (reservationId) {
          const response = await readReservation(
            reservationId,
            abortController.signal
          );
          setFormData(response);
        } else {
          setFormData({ ...initialFormState });
        }
      } catch (error) {
        setError(error);
      }
    }
    getData();
    return () => abortController.abort();
    // eslint-disable-next-line
  }, [reservationId]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();
    try {
      if (reservationId) {
        await updateReservation(formData, controller.signal);
        history.push(
          `/dashboard?date=${dayjs(formData.reservation_date).format(
            "YYYY-MM-DD"
          )}`
        );
        setFormData({ ...initialFormState });
      } else {
        await createReservations(formData, controller.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
        setFormData({ ...initialFormState });
      }
    } catch (error) {
      setError(error);
    }
    return () => controller.abort();
  };

  return (
    <div
      style={{ backgroundImage: `url(${cooking})` }}
      className="w-full h-full min-h-screen bg-no-repeat bg-cover bg-top"
    >
      {reservationId ? (
        <h2 className="font-bold text-teal-700 text-center text-3xl md:text-5xl mx-2 p-3">
          Edit Reservation
        </h2>
      ) : (
        <h2 className="font-bold text-teal-700 text-center text-3xl md:text-5xl mx-2 p-3">
          Create a Reservation
        </h2>
      )}
      <ErrorAlert error={error} />
      <ReservationForm
        handleSubmit={handleSubmit}
        handleNumber={handleNumber}
        handleChange={handleChange}
        formData={formData}
        history={history}
        id={reservationId}
      />
    </div>
  );
}
