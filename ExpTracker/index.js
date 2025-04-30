document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expense-form");
    const expenseName = document.getElementById("expense-name");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem('expenses'));
    let totalAmount = calculateTotalAmount();

    renderExpenses();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value.trim());

        if(name !== "" && !isNaN(amount)) {
            const newExpense = { 
            id: Date.now(),   
            name: name, 
            amount: amount,
            };
            expenses.push(newExpense);
            saveExpensesTolocal();
            updateTotal();
            

            // Clear the input fields
            expenseName.value = "";
            expenseAmount.value = "";
        }
    
    });

    function renderExpenses(){
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} - $${expense.amount.toFixed(2)}
                <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }



    function calculateTotalAmount() {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }
 

    function saveExpensesTolocal(){
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateTotal(){
        totalAmount = calculateTotalAmount();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    expenseList.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter((expense) => expense.id !== expenseId);
            saveExpensesTolocal();
            renderExpenses();
            updateTotal();
        }
    });


});