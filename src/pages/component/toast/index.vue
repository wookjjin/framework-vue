<script setup lang="ts">
import { bakeToast } from "~/utils";

const bakeSuccessToast = () => {
  bakeToast.success("Success Toast");
};

const bakeErrorToast = () => {
  bakeToast.error("Error Toast");
};

const bakeWarningToast = () => {
  bakeToast.warning("Warning Toast");
};

const bakeDefaultToast = () => {
  bakeToast.default("Default Toast");
};
</script>

<template>
  <div class="button-container">
    <button @click="bakeSuccessToast" class="success">SUCCESS</button>
    <button @click="bakeErrorToast" class="error">ERROR</button>
    <button @click="bakeWarningToast" class="warning">WARNING</button>
    <button @click="bakeDefaultToast" class="default">DEFAULT</button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

button {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.success {
  background: #72c1e8;
}

.success:hover {
  background: #5aaad0;
}

.error {
  background: #ff7f7f;
}

.error:hover {
  background: #e96a6a;
}

.warning {
  background: #ffc55c;
}

.warning:hover {
  background: #e6ad4d;
}

.default {
  background: #a5b6c5;
}

.default:hover {
  background: #90a3b0;
}
</style>
