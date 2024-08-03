<template>
  <div>
    <h1 class="text-center">Company Service Shifts</h1>
    <!-- Emitting inside "serviceSelected" will trigger handleServiceSelected -->
    <CompanyServiceDropdown @serviceSelected="handleServiceSelected" />
    <p v-if="selectedServiceId && selectedServiceId !== 0">
      Service ID: {{ selectedServiceId }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CompanyServiceDropdown from "@/components/CompanyServiceSchedule/CompanyServiceDropdown.vue";

export default defineComponent({
  name: "App",
  components: {
    CompanyServiceDropdown,
  },
  setup() {
    const selectedServiceId = ref<number>(0);

    const handleServiceSelected = (serviceId: number) => {
      selectedServiceId.value = serviceId;
    };

    return {
      selectedServiceId,
      handleServiceSelected,
    };
  },
});
</script>

<style></style>
