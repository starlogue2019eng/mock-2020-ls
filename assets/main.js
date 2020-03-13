var app = new Vue({
  el: '#app',
  data: {
    message: "",
    candidate: {
      "cand_num_3": null,
      "phone_num": null,
    }
  },
  mounted: function () { 
    var cand_num_3 = prompt("考生編號三位尾數"); //ask for login detail
    var phone_num = prompt("電話號碼");
    // var cand_num_3 = "031";
    // var phone_num = 92345678;

    var self = this;
    
    var stringData = $.ajax({
      url: "./assets/masterlist.csv",
      async: false
    })
    .done(function(data) {
      data = Papa.parse(data, {header: true}).data;
      data.forEach(element => {
        if (element.cand_num_3 == cand_num_3 && element.phone_num == phone_num) {
        // if (element.cand_num_3 == cand_num_3) {
          console.log(element);
          self.candidate = element;
        }
      });
      // if data does not match login detail, then go to 404
      // if (data.some(candidate => candidate.cand_num_3 == cand_num_3 && candidate.phone_num == phone_num)) {
      if (data.some(candidate => candidate.cand_num_3 == cand_num_3)) {
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