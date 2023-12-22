<template>
    <div class="loader-container">
        <div class="white-box">

            <VueSpinnerGears size="50" color="red" />
            <p class="loading">Loading......</p>
        </div>
    </div>
</template>
<script>
import { VueSpinner, VueSpinnerBox, VueSpinnerClock, VueSpinnerAudio, VueSpinnerGears } from 'vue3-spinners';
export default {
    components: {
        VueSpinner, VueSpinnerBox, VueSpinnerClock, VueSpinnerAudio, VueSpinnerGears
    },
};
</script>
<style scoped>
.loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(82, 81, 81, 0.3);
    z-index: 9999;
}

.white-box {
    width: 150px;
    height: 150px;
    background-color: rgba(255, 255, 255, 0.85);
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    /* Set to column layout */
    justify-content: center;
    align-items: center;
    border-radius: 8%;
}

.loading {
    margin-top: 5px;
}

</style>
  