<template>
    <div class="loader">
        <!-- You can replace this with your preferred loader/spinner animation -->
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
  
<script>
export default {
};
</script>
  
<style scoped>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* Adjust height as needed */
}
</style>
  