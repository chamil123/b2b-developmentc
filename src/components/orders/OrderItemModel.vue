<template>
  <div class="modal">
    <div class="modal-inner">
      <button @click="close" style="float: right">&times;</button>
      <h2>Order Items</h2>
      <div class="table-responsive">
        <table class="table table-striped my-orders">
          <thead>
            <tr>
              <th scope="col">Product Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody v-for="orderItem in order" v-bind:key="orderItem.line_id">
            <tr>
              <td>
                <img v-if="orderItem.product.images[0]" :src="orderItem.product.images[0]"
                  alt="{{ orderItem.product.name }}" class="product-image w-25" />
                <img v-else src="../../assets/images/no-image-available.jpg" alt="{{ orderItem.product.name }}"
                  class="product-image w-25" />
              </td>
              <td>{{ orderItem.product.name }}</td>
              <td>{{ orderItem.quantity }}</td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Array,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.027);
  /* Set initial background color to transparent */
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  /* Initial opacity value */
}

.modal-inner {
  background-color: white;
  border-radius: 0.5em;
  padding: 2em;
  margin: auto;
  /* transform: scale(1); */
  /* Initial scale value */

}
</style>
