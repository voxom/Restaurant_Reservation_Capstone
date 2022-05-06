import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { cancelReservation } from "../utils/api";
import ReservationCard from "./ReservationCard";

export default function Reservations({ reservations }) {
  const [error, setError] = useState(null);
  const history = useHistory();

  async function handleCancel(reservationId) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      try {
        await cancelReservation(reservationId);
        history.go();
      } catch (error) {
        setError(error);
      }
    }
  }
  return (
    <div className="flex flex-col sm:flex-row sm:justify-center flex-wrap">
      <ErrorAlert error={error} />
      {reservations.map((reservation) => (
        <div key={reservation.reservation_id}>
          <ReservationCard
            reservation={reservation}
            handleCancel={handleCancel}
          />
        </div>
      ))}
    </div>
  );
}
