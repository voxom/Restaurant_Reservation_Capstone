
import React from "react";
import Table from "./Table";

export default function TableList({ tables }) {
  return (
    <>
      {tables && (
        <div className="flex flex-col sm:flex-row sm:justify-center gap-6 flex-wrap p-4">
          {tables.map((table, index) => (
            <Table table={table} key={index} />
          ))}
        </div>
      )}
    </>
  );
}
