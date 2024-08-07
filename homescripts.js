/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }


// Πάρτε το στοιχείο που περιέχει τα κουμπιά
var btnContainer = document.getElementById("myTopnav");

// Πάρτε όλα τα κουμπιά με την κλάση "btn" μέσα στο στοιχείο
var btns = btnContainer.getElementsByClassName("btn");

// Επαναλάβετε τα κουμπιά και προσθέστε την κλάση "active" στο τρέχον/κλικαρισμένο κουμπί
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}


}