

/*
    객체 생성 연습하기
    Javascript에서 객체를 생성할 때에는 중괄호 '{}'를 이용하며, 키(Key)와 값(Value)를 이용하여 나타냅니다.
*/


/*
    Q. 변수 이름은 person1인 객체를 생성해 봅시다.
*/

let person1 = {};
console.log(typeof(person1)); // person1의 타입을 확인해 봅시다.


/*
    Q. person1 객체에 ssafy-class 속성을 추가하고, 그 값을 1로 설정해 봅시다.
*/

person1["ssafy-class"] = 1; // 속성의 이름에 '-'가 포함된 경우 왼쪽과 같이 작성되어야 합니다.

console.log(person1);


/*
    Q. 
    변수 이름은 person2 으로,
    name은 "kim",
    age: 31,
    height: 185 인
    객체를 생성해 봅시다.
*/

let person2 = {
    name : "kim",
    age : 31,
    height : 185
};


/*
    Q. person2 객체에 class라는 속성을 추가하고, 그 값을 "java"로 설정해 봅시다.
*/
person2.class = "java";


/*
    Q. person2 객체의 age 속성을 25로 변경해 봅시다.
*/
person2.age = 25;

console.log(person2);



///////////////////////////////////////////////////////////////////



/*
    함수 선언 연습하기
    Javascript에서 함수를 선언할 때에 여러가지 방법이 있습니다.
*/



/*
    Q. 함수 이름이 test이고 num1 파라미터를 받는 함수를 작성해 봅시다.
*/

function test(num1) {
    console.log(num1);
}

test(10);




/*
    Q. const 키워드로 변수 이름이 add이며, num1과 num2 파라미터를 받는 함수를 작성해 봅시다.
    num1과 num2의 합을 출력합니다.
*/

const add = function(num1, num2) {
    console.log(num1 + num2);
}

add(4, 16)





/*
    Q. const 키워드로 변수 이름이 add2이며, num1과 num2 파라미터를 받는 화살표 함수(Arrow function)를 작성해 봅시다.
    num1과 num2의 합을 출력합니다.
*/

const add2 = (num1, num2) => {
    console.log(num1 + num2);
}

add2(10, 20);





/*
    Q. 함수 이름이 add3인 함수를 작성해 봅시다.
    변수의 Hositing 처럼, 함수도 Hoisting이 발생함을 확인합니다.
*/
add3(); // 상위에 add3 함수가 없는 상태입니다.

function add3() {
    console.log("add3가 호출되었습니다.");
}



/*
    Q. 함수 자체를 파라미터로 전달 할 수 있습니다.
    이 문제는 확인만 해봅시다.
*/

const function_call = function( function_name ) {
    function_name(1, 2);
}

function_call(add); // 함수의 이름만 전달합니다.
