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

* **.append()** : [jQuery API] 요소 내부의 마지막 요소로 삽입
* **.prepend()** : [jQuery API] 요소 내부의 첫번째 요소로 삽입


## Study 03 : 배열과 객체

* [배열 및 객체 관련 메써드 정리](./exam02/README.md)  
* **JS에서 this의 context** :
	* 함수에서의 this : 전역객체인 window 객체를 가르킨다
	* 메써드로서의 this : 자신이 속한 인스턴스(객체)를 가르킨다
	* jQuery 이벤트 리스터 안에서의 this : 이벤트가 발생한 요소객체를 가르킨다
* **implicit and explicit binding, and default binding**
	* implicit binding은 .(dot notation)을 통해서 함수를 선언하게 되면 좌측의 객체가 this context가 된다
	* explicit binding은 apply, call, bind 와 같은 메써를 통해 this의 context를 바꿔주는것이다
	* default binding은 위의 implicit, explicit 바인딩을 하지 않는 경우 상시 전역 context를 this로 가리킨다. 전역 context는 어디에서 작업을 하고 있는지가 중요하며, 브라우저에서의 this는 window를 가르킨다. 단, strict mode를 사용할 경우 전역 context는 undefined가 된다. 
* **call, apply, bind 메써드**
	* call 메써드 : func.call(context, arg1, arg2) 형태로 사용하며, 첫번째 매개변수는 this로 사용할 context이고, 이후 매개변수는 호출하는 함수로 전달됨
	* apply 메써드 : call과 거의 유사하며, 다른점으로는 call은 매개변수를 직접 받지만 apply는 매개변수는 배열로 받는다 -> func.apply(context, [arg1, arg2]); 흔히 사용되는 예제는 배열의 최소값과 최대값을 구할때 사용된다. e.g. Math.min.apply(null, array); 여기서 this의 context에 null을 쓰는 이유는 Math.min, Math.max는 this와 관계 없이 동작하기 때문이다.
	* bind 메써드 : bind는 좀 예외적이다. 이 메써드는 this context를 바꾸는것과 동시에 새로운 함수를 생성한다. 
	Reference : https://gist.github.com/zcaceres/2a4ac91f9f42ec0ef9cd0d18e4e71262
* **$.proxy(function, context)** : [jQuery API] 함수 내부에서 또다른 함수의 this를 걷에 감싸고 있는 객체를 가르키고 싶을때 사용


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

* **call back 함수에서의 this**
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

* **.trigger(eventType [, extraParameters])** : [jQuery API] 이벤트를 수동적으로 발생하게 하는 메써드
* **.triggerHandler(eventType [, extraParameters])** : [jQuery API] jQuery를 사용해 바인딩 된 이벤트 핸들러만 trigger하고 이벤트의 브라우저 자체의 이벤트 핸들러는 실행시키고 싶지 않을때는 triggerHandler 메써드를 사용

```html
<script>
$( "#old" ).click(function() {
  $( "input" ).trigger( "focus" ); // input에 포커스가 이동하고 아래의 focus 이벤트 핸들러도 실행
});
$( "#new" ).click(function() {
  $( "input" ).triggerHandler( "focus" ); // 아래의 focus 이벤트 핸들러만 실행됨 (focus는 이동하지 않음)
});
$( "input" ).focus(function() {
  $( "<span>Focused!</span>" ).appendTo( "body" ).fadeOut( 1000 );
});
</script>
```

## Study 04 : Bear Event

* **event.preventDefault()** : 부여하는 이벤트 외에 별도의 브라우저 이벤트 발생을 막음
* **event.stopPropagation()** : 부모태그로 이벤트 전파(bubbling up)를 중지시킴 (preventDefault와 같이 기본 브라우저 동작은 막지 못함) [ie9]
* **event.stopImmediatePropagation()** : 같은 이벤트에서 다른 리스너들이 불려지는 것을 막음 [ie9]
* **return false** : jQuery를 사용한 이벤트 핸들러 내에 return false를 쓰면 stopPropagation과 preventDefault를 모두 수행하는 효과를 얻을 수 있음 (non-jQuery에서는 같은 효과를 얻을수 없음을 참고)

## Study 05 : 레이어 팝업

* **실행 컨텍스트**
	* 함수 내에서 선언된 변수는 해당 함수 안에서만 사용할 수 있음
	* 내부 함수에서는 외부 함수로 접근할 수 있지만, 외부 함수에서는 내부 함수로 접근 불가
	* Scope는 함수를 호출할 때가 아닌 **선언 시점** 에 생김. 정적 스코프라도 불림
	* lexical scoping : 함수를 처음 선언하는 순간, 함수 내부의 변수는 자기 스코프에서 가장 가까운 곳에 있는 변수를 계속 참조하게 됨. 전역변수를 만드는것은 지양해야 하는데 간단한 해결 방법으로는 함수 안에 넣어 지역변수로 만들거나 객체의 속성으로 만들 수 있으며 이런 방법을 **네임스페이스** 를 만드는것이라고 표한하기도 함. Reference : https://www.zerocho.com/category/Javascript/post/5740531574288ebc5f2ba97e
	
	```html
	<script>
	var obj = {
	  x: 'local',
	  y: function() {
	    alert(this.x);
	  }
	}
	
	// 위와 같이 선언하면 변수가 겹칠 우려를 최소화 하기는 하나, obj.x = "changed" 처럼 고의적으로 변경이 가능함
	// 이를 방지하기 위해서는 아래와 같이 함수로 감싼 후 return을 통해 공개할 변수와 비공개할 변수는 비공개하는 방법을 취할 수 있음
	var another = function () {
	  var x = 'local';
	  function y() {
	    alert(x);
	  }
	  return { y: y };
	}
	var newScope = another();
	
	// 이것을 간략하게 하면 IIFE(즉시 호출 함수 표현식) / 모듈패턴 을 사용하여 바로 실행시킬 수도 있움
	var newScope = (function () {
	  var x = 'local';
	  return {
	    y: function() {
	      alert(x);
	    }
	  };
	})();
	</script>
	```
	
	* 컨텍스트의 4가지 원칙 :
		* 브라우저가 스크립트를 로딩하는 순간 **전역 컨텍스트** 1개 생성 되며, 함수 호출 시마다 **함수 컨텍스트** 가 생성됨
		* 컨텍스트 생성 시 컨텍스트 안에 변수객체(arguments, variable), scope chain, this가 생성됨
		* 컨텍스트 생성 후 함수가 실행되며 사용되는 변수는 변수 객체 안에서 값을 찾고 없으면 스코프 체인을 따라 올라가며 찾게됨
		* 함수 실행이 마무리되면 해당 컨텍스트를 없어짐. (클로저 제외) 페이지가 종료되면 전역 컨텍스트가 사라짐
* **호출 스택**
	* 함수가 쌓이는 순서와 반대로 실행이 됨; LIFO(마지막에 들어온 것이 먼저 나감) 구조
	* 브라우저마다 호출 스택 최대치가 다르며 보통 만개 정도로 보고 있음
* **이벤트 루프**
	* JS는 보통 **싱글 쓰레드(single thread)** 라고 불림
* **setTimeout** : 
* Reference : https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
* Reference : https://www.zerocho.com/category/JavaScript/post/597f34bbb428530018e8e6e2

## Study 06 : Slick & Hash

* 

## Study 08 :  

* **$.fn** : jQuery의 prototype을 뜻함
* **$.extend()** : 여러 객체를 merge함

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