import {create} from "zustand";

export const useItemStore =create((set) => ({
    items:[],
    setItems: (items) => set({items}),
    createItem : async (newItem) => {
        if(!newItem.name || !newItem.price || !newItem.price){
            return {success:false,message:"Please fill in all fields."}
        }
        const res= await fetch ("/api/items",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newItem)
        });
        const data = await res.json();
        set((state) => ({items:[...state.items,data.data]}));
        return {success:true,message:"Item created successfully."}
    },
    fetchItems : async () =>{
        const res= await fetch("/api/items");
        const data= await res.json();
        set({items:data.data});
    },
    deleteItem : async (id) =>{
        const res = await fetch(`/api/items/${id}`,{
            method:"DELETE",
        });
        const data= await res.json();
        if(!data.sucess) return  {success: false, message: data.message};
        
        set(state => ({items : state.items.filter(item => item._id!==id)}));
        return  {success: true, message: data.message};
    },
    updateItem : async (id, updatedItem)=>{
        const res = await fetch(`/api/items/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedItem)
        });
        const data = await res.json();
        if(!data.sucess) return  {success: false, message: data.message};
        set( state => ({
            items : state.items.map((item) => (item._id===id ? data.data : item) )
        }));
        return  {success: true, message: data.message};
    }
}));
