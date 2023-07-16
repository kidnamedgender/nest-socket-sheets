<script setup>
import { io } from "socket.io-client";
import { onMounted, ref } from "vue";

onMounted(() => {
  COLUMNS.value.forEach((column) => {
    for (let i = 1; i <= ROWS_COUNT.value; i++) {
      const cellId = `${column}${i}`;
      const input = document.getElementById(cellId);
      cells.value[cellId] = input;
    }
  });
});

const socket = io("http://localhost:3000");

const onKeyup = (event) => {
  const message = {
    cell: event.target.id,
    value: event.target.value,
  };
  socket.send(JSON.stringify(message));
};

const COLUMNS = ref([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "I",
  "K",
  "L",
  "M",
  "O",
]);
const ROWS_COUNT = ref(30);
const cells = ref({});

socket.on("message", (event) => {
  const data = JSON.parse(event);
  const cell = cells.value[data.cell];
  cell.value = data.value;
});
</script>

<template>
  <div>
    <table id="table">
      <tr>
        <td></td>
        <td v-for="column in COLUMNS">{{ column }}</td>
      </tr>
      <tr v-for="i in ROWS_COUNT">
        <td>{{ i }}</td>
        <td v-for="column in COLUMNS">
          <input :id="column + i" type="text" @keyup="onKeyup" />
        </td>
      </tr>
    </table>
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
