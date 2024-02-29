'use strict';




const toggleElem = function (elem) { elem.classList.toggle("active"); }





const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < navTogglers.length; i++) {
  navTogglers[i].addEventListener("click", function () {
    toggleElem(navbar);
    toggleElem(overlay);
  });
}





const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    header.classList.add("header-anim");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
    header.classList.remove("header-anim");
  }
});




const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchBox = document.querySelector("[data-search-box]");

for (let i = 0; i < searchTogglers.length; i++) {
  searchTogglers[i].addEventListener("click", function () {
    toggleElem(searchBox);
  });
}





const whishlistBtns = document.querySelectorAll("[data-whish-btn]");

for (let i = 0; i < whishlistBtns.length; i++) {
  whishlistBtns[i].addEventListener("click", function () {
    toggleElem(this);
  });
}




const button = document.getElementById('button');
const box = document.getElementById('box');
const closeButton = document.getElementById('closeButton');

button.addEventListener('mouseenter', () => {
  box.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  box.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === box) {
    box.style.display = 'none';
  }
});






function toggleChat() {
  var chatWindow = document.getElementById('chat-window');
  if (chatWindow.style.display === 'block') {
      chatWindow.style.display = 'none';
  } else {
      fetch('chatbot.html')
          .then(response => response.text())
          .then(html => {
              chatWindow.innerHTML = html;
              chatWindow.style.display = 'block';
          })
          .catch(error => console.log('Error loading chat:', error));
  }
}

function closeForm() {
  var formContainer = document.getElementById('registration-form-container');
  formContainer.style.display = 'none';
}

function submitForm() {
  // Get values from the form
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;

  // Save data to localStorage (you should replace this with a server-side solution)
  var userData = {
      name: name,
      email: email
  };
  localStorage.setItem('userData', JSON.stringify(userData));

  // Close the registration form
  closeForm();
}



function showLoginForm() {
  document.getElementById("instruction").innerText = "Please enter your credentials to log in.";
  // Additional logic for showing the login form
}

function showSignupForm() {
  document.getElementById("instruction").innerText = "Please fill out the registration form to sign up.";
  // Additional logic for showing the signup form
}

function closePage() {
  // Hide the registration form container
  document.getElementById("registration-form-container").style.display = "none";
}


document.addEventListener('DOMContentLoaded', function () {
  // Automatically open the registration form
  var formContainer = document.getElementById('registration-form-container');
  formContainer.style.display = 'block';
});



document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("image");
    const videoInput = document.getElementById("video");
    const previewContainer = document.getElementById("preview-container");

    imageInput.addEventListener("change", function () {
        previewImage();
    });

    videoInput.addEventListener("change", function () {
        previewVideo();
    });

    function previewImage() {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imagePreview = document.createElement("img");
                imagePreview.src = e.target.result;
                imagePreview.classList.add("preview-item");
                previewContainer.innerHTML = "";
                previewContainer.appendChild(imagePreview);
            };

            reader.readAsDataURL(file);
        }
    }

    function previewVideo() {
        const file = videoInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const videoPreview = document.createElement("video");
                videoPreview.src = e.target.result;
                videoPreview.classList.add("preview-item");
                videoPreview.setAttribute("controls", "controls");
                previewContainer.innerHTML = "";
                previewContainer.appendChild(videoPreview);
            };

            reader.readAsDataURL(file);
        }
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const chatContainer = document.querySelector('.list');

    // Simulate a chat response
    function simulateChatResponse(message) {
        const chatBubble = document.createElement('div');
        chatBubble.classList.add('info_text');
        chatBubble.textContent = message;
        chatContainer.appendChild(chatBubble);
    }

    // Add click event listener to toggle-info class items
    const toggleInfoItems = document.querySelectorAll('.toggle-info');
    toggleInfoItems.forEach(item => {
        item.addEventListener('click', function () {
            // Toggle the display of the associated information text
            const infoText = item.nextElementSibling.querySelector('.info_text');
            infoText.style.display = (infoText.style.display === 'none' || infoText.style.display === '') ? 'block' : 'none';

            // Simulate a chat response when an item is clicked
            simulateChatResponse(infoText.textContent);
        });
    });
});




