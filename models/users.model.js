class User {
    User() {
        this.name = '';
    }
    getInfo() {
        return {name: this.name};
    }
}
module.exports = User;

module.exports = {
   
    createCrud:function(){
         data="Form data was inserted";
         return data;
    },
    fetchCrud:function(){
      data="data was fetched";
      return data;   
    },
    editCrud:function(editData){
      data= "Data is edited by id: "+editData;
      return data; 
    },
    UpdateCrud:function(updateId){
      data= "Data was updated by id: "+updateId;
      return data; 
    },
    deleteCrud:function(deleteId){
      data= "Data was deleted by id: "+deleteId;
      return data; 
    }
}