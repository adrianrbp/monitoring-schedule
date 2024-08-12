<template>
  <td v-for="engineer in engineers" :key="engineer.id" class="text-center">
    <input
      type="checkbox"
      :checked="
        isEngineerAvailable(day, parseTimeToHour(timeBlock), engineer.id)
      "
      @change="updateAvailability(day, parseTimeToHour(timeBlock), engineer.id)"
      :aria-label="`Availability ${day} ${timeBlock} Engineer ${engineer.id}`"
    />
  </td>
</template>

<script setup lang="ts">
import { type Ref, inject, defineProps } from "vue";
import { Engineer, EngineerAvailability } from "@/api/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  day: string;
  timeBlock: string;
  engineers: Engineer[];
}>();

const shiftManagement = inject("shiftManagement") as {
  engineers: Ref<Engineer[]>;
};
const { engineers } = shiftManagement;

interface AvailabilityManagement {
  availabilities: Ref<EngineerAvailability[]>;
}

const availabilityManagement = inject(
  "availabilityManagement"
) as AvailabilityManagement;

if (!availabilityManagement) {
  throw new Error("Availability management not provided");
}
const { availabilities } = availabilityManagement;

// const getEngineerAvailability = (
//   day: string,
//   time: string,
//   engineerId: number
// ) => {
//   const dayData = availabilities.value.find((d) => d.day === day);
//   if (!dayData) return null;

//   const timeData = dayData.times.find((t) => t.time === time);
//   if (!timeData) return null;

//   return timeData.engineers.find((e) => e.id === engineerId) || null;
// };

// const isEngineerAvailable = (day: string, time: string, engineerId: number) => {
//   const engineerData = getEngineerAvailability(day, time, engineerId);
//   return engineerData ? engineerData.available : false;
// };

// const updateAvailability = (day: string, time: string, engineerId: number) => {
//   const engineerData = getEngineerAvailability(day, time, engineerId);
//   if (engineerData) {
//     engineerData.available = !engineerData.available; // Toggle availability
//   }
// };

const parseTimeToHour = (time: string): number => {
  const [hour] = time.split(":");
  return parseInt(hour, 10);
};

// Adjusted to work with the first JSON structure
const getEngineerAvailability = (
  day: string,
  time: number, // Time as a number
  engineerId: number
) => {
  const engineerData = availabilities.value.find(
    (e) => e.engineer === engineerId
  );
  if (!engineerData) return null;

  const dayData = engineerData.availability.find((d) => d.day === day);
  if (!dayData) return null;

  return dayData.availableTimes.includes(time);
};

const isEngineerAvailable = (day: string, time: number, engineerId: number) => {
  return getEngineerAvailability(day, time, engineerId) || false;
};

const updateAvailability = (day: string, time: number, engineerId: number) => {
  const engineerData = availabilities.value.find(
    (e) => e.engineer === engineerId
  );
  if (!engineerData) return;

  const dayData = engineerData.availability.find((d) => d.day === day);
  if (!dayData) return;

  const timeIndex = dayData.availableTimes.indexOf(time);
  if (timeIndex === -1) {
    dayData.availableTimes.push(time);
  } else {
    dayData.availableTimes.splice(timeIndex, 1); // Toggle availability
  }
};
</script>
