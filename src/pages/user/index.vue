<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  events: [
    { title: "회의", start: "2025-03-15" },
    { title: "출장", start: "2025-03-18", end: "2025-03-20" },
  ],
});
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
