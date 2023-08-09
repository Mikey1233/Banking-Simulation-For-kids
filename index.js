"use strict";
//intro UI
const arrow = document.querySelector('.x')
const blur = document.querySelector('.blur')
const noticeBoard = document.querySelector('.notice_board')
arrow.addEventListener('click',()=>{
  blur.remove()
  noticeBoard.remove()
})
blur.addEventListener(
  'click',()=>{
    blur.remove()
  noticeBoard.remove()
  }
)

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200.5, 450, -400, 3000, -650.06, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2023-06-03T21:31:17.178Z",
    "2023-06-01T07:42:02.383Z",
    "2023-06-03T09:15:04.904Z",
    "2023-06-28T10:17:24.185Z",
    "2023-05-29T14:11:59.604Z",
    "2023-05-31T17:01:17.194Z",
    "2023-06-02T23:36:17.929Z",
    "2023-05-30T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2023-06-03T21:31:17.178Z",
    "2023-05-31T07:42:02.383Z",
    "2023-05-27T09:15:04.904Z",
    "2023-06-28T10:17:24.185Z",
    "2023-05-29T14:11:59.604Z",
    "2023-05-31T17:01:17.194Z",
    "2023-06-02T23:36:17.929Z",
    "2023-05-30T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2023-05-28T21:31:17.178Z",
    "2023-05-31T07:42:02.383Z",
    "2023-05-30T09:15:04.904Z",
    "2023-06-02T10:17:24.185Z",
    "2023-05-31T14:11:59.604Z",
    "2023-05-27T17:01:17.194Z",
    "2023-05-30T23:36:17.929Z",
    "2023-05-29T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2023-06-03T21:31:17.178Z",
    "2023-05-31T07:42:02.383Z",
    "2023-05-27T09:15:04.904Z",
    "2023-06-28T10:17:24.185Z",
    "2023-05-29T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatDate = function (date, locale) {
  const calcDays = (date2, date1) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const now = new Date();
  const da = calcDays(now, date);
  if (da === 0) return "Today";
  if (da === 1) return "yesterday";
  if (da <= 7) return `${da} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

function formatCurrency(value, locale, currency) {
  const formattedBal = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value.toFixed(2));
  return formattedBal;
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    let type = `${mov < 0 ? `withdrawal :Dr` : `deposit :Cr`}`;
    let date = new Date(acc.movementsDates[i]);
    const displayDate = formatDate(date, acc.locale);
    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);
    const html = `
            <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>

            <div class="movements__value">${formattedMov}</div>
           </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//displayMovements(account1.movements);

function userName(user) {
  let name = user
    .toLowerCase()
    .split(" ")
    .map(value => value[0])
    .join("");
  return name;
}
function createUsername(acc) {
  acc.forEach(value => (value.userName = userName(value.owner)));
}
createUsername([account1, account2, account3, account4]);

function displayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.innerText = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
}
//displayBalance(account2.movements);
function displaySummary(movement, interestRate) {
  let sum = movement.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.innerText = formatCurrency(
    sum,
    currentAccount.locale,
    currentAccount.currency
  );
  let out = movement.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.innerText = formatCurrency(
    Math.abs(out),
    currentAccount.locale,
    currentAccount.currency
  );
  let interest = movement
    .filter(mov => mov > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.innerText = formatCurrency(
    interest,
    currentAccount.locale,
    currentAccount.currency
  );
}

let currentAccount;
let min;
let sec;
let time;
let y;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === (inputLoginUsername.value).toLowerCase()
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    printWelcome(currentAccount.owner.split(' ')[0])
   
    min = 5;
    sec = 60;
    time = 1000;
    if(y){  window.clearInterval(y)} 
     timeOut();
    updateUI(currentAccount);
containerApp.style.opacity = 100;
  }
  inputLoginPin.value = inputLoginUsername.value = null;
  inputLoginPin.blur();
  const now2 = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    weekday: "short",
  };
  const lang = currentAccount.locale;

  labelDate.innerText = new Intl.DateTimeFormat(lang, options).format(now2);
});
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    updateDate(currentAccount);
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    inputTransferTo.value = inputTransferAmount.value = null;
    if(y){  window.clearInterval(y)} 
    min = 5;
    sec = 60;
    time = 1000;
     timeOut();
  }
});

function updateUI(acc) {
  displayMovements(acc);
  displayBalance(acc);
  displaySummary(acc.movements, acc.interestRate);
}
//loan feature
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(dep => dep > 0.1 * amount)) {

    setTimeout(function () {
      currentAccount.movements.push(amount);

      //loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //update UI
      updateUI(currentAccount);
      inputLoanAmount.value = null;
      if(y){  window.clearInterval(y)} 
      min = 5;
      sec = 60;
      time = 1000;
       timeOut();
    }, 2000);
  }
});

//close acccount function
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      cur => cur.userName === currentAccount.userName
    );
    //delete user
    accounts.splice(index, 1);
    //close UI
    inputCloseUsername.value = inputClosePin.value = null;
    containerApp.style.opacity = 0;
    if(y){  window.clearInterval(y)} 
    labelWelcome.innerText = `Log in to get started`;
  }
});

//update dates when loan
function updateDate(acc) {
  let now = new Date().toISOString();
  acc.movementsDates.push(now);
}
let sorted = false;
btnSort.addEventListener('click', function () {
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
function checkEvenOrOdd(num) {
  console.log(`${num % 2 === 0 ? "even number" : "odd number"}`);
}

function timeOut() {
  if (min !== 0) {
    y = setInterval(function () {
      sec -= 1;
      if (sec === 1) {
        min -= 1;
        sec = 60;
      } else if (min === 0) {
        window.clearInterval(y);
        min = "00";
        sec = "00";
      }
      labelTimer.innerText = `${min} : ${sec}`;
    }, time);
  }
}

 function printWelcome (name) {
  const now = new Date();
  const greetings = new Map([
    [[6, 7, 8, 9, 10], 'Good Morning'],
    [[11, 12, 13, 14], 'Good Day'],
    [[15, 16, 17, 18], 'Good Afternoon'],
    [[19, 20, 21, 22], 'Good Evening'],
    [[23, 0, 1, 2, 3, 4, 5], 'Good Night'],
  ]);

  const arr = [...greetings.keys()].find(key => key.includes(now.getHours()));
  const greet = greetings.get(arr);
  labelWelcome.innerText = `${greet}, ${name}!`;
};


