import React from "react";
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const ReservationCard = ({
  reservation: {
    status,
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_time,
    reservation_id,
  },
  handleCancel,
}) => {
  return (
    <>
      {status !== "finished" && status !== "cancelled" && (
        <div className="drop-shadow-3xl sm:mx-6 my-6 leading-10 bg-teal-500 text-gray-100 font-bold text-xl text-center p-4 rounded-3xl">
          <h2 class="font-bold text-center text-teal-700 text-3xl md:text-5xl m-4">
            RESERVATION
          </h2>
          <p>First Name: {first_name}</p>
          <p>Last Name: {last_name}</p>
          <p>Mobile Number: {mobile_number}</p>
          <p>
            Reservation Date: {dayjs(reservation_date).format("MM/DD/YYYY")}
          </p>
          <p>Reservation Time: {reservation_time}</p>
          <p>People: {people}</p>
          <p data-reservation-id-status={`${reservation_id}`}>
            Status: {status}
          </p>
          <div className="flex justify-center mt-2 font-bold text-teal-700">
            <a
              className="focus:outline-none hover:no-underline bg-gray-100 hover:bg-teal-600 hover:text-black py-1 px-3 rounded-full mr-3"
              href={`/reservations/${reservation_id}/edit`}
            >
              Edit
            </a>
            {status === "booked" && (
              <a
                className="focus:outline-none hover:no-underline bg-gray-100 hover:bg-teal-600 hover:text-black py-1 px-4 rounded-full"
                href={`/reservations/${reservation_id}/seat`}
              >
                Seat
              </a>
            )}
            <button
              type="button"
              className="focus:outline-none bg-gray-100 hover:bg-teal-600 hover:text-black font-bold py-1 px-3 rounded-full ml-3"
              onClick={() => handleCancel(reservation_id)}
              data-reservation-id-cancel={reservation_id}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationCard;
