# Study

## Study 01 : Selector 연습

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

## Study 02 : if, for, while 문 연습

* if, switch와 같은 조건문과 for, while과 같은 반복문을 활용해 보는 예제를 통해 특정 조건의 경우 함수 실행하는 방법을 숙지
* if문의 경우 

* .append() : 


## Study 03 : 

* $.proxy(function, context) : 

```html
	<script>
	</script>
```

* .call() :
* .apply() : 

```html
	<script>
	</script>
```

* .trigger(eventType [, extraParameters]) : 

```html
	<script>
	</script>
```

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