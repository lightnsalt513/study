# Study

## Study 01 : 선택자

* 순수 JavaScript를 활용한 경우 DOM 제어에 상당한 어려움이 있음
* Selector 예제를 통해 순수 JavaScript와 jQuery 라이브러리를 사용하여 DOM을 선택하고 제어하는 것의 차이를 체감
* 예시) 클래스명으로 요소 선택
	JS     : var examObj1 = document.getElementsByClassName('exam_wrap')[0];
    jQuery : var examObj1 = $('.exam_wrap:eq(0)');


```html
	<script>
	// JS로 DOM 제어
	var examObj3 = document.getElementsByClassName('exam_wrap')[2];
	examObj3.getElementsByTagName('button')[0].onclick = function(){
		var examChild = examObj3.getElementsByClassName('exam_q')[0].querySelectorAll('*');
		for (var i = 0; i < examChild.length; i++) {
			var condition1 =  examChild[i].previousElementSibling;
			if (condition1 == null) {
				examChild[i].style.backgroundColor = 'yellow';
			}
		}
	};

	// 동일한 기능을 jQuery를 사용하여 DOM 제어
	var examObj3 = $('.exam_wrap:eq(2)');
	examObj3.find('button').on('click', function(){
		examObj3.find('.exam_q *:first-child').css('background','yellow');
	});
	</script>
```

## Study 02 : if, for, while 문

* if, switch와 같은 조건문과 for, while과 같은 반복문을 활용해 보는 예제를 통해 특정 조건의 경우 함수 실행하는 방법을 숙지
	* 조건문의 경우 특정 조건에 함수 호출 등 코드 실행
	* 반복문의 경우 각 조건에 함수 호출 등 코드 실행

* .append() : 요소 내부의 마지막 요소로 삽입
* .prepend() : 요소 내부의 첫번째 요소로 삽입


## Study 03 : 배열과 객체

* [배열 및 객체 관련 메써드 정리](../exam02/README.md)  
* JS에서 this의 context :
	* 함수에서의 this : 전역객체인 window 객체를 가르킨다
	* 메써드로서의 this : 자신이 속한 인스턴스(객체)를 가르킨다
	* jQuery 이벤트 리스터 안에서의 this : 이벤트가 발생한 요소객체를 가르킨다
* implicit and explicit binding, and default binding
	* implicit binding은 .(dot notation)을 통해서 함수를 선언하게 되면 좌측의 객체가 this context가 된다
	* explicit binding은 apply, call, bind 와 같은 메써를 통해 this의 context를 바꿔주는것이다
	* default binding은 위의 implicit, explicit 바인딩을 하지 않는 경우 상시 전역 context를 this로 가리킨다. 전역 context는 어디에서 작업을 하고 있는지가 중요하며, 브라우저에서의 this는 window를 가르킨다. 단, strict mode를 사용할 경우 전역 context는 undefined가 된다. 
* call, apply, bind 메써드
	* call 메써드 : func.call(context, arg1, arg2) 형태로 사용하며, 첫번째 매개변수는 this로 사용할 context이고, 이후 매개변수는 호출하는 함수로 전달됨
	* apply 메써드 : call과 거의 유사하며, 다른점으로는 call은 매개변수를 직접 받지만 apply는 매개변수는 배열로 받는다 -> func.apply(context, [arg1, arg2]); 흔히 사용되는 예제는 배열의 최소값과 최대값을 구할때 사용된다. e.g. Math.min.apply(null, array); 여기서 this의 context에 null을 쓰는 이유는 Math.min, Math.max는 this와 관계 없이 동작하기 때문이다.
	* bind 메써드 : bind는 좀 예외적이다. 이 메써드는 this context를 바꾸는것과 동시에 새로운 함수를 생성한다. 
	Reference : https://gist.github.com/zcaceres/2a4ac91f9f42ec0ef9cd0d18e4e71262
* $.proxy(function, context) : 함수 내부에서 또다른 함수의 this를 걷에 감싸고 있는 객체를 가르키고 싶을때 사용


```html
<script>
// proxy 예제
function Person(el) {
	this.name = '';
	
	$(el).change(jQuery.proxy(function(event) {
		this.name = event.target.value;
	}, this));
}

// call, apply, bind 예제
const bruce = {
	name : 'Bruce'
};

const madeline = {
	name : 'Madeline'
};

function greet(){
	return `Hello, I'm ${this.name}`;
};

greet();               // 'Hello, I'm undefined' - this는 어디에도 묶이지 않음
greet.call(bruce)     // 'Hello, I'm Bruce'     - this는 bruce
greet.call(madeline)   // 'Hello, I'm Madeline'  - this는 madeline

function update(birthYear, occupation){
	this.birthYear = birthYear;
	this.occupation = occupation;
};

update.call(bruce, 1949, 'singer'); // bruce 변경
/*
bruce는 이제
{
	name : 'Bruce',
	birthYear : 1949,
	occupation : 'singer'
}
로 변경됨
*/

// apply 예제
update.apply(bruce, [1955, 'actor']);
/*
bruce는 이제
{
	name : 'Bruce',
	birthYear : 1955,
	occupation : 'actor'
}
로 변경됨
*/

// bind 예제
const updateBruce = update.bind(bruce);

updateBruce(1904, "actor");
// bruce 는 이제 { name: "Bruce", birthYear: 1904, occupation: "actor" }

updateBruce.call(madeline, 1274, "king");
// bruce 는 이제 { name: "Bruce", birthYear: 1274, occupation: "king" };
// madeline은 변하지 않음

예제 출처: http://ibrahimovic.tistory.com/29 [Web Standard]

</script>
```

* call back 함수에서의 this
	* 아래의 예제에서 obj.doStuff는 invoke(호출) 되지 않음으로 this가 바라보는 context가 되지 않는다. 해당 예제에서는 setTimeout이 context가 된다. 이걸 해결하기 위해서는 bind 메서드를 사용할 수 있다.
	Reference : https://gist.github.com/zcaceres/2a4ac91f9f42ec0ef9cd0d18e4e71262

```html
<script>
var MyObject = function (){
    this.name = 'MyObjectName';
    this.myProperty = 'property';
  };

  MyObject.prototype.doStuff = function (action) {
    console.log(this.name + ' is ' + action + '!');
  }

  var obj = new MyObject();

  setTimeout(obj.doStuff, 1000, 'awesome'); // prints ' is awesome!' after a 1 second delay.
         // ^ Here's our callback!
		 
  // bind 메서드를 통해 this를 MyObject에 바인딩한다
  setTimeout(obj.doStuff.bind(obj), 1000, 'awesome'); // prints 'MyObjectName is awesome!' after a 1 second delay.
</script>
```

* .trigger(eventType [, extraParameters]) : 

```html
	<script>
	</script>
```

## Study 04 : 

## Exam 11

* $.fn : jQuery의 prototype을 뜻함
* $.extend() : 여러 객체를 merge함

```html
    <script>
    $.extend(obj1, obj2);          // obj2의 값을 obj1에 합친다

	var object1 = {
	  apple: 0,
	  banana: { weight: 52, price: 100 },
	  cherry: 97
	};
	var object2 = {
	  banana: { price: 200 },
	  durian: 100
	};
	 
	// Merge object2 into object1
	$.extend( object1, object2 );

	//{"apple":0,"banana":{"price":200},"cherry":97,"durian":100}


	$.extend(true, obj1, obj2);    // obj2의 값을 ob1에 recursively하게 합친다. key값이 겹치는 부분의 값만 덮어쓰기 진행

	var object1 = {
	  apple: 0,
	  banana: { weight: 52, price: 100 },
	  cherry: 97
	};
	var object2 = {
	  banana: { price: 200 },
	  durian: 100
	};
	 
	// Merge object2 into object1, recursively
	$.extend( true, object1, object2 );

	//object 1 : {"apple":0,"banana":{"weight":52,"price":200},"cherry":97,"durian":100}


	$.extend({}, obj1, obj2);    // obj1을 modify하지 않고 obj2와 obj1을 머지한다

	var defaults = { validate: false, limit: 5, name: "foo" };
	var options = { validate: true, name: "bar" };
	 
	// Merge defaults and options, without modifying defaults
	var settings = $.extend( {}, defaults, options );

	defaults -- {"validate":false,"limit":5,"name":"foo"}
	options -- {"validate":true,"name":"bar"}
	settings -- {"validate":true,"limit":5,"name":"bar"}
    </script>
 ```

* $.fn.extend() : jQuery prototype ($.fn) 객체에 새로은 매써드를 추가하여 확장하는 함수
	
```html
	<script>
	$.fn.extend({
	  method1 : function(){}
	});
	</script>
```

* .prop() : ~~~

## Others
### var, const, let 

* var 은 scope 가 함수단위인 반면 const와 let은 scope 단위 (let은 바뀌게 될 수도 있는 변수에 선언)

```html
	<script>
	function foo() {
		var a = 'hello';
		if (true) {
			var a = 'bye';
			console.log(a); // bye
		}
		console.log(a); // bye
	}
	
	function foo() {
		let a = 'hello';
		if (true) {
			let a = 'bye';
			console.log(a); // bye
		}
		console.log(a); // hello
	}
	</script>
```