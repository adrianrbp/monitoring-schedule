<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
    <div
      v-for="shift in shifts"
      :key="shift.day"
      class="flex border rounded-lg m-x-2 p-4 shadow-lg bg-white"
      :aria-label="`Day ${shift.dayLabel}`"
      role="table"
    >
      <table class="table-auto divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              :colspan="showAvailabilityTable ? 1 : 2"
              class="bg-yellow-100 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              :aria-label="`Header ${shift.dayLabel}`"
            >
              {{ shift.dayLabel }}
            </th>
            <template v-if="showAvailabilityTable">
              <th
                class="text-xs text-center min-w-[80px]"
                v-for="engineer in engineers"
                :key="engineer.id"
                :style="{
                  backgroundColor: getEngineerColor(engineer),
                }"
                :aria-label="`Header Engineer ${engineer.name}`"
              >
                {{ engineer.name }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="timeBlock in shift.time_blocks"
            :key="timeBlock.start_time"
            :aria-label="`Time block ${shift.dayLabel} ${timeBlock.start_time}`"
          >
            <td
              class="py-2 px-2 text-xs"
              :class="getColor(timeBlock.engineer)"
              :aria-label="`Hour ${timeBlock.start_time}`"
            >
              {{ timeBlock.start_time }} - {{ timeBlock.end_time }}
            </td>
            <td
              v-if="!showAvailabilityTable"
              class="py-2 px-4 text-sm"
              :style="{
                backgroundColor: getEngineerColor(timeBlock.engineer),
              }"
              :aria-label="`Assigned Engineer ${getEngineerName(
                timeBlock.engineer
              )}`"
            >
              {{ getEngineerName(timeBlock.engineer) }}
            </td>
            <AvailabilityTable
              v-if="showAvailabilityTable"
              :day="shift.day"
              :timeBlock="timeBlock.start_time"
              :engineers="engineers"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import AvailabilityTable from "@/components/AvailabilityManagement/AvailabilityTable.vue";

const shiftManagement = inject("shiftManagement");

const { shifts, getEngineerColor, engineers } = shiftManagement;

const availabilityManagement = inject("availabilityManagement");

const { showAvailabilityTable } = availabilityManagement;
const getColor = (engineer) => {
  return engineer ? "bg-green-200" : "bg-red-200";
};

const getEngineerName = (engineer) => {
  return engineer ? engineer.name : "⚠";
};
</script>

<style scoped></style>
