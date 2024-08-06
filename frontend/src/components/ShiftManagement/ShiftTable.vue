<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      v-for="shift in shifts"
      :key="shift.day"
      class="border rounded-lg p-4 shadow-lg bg-white"
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="py-2 px-4 text-center" colspan="2">{{ shift.day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="timeBlock in shift.time_blocks"
            :key="timeBlock.start_time"
          >
            <td class="py-2 px-4">
              {{ timeBlock.start_time }} - {{ timeBlock.end_time }}
            </td>
            <td class="py-2 px-4" :class="getColor(timeBlock.engineer)">
              {{ getEngineerName(timeBlock.engineer) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";

const shiftManagement = inject("shiftManagement");

const { shifts } = shiftManagement;

const getColor = (engineer) => {
  return engineer ? "bg-green-400" : "bg-red-400";
};

const getEngineerName = (engineer) => {
  return engineer ? engineer.name : "⚠";
};
</script>

<style scoped></style>
