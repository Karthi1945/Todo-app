const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
const filterCategory = document.getElementById("filter-category");

const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !== null ? localStorageTrans : [];

function loadTransactionDetails(transaction) {
  const sign = transaction.category == 'Expenses' ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.category == 'Expenses' ? "exp" : "inc");
  item.innerHTML = `
    ${transaction.description}
    <span>${sign} ${(transaction.amount)}</span>
    
    <span>${transaction.category}</span>
    <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>
   
  `;
  trans.appendChild(item);
 
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




  function updateAmount() {
    
   
    
    const income = transactions.filter((transaction) => transaction.category === "Income").map((transaction) => transaction.amount);
    const income1 =income.reduce((acc, item) => (acc += Number(item)), 0);
    inc_amt.innerHTML = `₹  ${income1}`;
    
    const category1 =  transactions.filter((transaction) => transaction.category === "Expenses").map((transaction) => transaction.amount);
    const expense = category1.reduce((acc, item) => (acc += Number(item)), 0);
    exp_amt.innerHTML = `₹  ${Math.abs(expense)}`;

    const total = expense - income1;
    balance.innerHTML = `₹  ${Math.abs(total)}`;
  
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
      amount: amount.value,
      category : category.value,
      
      
    };
    transactions.push(transaction);
    /*loadTransactionDetails(transaction);*/
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

filterCategory.addEventListener("change", (e) => {
  const category = e.target.value;
  
  console.log(category);
  if (category === "All") {
    loadTransactionDetails(transactions);
}
if (category === "Expenses") {

  const expenselist = transactions.filter((transaction) => transaction.category === "Expenses");
  loadTransactionDetails(expenselist);
}
if (category === "Income") {
  const Incomelist =transactions.filter((transaction) => transaction.category === "Income");
  loadTransactionDetails(Incomelist);
}

  })