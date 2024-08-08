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

// Προσθέστε την κλάση "active" στο κουμπί που πατήθηκε
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

  //        console.log("Πατήθηκε το κουμπί με κείμενο: " + this.innerText);
  //alert("Πατήθηκε το κουμπί με κείμενο: " + this.innerText);
}

function homeClick() {
  //alert("Home");

  // Βρείτε το <iframe> με το id "myFrame"
var myFrame = document.getElementById('myFrame');

// Ορίστε το νέο URL της σελίδας που θέλετε να ανοίξετε
var newPageURL = 'home_page.html';

// Αλλάξτε το src του <iframe> στο νέο URL
myFrame.src = newPageURL;

// Αλλάζει τον τίτλο της σελίδας
document.title = "Vasilhs Basilhs - Αρχική";
}

function appsClick() {
    // Βρείτε το <iframe> με το id "myFrame"
var myFrame = document.getElementById('myFrame');

// Ορίστε το νέο URL της σελίδας που θέλετε να ανοίξετε
var newPageURL = 'apps_page.html';

// Αλλάξτε το src του <iframe> στο νέο URL
myFrame.src = newPageURL;

// Αλλάζει τον τίτλο της σελίδας
document.title = "Vasilhs Basilhs - Εφαρμογές";

}
