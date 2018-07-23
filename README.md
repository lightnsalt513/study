# Study

## Exam 03

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