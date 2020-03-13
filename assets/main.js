var app = new Vue({
  el: '#app',
  data: {
    message: "",
    candidate: {
      "cand_num_3": null,
      "Phone_num": null,
    }
  },
  mounted: function () { 
    // var cand_num_3 = prompt("考生編號尾三位數字"); //ask for login detail
    // var phone_num = prompt("電話號碼");
    var cand_num_3 = "999";
    var phone_num = 92345678;

    var self = this;
    
    var stringData = $.ajax({
      url: "./assets/masterlist.csv",
      async: false
    })
    .done(function(data) {
      data = Papa.parse(data, {header: true}).data;
      data.forEach(element => {
        if (element.cand_num_3 == cand_num_3 && element.Phone_num == phone_num) {
          console.log(element);
          self.candidate = element;
        }
      });
      // if data does not match login detail, then go to 404
      if (data.some(candidate => candidate.cand_num_3 == cand_num_3 && candidate.Phone_num ==
        phone_num)) {
        document.querySelector("body").style.removeProperty("visibility");
        return true;
      } else {
        window.location.href = "404/index.html";
      }
      // end if
    })
    .fail(function() {
      window.location.href = "404/index.html";
    });

    
  },
  methods: {

  },
}, );