import axiosClient from '../axios';

const contactsData = {
    namespaced: true,
    state() {
      return {
        data: {},
        addressData: "",
        emailData1: "",
        emailData2: "",
        phoneData1: "",
        phoneData2: "",
      };
    },
    mutations: {
      setContactData(state, payload) {
        state.data = payload;
        state.addressData = payload.address_section?.parameters?.contact_address_1?.content||"";
        state.emailData1 = payload.email_section?.parameters?.contact_email_1?.content||"";
        state.emailData2 = payload.email_section?.parameters?.contact_email_2?.content||"";
        state.phoneData1 = payload.phone_section?.parameters?.contact_phone_1?.content||"";
        state.phoneData2 = payload.phone_section?.parameters?.contact_phone_2?.content||"";
      }
    },
    getters: {},
    actions: {
        async getContactData(context){
          try {
            const response = await axiosClient.get('/pages/contact_us');
            context.commit('setContactData', response.data.payload.components.contact.elements);
          } catch (error) {
            console.error("Error fetching contact data:", error);
          }
         
        }
    }
  };

  export default contactsData 