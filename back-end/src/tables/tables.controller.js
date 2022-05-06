const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

function hasValidProperties(req, res, next) {
  const invalidFields = Object.keys(req.body.data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties("table_name", "capacity");
const hasRequireUpdateProperties = hasProperties("reservation_id");

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table cannot be found ${table_id}`,
  });
}

function hasData(req, res, next) {
  const { data } = req.body;
  if (data) {
    return next();
  }
  next({
    status: 400,
    message: `Data is missing`,
  });
}

function hasTableName(req, res, next) {
  const {
    data: { table_name },
  } = req.body;
  if (table_name.length <= 1 || !table_name) {
    return next({
      status: 400,
      message: `table_name must be at least 2 characters long.`,
    });
  }
  next();
}

function hasCapacity(req, res, next) {
  const {
    data: { capacity },
  } = req.body;
  if (capacity <= 0) {
    return next({
      status: 400,
      message: `capacity must be at least 1.`,
    });
  }
  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: `capacity must be a number`,
    });
  }
  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    return next({
      status: 400,
      message: `a reservation_id is required`,
    });
  }
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  } else {
    return next({
      status: 404,
      message: `Reservation cannot be found ${reservation_id}`,
    });
  }
}

function checkFreeTable(req, res, next) {
  const occupied = res.locals.table.reservation_id;
  if (occupied) {
    return next({
      status: 400,
      message: `The selected table ${res.locals.table.table_id} is occupied. Choose another table.`,
    });
  }
  next();
}

function checkSeatedReservation(req, res, next) {
  const status = res.locals.reservation.status;
  if (status === "seated") {
    return next({
      status: 400,
      message: `The reservation you selected is already seated. `,
    });
  }
  next();
}

function checkTableCapacity(req, res, next) {
  const capacity = res.locals.table.capacity;
  const people = res.locals.reservation.people;
  if (people > capacity) {
    return next({
      status: 400,
      message: `The table's capacity cannot hold this many people ${people}. Choose another table.`,
    });
  }
  next();
}

function checkTableOccupation(req, res, next) {
  const table = res.locals.table;
  if (table.reservation_id === null) {
    return next({
      status: 400,
      message: `Table is not occupied.`,
    });
  }
  next();
}
async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const { reservation_id } = req.body.data;
  const table_id = Number(req.params.table_id);
  const data = await service.update(reservation_id, table_id);
  res.json({ data });
}

async function destroy(req, res) {
  const { table_id } = req.params;
  const { table } = res.locals;
  await service.deleteTable(table_id, table.reservation_id);
  res.status(200).json({});
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasValidProperties,
    hasRequiredProperties,
    hasTableName,
    hasCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    hasData,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    hasRequireUpdateProperties,
    checkFreeTable,
    checkSeatedReservation,
    checkTableCapacity,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    checkTableOccupation,
    asyncErrorBoundary(destroy),
  ],
};
