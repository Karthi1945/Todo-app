const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category")

const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !== null ? localStorageTrans : [];

function loadTransactionDetails(transaction) {
  const sign = transaction.category == 'Expenses' ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.category == 'Expenses' ? "exp" : "inc");
  item.innerHTML = `
    ${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <span>${transaction.category}</span>
    <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>
    <button class="btn-edt" onclick="editTrans(${transaction.id})">Edit</button>
  `;
  trans.appendChild(item);
  //console.log(transaction);
}

function removeTrans(id) {
  if (confirm("Are you sure you want to delete Transcation?")) {
    transactions = transactions.filter((transaction) => transaction.id != id);
    config();
    updateLocalStorage();
  } else {
    return;
  }
}


function editTrans(id) {
    if (confirm("Are you sure you want to edit Transcation?")) {

      const edit = transactions.find((transaction) => transaction.id == id)
      
      document.getElementById("amount").value = edit.amount;
      document.getElementById("category").value = edit.category;
      document.getElementById("desc").value = edit.date;
      transactions = edit.filter(edit => edit.id !== id);
      
      config();
      updateLocalStorage();
    } else {
      return;
    }
  }

function updateAmount() {
  const amounts = transactions.map((transaction) => transaction.amount);
 const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  balance.innerHTML = `₹  ${total}`;
  
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  inc_amt.innerHTML = `₹  ${income}`;

  const category = transactions.map((transaction) => transaction.category);
  if(category == 'Expenses'){
    const expense= amounts.reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    console.log(category);
    console.log(expense);
  exp_amt.innerHTML = `₹  ${Math.abs(expense)}`;}

  /*const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    console.log(expense)
  exp_amt.innerHTML = `₹  ${Math.abs(expense)}`;*/

}
function config() {
  trans.innerHTML = "";
  transactions.forEach(loadTransactionDetails);
  updateAmount();
}

function addTransaction(e) {
  e.preventDefault();
  if (description.value.trim() == "" || amount.value.trim() == "") {
    alert("Please Enter Description and amount");
  } else {
    const transaction = {
      id: uniqueId(),
      description: description.value,
      amount: +amount.value,
      category : category.value,
    };
    transactions.push(transaction);
    loadTransactionDetails(transaction);
    description.value = "";
    amount.value = "";
    category.value = "";
    updateAmount();
    updateLocalStorage();
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 10000000);
}

form.addEventListener("submit", addTransaction);

window.addEventListener("load", function () {
  config();
});

function updateLocalStorage() {
  localStorage.setItem("trans", JSON.stringify(transactions));
}