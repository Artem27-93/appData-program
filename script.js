'use strict';
// получаю все кнопки и пустые поля(инпуты) с index.html
let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

// делаю кнопки нерабочими, до момента нажатия на кнопку "Начать расчёт" 
expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

// функция собирает данные от пользователя, и выводит на экран "Доход" и дату
startBtn.addEventListener('click', function(){
    money = +prompt ("Ваш бюджет на месяц?", "");
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth()+1;
    dayValue.value = new Date(Date.parse(time)).getDate();

// делаю остальные кнопки обратно рабочими
    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
})

// после того как пользователь введёт в пустые поля значения, и нажмет кнопку, данные подсуммируются и отобразятся в "Обязательных расходах"
expensesBtn.addEventListener('click',function(){
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
    
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
    
            console.log ("done");
    
            appData.expenses[a] = b;
            sum += +b;
        } else {
            console.log ("bad result");
            i--;
        }
    
    }
    expensesValue.textContent = sum;
})
//  после того как пользователь введёт в пустые поля значения, и нажмет кнопку, данные отобразятся в "Возможные траты"
optionalExpensesBtn.addEventListener('click', function(){ 
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }
    
});
// данный обработчик событий, при клике на кнопку "Рассчитать", подсчитывает "Бюджет на 1 день" и "Уровень дохода"
countBtn.addEventListener('click', function(){

    if(appData.budget != undefined){
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Это высокий уровень достатка!";
        } else {
            levelValue.textContent = "Ошибочка...!";
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка!';
    }

});
// данный обработчик выводит на экран перечень "Дополнительных доходов" 
incomeItem.addEventListener('input', function(){
    let items = incomeItem.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;
});
// чек-бокс, для того чтобы убедится есть ли у пользователя накопления?
checkSavings.addEventListener('click', function(){
    appData.savings == true ? appData.savings = false : appData.savings = true;
});
//  обе функции ниже дублируются, чтобы пользователь смог ввести данные в поля "Сумма" и "Процент", и получить данные о накоплении за 1 месяц и за 1 год соответственно
sumValue.addEventListener('click', function(){
    if(appData.savings = true){
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1); 
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    } 
});

percentValue.addEventListener('click', function(){
    if(appData.savings = true){
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1); 
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

// глобальный объект appData, в который записываются все данные, которые вводит пользователь
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};
