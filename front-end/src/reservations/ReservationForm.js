import React from "react";

export default function ReservationForm({
  handleSubmit,
  handleNumber,
  handleChange,
  formData,
  history,
  id,
}) {
  const date = `${formData.reservation_date}`.substring(0, 10);
  return (
    <div className="p-2">
      <form
        className="mx-auto w-10/12 sm:w-8/12 drop-shadow-3xl text-xl md:text-2xl font-bold leading-10 bg-teal-500 text-white text-center p-4 rounded-3xl"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            placeholder="123-456-7890"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            pattern="\d{4}-\d{2}-\d{2}"
            value={date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            type="time"
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            pattern="[0-9]{2}:[0-9]{2}"
            value={formData.reservation_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="people">Party Size</label>
          <input
            type="number"
            className="form-control"
            id="people"
            name="people"
            min={1}
            placeholder="1"
            value={formData.people}
            onChange={handleNumber}
            required
          />
        </div>
        <div className="sm:mt-4">
          <button
            type="submit"
            className="focus:outline-none bg-gray-100 hover:bg-teal-600 hover:text-black text-teal-700 font-bold py-2 px-3 rounded-full m-2 md:mx-3"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={history.goBack}
            className="focus:outline-none bg-gray-100 hover:bg-teal-600 hover:text-black text-teal-700 font-bold py-2 px-3 rounded-full m-2 md:mx-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
