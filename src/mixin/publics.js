  export default {
        stamp:stamp, 
        stamp2:stamp2,    
}
           function stamp(id) {
             var date = new Date(id);
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
               var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
               var m = date.getMinutes() + ':';
               var s = date.getSeconds(); 
              return id=Y+M+D;
           }
          function stamp2(id) {
             var date = new Date(id);
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
               var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
               var m = date.getMinutes() + ':';
               var s = date.getSeconds(); 

              return id=Y+M+D+h+m+s;
             
           }
           
