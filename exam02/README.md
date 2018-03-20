## Array.prototype
* Array.join() : 배열의 모든 요소를 연결해 하나의 문자열로 만듬
    ```html
    <script>
    var myArray = ['바람', '비', '불'];
    var myVar = myArray.join();      // myVar에 '바람,비,불'을 대입
    var myVar2 = myArray.join(', ');  // myVar2에 '바람, 비, 불'을 대입
    var myVar3 = myArray.join(' + '); // myVar3에 '바람 + 비 + 불'을 대입
    var myVar4 = myArray.join('');    // myVar4에 '바람비불'을 대입
    console.log(myVar);
    </script>
    ```

* Array.reverse() : 배열의 요소 순서를 역순으로 전환함 
    ```html
    <script>
    var myArray = ['첫번째', '두번째', '세번째'];
    var myVar = myArray.reverse(); // 기존 myArray 배열의 순서를 역순으로 전환하여 배열 생성
    console.log(myVar);
    </script>
    ```

* Array.sort() : 배열의 요소 정렬을 변경하는 함수이며, 정렬은 알파벳 또는 ASCII 문자의 오름차 순서로 정렬됨 (내림차순으로도 설정 가능함)
    ```html
    <script>
    var myText = ['pineapple', 'apple', 'banana'],
        myNum = [2, 10, 4, 9, 20],
        myArrObj = [
            { name : '나은', age : '30' },
            { name : '하은', age : '50' },
            { name : '가은', age : '20' },
            { name : '다은', age : '10' }
        ];
    var myVar = myText.sort().join(', '); // apple, banana, pineapple 오름차순으로 정렬
    var myVar2 = myText.sort().reverse().join(', '); // pineapple, banana, apple 내림차순으로 정렬
    var myVar3 = myNum.sort().join(', '); // 10, 2, 20, 4, 9
                                         // ASCII 문자 순서로 정렬됨
    var myVar4 = myNum.sort(function(a, b) {
        return a - b; // 2, 4, 9, 10, 20
                      // 숫자 오름차순으로 정상 정렬
    }).join(', ');
    var myVar5 = myNum.sort(function(a, b) {
        return b - a; // 20, 10, 9, 4, 2 
                      // 숫자 내림차순으로 정상 정렬
    }).join(', ');
    console.log(myVar);
    </script>
    ```

* Array.concat() : 2개 이상의 배열을 연결해 하나의 배열로 생성
    ```html
    <script>
    var myArray = ['바나나', '사과', '파인애플'],
        myArray2 = ['복숭아', '멜론', '딸기'],
        myArray3 = ['수박', '자두'];
    var myVar = myArray.concat(myArray2, myArray3);      // 
    console.log(myVar);
    </script>
    ```

* Array.slice() : 배열 내 선택된 요소를 새로운 배열 객체로 반환
                  ㄴ array.slice(start, end)
                  ㄴ start : 선택적; !!!!! 확인
                  ㄴ 위의 argument에서 starting index는 포함되며, ending index 요소는 미포함됨
                  ㄴ 음수 값으로 지정시 배열의 마지막 요소부터 선택됨
    ```html
    <script>
    var myArray = ['바나나', '사과', '파인애플', '복숭아', '딸기'];
    var myVar = myArray.slice(1, 3).join(', ');      // 사과, 파인애플
    var myVar2 = myArray.slice(-3, -1).join(', ');      // 파앤애플, 복숭아
    var myVar3 = myArray.slice(-3).join(', ');      // 파앤애플, 복숭아, 딸기 (ending index 미 선언 시 배열 마지막 요소까지 포함)
    console.log(myVar);
    </script>
    ```

* Array.splice() : 배열에서 선택된 요소를 추가 또는 제거하여 해당 요소를 반환함
                   ㄴ array.splice(index, howmany, item1, ....., itemX)
                   ㄴ index : 필수; 추가/제거할 요소의 위치 (배열의 마지막 순서부터 지정하고자 하는 경우 음수값 사용)
                   ㄴ howmany : 선택적; 제거될 요소의 개수
                   ㄴ item1,...,itemX : 선택적; 배열에 추가될 요소
    ```html
    <script>
    var myArray = ['바나나', '사과', '파인애플', '복숭아', '딸기'];
    var myVar = myArray.splice(3).join(', ');      // 복숭아, 딸기 (4번째부터 끝까지 제거)
    var myVar2 = myArray.splice(2, 1).join(', ');      // 파인애플 (3번째부터 요소 1개 제거)
    var myVar3 = myArray.splice(2, 2, 'Kiwi', 'Lemon');      // !!!!확인필요
    console.log(myVar);
    </script>
    ```

* Array.push() : 배열의 마지막 순서에 새로운 요소를 추가한 후 새로운 length값 반환
                 ㄴ array.push(item1, item2, ..., itemX)
    ```html
    <script>
    var myArray = ['바나나', '사과', '딸기'];
    var myVar = myArray.push('새로운 과일'');    // 4
    var myVar2 = myArray.join(', ');    // 바나나, 사과, 딸기, 새로운 과일
    console.log(myVar);
    </script>
    ```         

* Array.pop() : 배열의 마지막 요소를 제거하고 해당 요소를 반환함
                ㄴ 배열의 length 값을 변경하게 됨
    ```html
    <script>
    var myArray = ['바나나', '사과', '딸기', '마지막 과일'];
    var myVar = myArray.pop();    // 마지막 과일
    console.log(myVar);
    </script>
    ``` 

* Array.shift() : 배열의 첫번째 요소를 제거하고 해당 요소를 반환함
                  ㄴ 배열의 length 값을 변경하게 됨
    ```html
    <script>
    var myArray = ['바나나', '사과', '딸기', '자두'];
    var myVar = myArray.shift();    // 바나나
    console.log(myVar);
    </script>
    ``` 

* Array.unshift() : 배열의 첫번째 순서에 새로운 요소를 추가한 후 새로운 length값을 반환
                    ㄴ array.unshift(item1, item2, ..., itemX)
    ```html
    <script>
    var myArray = ['바나나', '사과', '딸기'];
    var myVar = myArray.unshift('새로운 과일');    // 4
    var myVar2 = myArray.join(', ');    // 새로운 과일, 바나나, 사과, 딸기
    console.log(myVar);
    </script>
    ```

* Array.toString() : 배열을 문자열로 반환
                     ㄴ IE8 미지원
    ```html
    <script>
    var myArray = ['바나나', '사과', '딸기'];
    var myVar = myArray.toString();    
    console.log(myVar);                // 바나나,사과,딸기
    console.log(typeof myVar);         // string
    </script>
    ```

* Array.indexOf() : 탐색하는 요소의 위치를 반환 (탐색요소 없는 경우 -1 반환하며 동일 요소가 여러개일 경우 첫번째로 탐색되는 요소 위치를 반환)
                    ㄴ array.indexOf(item, start)
                    ㄴ item: 필수; 탐색할 요소
                    ㄴ start: 선택적; 탐색 시작할 위치; 미지정 시 0에서 시작 (음수값은 마지막 순서부터의 위치를 나타냄)
                    ㄴ 탐색을 배열의 마지막 요소부터 시작하고 싶다면 lastIndexOf() 함수 사용
    ```html
    <script>
    var myArray = ['바나나', '사과', '딸기', '수박', '사과', '복숭아'];
    var myVar = myArray.indexOf('사과');              // 1   
    var myVar2 = myArray.indexOf('바나나', 2);        // -1   
    var myVar3 = myArray.indexOf('수박', -3);         // 3   
    console.log(myVar);
    </script>
    ```

## String.prototype
* String.replace() : 문자열에서 특정값 또는 정규식(regular expression)을 탐색하여 지정한 새로운 값으로 대체한 새로운 문자열을 반환
                     ㄴ 정규식이 아닌 값을 대체하는 경우 첫번째 탐색 결과만 대체하기에 global modifier (g)를 사용해야 함
                     ㄴ string.replace(searchvalue, newvalue)
                     ㄴ searchvalue, newvalue : 모두 필수값
    ```html
    <script>
    var myStr = 'Mr Blue has a blue house and a blue car';
    var newStr = myStr.replace(/blue/g, 'red');     // global 대체
    var newStr2 = myStr.replace(/blue/gi, 'red');   // global, case-insensitive 대체
    var newStr3 = myStr.replace(/blue|house|car/gi, function(x){
        return x.toUpperCase();
    });                                             // 함수를 사용한 문자열 대체
    console.log(newStr);
    </script>
    ```

* String.slice() : 문자열의 일정 부분을 반환
                   ㄴ string.slice(start, end)
                   ㄴ start : 필수; 지정된 부분의 시작 지점 인덱스 (문자열의 마지막 부터 시작하고 싶은 경우 음수값 사용)
                   ㄴ end : 선택적; 반환할 문자의 마지막 문자 (해당 인덱스에 위치한 문자는 미포함)
    ```html
    <script>
    var myStr = 'Flying Cow';
    var newStr = myStr.slice(0);         // Flying Cow 반환
    var newStr2 = myStr.slice(3);        // ing Cow 반환
    var newStr3 = myStr.slice(3, 8);     // ing C 반환 
    var newStr4 = myStr.slice(0, 1);     // F 반환 
    var newStr5 = myStr.slice(-1);       // w 반환 
    console.log(newStr);
    </script>
    ```

* String.split() : 문자열을 분리하여 배열로 변환
                   ㄴ string.split(separator, limit)
                   ㄴ separator : 선택적; 문자 또는 정규식(regular expression)을 지정하여 문자를 분리; parameter값 지정되지 않는 경우 전체 문자열이 배열의 한 요소로 반환됨
                   ㄴ limit : 선택적; 리턴되는 배열의 숫자를 제한
    ```html
    <script>
    var myStr = 'html css javascript';
    var myStr2 = 'html@css@javascript';
    var newStr = myStr.split();         // "html css javascript"
    var newStr2 = myStr.split('');         // whitespace를 포함한 각 문자를 분리하여 배열로 반환
    var newStr3 = myStr.split(' ');         // whitespace를 분리할 기준의 문자열로 지정하여 배열 반환 (e.g. html, css, javascript)
    var newStr4 = myStr.split(' ', 2);         // whitespace를 분리할 기준의 문자열로 지정하여 배열 반환하며 첫 2개만 반환
    var newStr5 = myStr2.split('@');         // @를 separator롤 지정하여 배열 반환 (e.g. html,css,javascript )
    console.log(newStr);                //
    </script>
    ```

* String.search() : 문자열에서 특정값(문자 또는 정규식)을 탐색하고 일치하는 값의 위치를 반환
                    ㄴ 일치하는 값 없는 경우 -1 반환

    ```html
    <script>
    var myStr = 'Flying Cow Cow';
    var newStr = myStr.search('cow');          // -1 반환
    var newStr2 = myStr.search(/cow/i);        //  7 반환 (case-insensitive)
    console.log(newStr);
    </script>
    ```

* String.match() : 문자열에서 특정 정규식(regular expression)과 일치하는 값을 찾으며 배열 개체로 반환함
                   ㄴ 일치하는 값이 없는 경우 null 반환
    ```html
    <script>
    var myStr = 'The rain in SPAIN stays mainly in the plain';
    var newStr = myStr.match(/ain/gi);          // ain,AIN,ain,ain 반환
    console.log(newStr);
    </script>
    ```

* String.trim() : 문자열의 앞뒤에서 whitespace를 제거
                  ㄴ IE8 미지원
    ```html
    <script>
    var myStr = '        blue rainbow         ';
    var newStr = myStr.trim();
    console.log(newStr);
    </script>
    ```

* String.indexOf() : 문자열에서 지정된 값이 
                     ㄴ 해당 함수는 case sensitive
                     ㄴ 일치하는 값이 없는 경우 -1 반환
                     ㄴ string.indexOf(searchvalue, start)
                     ㄴ searchvalue : 필수; 탐색할 문자
                     ㄴ start : 선택적; 디폴트값 0; 시작하는 위치
    ```html
    <script>
    var myStr = 'Today is a very happy day!';
    var newStr = myStr.indexOf('happy');     // 16 반환
    console.log(newStr);
    </script>
    ```

## Object.prototype
* Object.hasOwnProperty() : 개체가 지정된 이름의 속성을 포함하는지 확인하고 true/false 값을 반환
                            ㄴ object.hasOwnProperty(proName)
                            ㄴ IE8 미지원
    ```html
    <script>
    newObj = new Object();
    newObj.prop = 'exists';
    function changeNewObj() {
        newObj.newprop = newObj.prop;
        delete newObj.prop;
    }
    newObj.hasOwnProperty('prop');     // true 값 반환
    changeNewObj();
    newObj.hasOwnProperty('prop');     // false 값 반환
    </script>
    ```

