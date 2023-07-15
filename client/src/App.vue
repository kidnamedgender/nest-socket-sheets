<script setup>
import { io } from "socket.io-client";
import { onMounted } from "vue";

onMounted(() => {
  const onKeyup = (event) => {
    const message = {
      cell: event.target.id,
      value: event.target.value,
    };

    socket.send(JSON.stringify(message));
  };

  const generateTable = (table, columns) => {
    const tr = document.createElement("tr");

    tr.innerHTML =
      "<td></td>" + columns.map((column) => `<td>${column}</td>`).join("");

    table.appendChild(tr);
  };

  const generateRow = (table, rowIndex, columns) => {
    const tr = document.createElement("tr");

    tr.innerHTML =
      `<td>${rowIndex}</td>` +
      columns
        .map(
          (column) => `<td><input id="${column}${rowIndex}" type="text"></td>`
        )
        .join("");

    table.appendChild(tr);

    columns.forEach((column) => {
      const cellId = `${column}${rowIndex}`;

      const input = document.getElementById(cellId);

      input.addEventListener("keyup", onKeyup);

      cells[cellId] = input;
    });
  };

  const fillTable = (table) => {
    for (let i = 1; i <= ROWS_COUNT; i++) {
      generateRow(table, i, COLUMNS);
    }
  };

  const socket = io("http://localhost:3000");

  const table = document.querySelector("#table");
  const COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "I", "K", "L", "M", "O"];
  const ROWS_COUNT = 30;
  const cells = {};

  socket.on("message", (event) => {
    const data = JSON.parse(event);
    const cell = cells[data.cell];
    cell.value = data.value;
  });

  generateTable(table, COLUMNS);
  fillTable(table);
});
</script>

<template>
  <div>
    <table id="table"></table>
  </div>
</template>

<style>
*,
html {
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;

  position: relative;
}
input {
  margin: 2px 0;
  padding: 4px 9px;

  box-sizing: border-box;

  border: 1px solid #ccc;

  outline: none;
}

input:focus {
  border: 1px solid #0096ff;
}

table,
table td {
  border: 1px solid #cccccc;
}

td {
  height: 20px;
  width: 80px;

  text-align: center;
  vertical-align: middle;
}
</style>
