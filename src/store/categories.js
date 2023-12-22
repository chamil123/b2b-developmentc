
import axiosClient from '../axios';


const categoriesData   = {
    namespaced : true,
    state(){
        return {
            data: {}
        }
        

    },
    getters: {
      
         
    },
    mutations: {
        setCategories(state, payload){
            state.data = payload;
        }
    },
    actions: {
        async getCategories(context){
            return axiosClient.get('/categories')
            .then(response => {
                context.commit('setCategories', response.data.payload)
            })
         
        }

    }
}
export default categoriesData  