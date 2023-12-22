<template>
    <button type="button" data-bs-toggle="dropdown" class="btn btn-success btn-sm bt-style">Add new</button>
    <ul class="dropdown-menu add-new-address ">


        <div class="row  mx-10 py-2 px-3 ">
            <form @submit.prevent="submitForm">
                <div class="form-row ">
                    <div class="form-group  py-1">
                        <label for="firtName">First name</label>
                        <input type="text" class="form-control" id="firtName" v-model="formData.firtName" name="firtName">
                    </div>
                </div>
                <div class="form-group  py-1">
                    <label for="lastName">Last name</label>
                    <input type="text" class="form-control" id="lastName" v-model="formData.lastName" name="lastName">
                </div>
                <div class="form-row py-1  d-flex">
                    <div class="form-group col-6 pe-2">
                        <label for="emailAddress">Email</label>
                        <input type="email" class="form-control" id="emailAddress" v-model="formData.emailAddress"
                            name="emailAddress">
                    </div>

                    <div class="form-group col-md-6 ">
                        <label for="phoneNumber">Phone number</label>
                        <input type="text" class="form-control" id="phoneNumber" v-model="formData.phoneNumber"
                            name="phoneNumber">
                    </div>
                </div>

                <div class="form-group  py-1">
                    <label for="addressLine1">Address Line 1</label>
                    <input type="text" class="form-control" id="addressLine1" v-model="formData.addressLine1"
                        name="addressLine1">
                </div>
                <div class="form-group  py-1">
                    <label for="addressLine2">Address Line 2</label>
                    <input type="text" class="form-control" id="addressLine2" v-model="formData.addressLine2"
                        name="addressLine2">
                </div>
                <div class="form-row py-1  d-flex">
                    <div class="form-group col-6 pe-2">
                        <label for="state">State</label>
                        <input type="text" class="form-control" id="state" v-model="formData.state" name="state">
                    </div>
                    <div class="form-group col-6 ">
                        <label for="city">City</label>
                        <input type="text" class="form-control" id="city" v-model="formData.city" name="city">
                    </div>
                </div>
                <div class="form-row py-1  d-flex">
                    <div class="form-group col-md-4  pe-2">
                        <label for="zip">Zip</label>
                        <input type="text" class="form-control" id="zip" v-model="formData.zip" name="zip">
                    </div>
                    <div class="form-group col-8">
                        <label for="country">Country</label>
                        <input type="text" class="form-control" id="country" v-model="formData.country" name="country">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Save</button>
            </form>
        </div>

    </ul>
</template>
<script>
export default {
    name: "AddressList",
    emits: ['new-address_add'],
 // Declare the emits option
    data() {
        return {
            formData: this.$store.state.userProfileData.formData,

        };
    },
    components: {},
    methods: {
        submitForm() {
            this.$store.dispatch('userProfileData/addAddressFormData');
            this.$emit('new-address_add');
          
        }
    },
    computed: {
    },
};
</script>
<style lang="scss">
.add-new-address {
    min-width: 400px !important;
    margin-right: -250px !important;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
    border-radius: 5px;
    z-index: 99999999;

    .item-count {
        width: fit-content;
        font-size: 16px;

        &:before {
            content: "";
            position: absolute;
            height: 2px;
            width: 80px;
            background-color: #494444;
            top: 16px;
            right: auto;
            left: 45px;
        }

        &:after {
            content: "";
            position: absolute;
            height: 2px;
            width: 80px;
            background-color: #494444;
            top: 16px;
            right: 45px;
            left: auto;
        }
    }

    .input {
        border-bottom: 1px solid #62626261;
    }

    .address {
        border-bottom: 1px solid #62626261;

        .address-details span {
            font-size: 13px;
            font-weight: 500;
            max-width: 300px;
            padding: 0px;
            margin: 0px;
            display: block;
            text-align: start
        }
    }

}

.bt-style.btn-success {
    padding: 0px 5px 0px 5px;
    margin: 0px;
    margin-left: 5px;
}
</style>
  