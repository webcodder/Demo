var app1 = new Vue({
	el: '#app1',
	data: {
		message: 'hnbjk',
		message1: 'hnbjk'
	}
});

var app2 = new Vue({
	el: '#app2',
	data: {
		message: 'http://www.baidu.com',
		message1: 'baidu'
	}
});

var app3 = new Vue({
	el: '.app3',
	data: {
		screen: false
	}
});

var app4 = new Vue({
	el: '#app4',
	data: {
		todos: [
			{ text: 'Learn JavaScript' },
			{ text: 'Learn Vue' },
			{ text: '123' }
		]
	}
});