<template>
  <div class="mx-auto max-w-60">
    <h3>Ingenieros Disponibles</h3>
    <table class="w-60 divide-y">
      <tbody>
        <tr v-for="engineer in engineers" :key="engineer.id">
          <td
            class="py-2 px-4 border-2"
            :style="{ backgroundColor: getEngineerColor(engineer) }"
          >
            {{ engineer.name }}
          </td>
          <td class="py-2 px-4 border-2">
            {{ engineer.hours_assigned }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { inject } from "vue";

const shiftManagement = inject("shiftManagement");
const { engineers, getEngineerColor } = shiftManagement;
</script>
