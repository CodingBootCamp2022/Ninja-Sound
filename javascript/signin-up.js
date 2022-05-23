//--------- element variables
let signInSwitch = document.querySelector('.in-btn');
let signUpSwitch = document.querySelector('.up-btn');
let signIn = document.querySelector('.signin-btn');
let signUp = document.querySelector('.signup-btn');
let signInForm = document.querySelector('.sign-in');
let signUpForm = document.querySelector('.sign-up');
let heading = document.querySelector('h2');
let message = document.querySelector('.message');
let inputs = document.querySelectorAll('input');
let orSign = document.querySelector('.social-media div p');

console.log(orSign);

//---------- event listeners
signInSwitch.addEventListener('click', switchForm);
signUpSwitch.addEventListener('click', switchForm2);
signUp.addEventListener('click', signUpFunc);
signIn.addEventListener('click', signInFunc);
message.children[1].addEventListener('click', closeMessage);

inputs.forEach((e) => {
  e.addEventListener('click', remove);
});

//---------- functions
function switchForm(e) {
  e.target.classList.add('active');
  signUpSwitch.classList.remove('active');
  signInForm.style.display = 'block';
  signUpForm.style.display = 'none';
  heading.textContent = 'Welcome Back';
  orSign.textContent = 'or sign in with';
}

function switchForm2(e) {
  e.target.classList.add('active');
  signInSwitch.classList.remove('active');
  signInForm.style.display = 'none';
  signUpForm.style.display = 'block';
  heading.textContent = 'Welcome';
  orSign.textContent = 'or sign up with';
}

// ------------- save data to local storage
function signUpFunc(e) {
  e.preventDefault();

  let count = 0;

  let firstName = signUpForm.children[0].value;
  let lasttName = signUpForm.children[1].value;
  let email = signUpForm.children[2].value;
  let password = signUpForm.children[3].value;

  let valuesArr = [firstName, lasttName, email, password];

  let users = JSON.parse(localStorage.getItem('users'));

  for (let i = 0; i < valuesArr.length; i++) {
    if (!valuesArr[i]) {
      signUpForm.children[i].classList.add('empty');
      count++;
    }
  }

  if (count) {
    count = 0;
    return;
  }

  if (users) {
    for (let j = 0; j < users.length; j++) {
      if (email === users[j].email) {
        message.classList.add('pop-in');
        message.children[0].textContent = 'E-mail already in use';
        message.style.display = 'flex';
        // message.style.top = '13px';
        return;
      }
    }

    let userObj = {
      userName: `${firstName} ${lasttName}`,
      email: email,
      password: password,
      likes: [],
      listening: [],
    };
    users.push(userObj);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('email', JSON.stringify(email));

    window.location.href = 'dashboard.html';
  } else {
    let usersArr = [];
    let userObj = {
      userName: `${firstName} ${lasttName}`,
      email: email,
      password: password,
      likes: [],
      listening: [],
    };
    usersArr.push(userObj);
    userObj;
    localStorage.setItem('users', JSON.stringify(usersArr));
    localStorage.setItem('email', JSON.stringify(email));

    window.location.href = 'dashboard.html';
  }

  signUpForm.children[0].value = '';
  signUpForm.children[1].value = '';
  signUpForm.children[2].value = '';
  signUpForm.children[3].value = '';
}

function signInFunc(e) {
  e.preventDefault();
  let email = signInForm.children[0].value;
  let password = signInForm.children[1].value;
  let users = JSON.parse(localStorage.getItem('users'));

  if (!email && !password) {
    signInForm.children[0].classList.add('empty');
    signInForm.children[1].classList.add('empty');
  } else if (!email && password) {
    signInForm.children[0].classList.add('empty');
  } else if (email && !password) {
    signInForm.children[1].classList.add('empty');
  } else {
    if (users) {
      for (let i = 0; i < users.length; i++) {
        if (email === users[i].email) {
          if (password === users[i].password) {
            localStorage.setItem('email', JSON.stringify(email));
            window.location.href = 'dashboard.html';
            return;
          } else {
            message.classList.add('pop-in');
            message.children[0].textContent = 'Incorrect E-mail or password';
            message.style.display = 'flex';
            return;
          }
        }
      }
      message.classList.add('pop-in');
      message.children[0].textContent = 'Incorrect E-mail or password';
      message.style.display = 'flex';
    } else {
      message.classList.add('pop-in');
      message.style.display = 'flex';
    }
  }
}

function closeMessage(e) {
  message.classList.remove('pop-in');
  message.classList.add('pop-out');
  setTimeout(() => {
    message.classList.remove('pop-out');
    message.style.display = 'none';
  }, 1000);
}

function remove(e) {
  e.target.classList.remove('empty');
}
