const inputTotal = document.querySelector('#inputTotal');
const billAndTips = document.querySelector('#billAndTips');
const inputPeople = document.querySelector('#inputPeople');
const buttonReduce = document.querySelector('#reduce');
const buttonRaise = document.querySelector('#raise');
let bill;
let people;
let tip = 0;

// 1 - получаем дату и заполняем поле бланка
const month = {
	0: 'January',
	1: 'February',
	2: 'March',
	3: 'April',
	4: 'May',
	5: 'June',
	6: 'July',
	7: 'August',
	8: 'September',
	9: 'October',
	10: 'November',
	11: 'December'
}

const today = `Date: ${new Date().getDate()} ${month[new Date().getMonth()]}, ${new Date().getUTCFullYear()}`;
document.querySelector('#today').textContent = today;

// 2 - ставим подслушку на input - пользователь вводит сумму счета
// запускаем функцию проверки полей (заполнены ли поля - сумма и количество человек)
// запускаем функцию расчета
inputTotal.addEventListener(('keyup'), function (e) {
	e.preventDefault();
	checkInputTotal();
	checkInputPeople();
	calculateAmount();
});


// 3 - ставим подслушку на input - пользователь вводит количество человек
// запускаем функцию проверки полей (заполнены ли поля - сумма и количество человек)
// запускаем функцию расчета
inputPeople.addEventListener(('keyup'), function (e) {
	e.preventDefault();
	checkInputPeople();
	checkInputTotal();
	calculateAmount();
});


// 4 - ставим подслушку на кнопки - увеличить или уменьшить чаевые, шаг - 5%
// 4.1 - если пользователь нажал на минус, проверяем,
// если чаевые равны нулю, оставляем без изменения
// если больше нуля - убавляем 5%
buttonReduce.addEventListener('click', function (e) {
	e.preventDefault();
	tip <= 0 ? tip = 0 : tip = tip - 5;
	calculateAmount();
	if (tip === 0) {
		document.querySelector('#inputTip').value = `No tip`;
	}
	else {
		document.querySelector('#inputTip').value = `% ${tip}`;
	}
});
// 4.2 - если пользователь нажал на плюс, приавляем 5%
buttonRaise.addEventListener('click', function (e) {
	e.preventDefault();
	tip = tip + 5;
	calculateAmount();
	document.querySelector('#inputTip').value = `% ${tip}`;
});


// 5 - функция проверки счета
// если сумма счета больше или равна нулю, принимаем ее в расчет
// в остальных случаях (это буквы, меньше нуля и т.д.) - присваиваем NaN
function checkInputTotal() {
	if (inputTotal.value.trim() >= 0) {
		bill = inputTotal.value.trim();
	} else {
		bill = NaN;
	}
}
// 6 - функция проверки человек
// если количество человек больше или равна одному (делится без остатка, т.е.
// целое число), принимаем ее в расчет
// в остальных случаях (это буквы, меньше одного или не и т.д.) - присваиваем NaN
function checkInputPeople() {
	if (inputPeople.value.trim() >= 1 && inputPeople.value.trim() % 1 === 0) {
		people = inputPeople.value.trim();
	} else {
		people = NaN;
	}
}


// 7 - функция расчета
function calculateAmount() {
	// если какое счет или количество человек NaN, то опустошаем поля расчета
	if (isNaN(bill) || isNaN(people)) {
		document.querySelector('#billAndTips').textContent = '';
		document.querySelector('#dividedBill').textContent = '';
		document.querySelector('#tipPerPerson').textContent = '';
		document.querySelector('#totalSum').textContent = '';
	}
	// если есть числа, то ведем расчет
	else {

		// 7.1 - общий счет (сумма счета и чаевых)
		let billAndTips = bill * (1 + (tip / 100));

		// 7.2 - сколько заплатит 1 человек
		let amountPerPerson = bill / people;
		console.log(amountPerPerson);


		// 7.3 - сколько чаевых заплатит 1 человек
		let tipPerPerson = (bill * tip) / (people * 100);
		console.log(tipPerPerson);


		// 7.4 - сумма счета и чаевых на 1 человека
		let totalSum = amountPerPerson + tipPerPerson;
		console.log(totalSum);

		// 7.5 - заполнить ячейки данными
		billAndTips = billAndTips.toFixed(2);
		document.querySelector('#billAndTips').textContent = '$ ' + billAndTips;
		amountPerPerson = amountPerPerson.toFixed(2);
		document.querySelector('#dividedBill').textContent = '$ ' + amountPerPerson;
		tipPerPerson = tipPerPerson.toFixed(2);
		document.querySelector('#tipPerPerson').textContent = '$ ' + tipPerPerson;
		totalSum = totalSum.toFixed(2);
		document.querySelector('#totalSum').textContent = '$ ' + totalSum;
	}
};

gsap.from ("label", {
    opacity: 0,
    duration: .6,
    stagger: .6
})

gsap.from (".fillTips", {
    opacity: 0,
    duration: .6,
    delay: 1.2
})