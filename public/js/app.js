console.log('Client side JavaScript is loaded!');

//fetch API
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// 	response.json().then((data) => {
// 		console.log(data);
// 	});
// });

const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1'); //select by id
const msg2 = document.querySelector('#msg2');
// msg1.textContent = 'small change from JS';

weatherform.addEventListener('submit', (e) => { //e -> event
	e.preventDefault(); //stop browser refreshing
	const location = search.value;

	msg1.textContent = 'Loading...';
	msg2.textContent = '';

	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if(data.error) {
				// console.log({error: data.erro1r});
				msg1.textContent = data.error;
			} else {
				// console.log({
				// 	location: data.location,
				// 	forecast: data.forecast
				// });
				msg1.textContent = data.location;
				msg2.textContent = data.forecast;
			}
		});
	});
});