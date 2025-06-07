    //--- TypeScript Example
    //--- String 변수
    let leem :string = 'leem';

    //--- String 배열 변수
    let names :string[] = ['kim', 'baek'];

    let user :{id : string, name : string, email : string, tel? : string} = {id: 'IU', name : '아이유', email : 'iu@naver.com'}

    const fn = (num1 : number, num2 : number) : number => {
        return num1 * num2;
    }

    console.log('fn(2, 9) : ', fn(2, 9));

    //--- 배열에 쓸 수 있는 tuple type. Member 배열에 첫번째는 number 두번째는 boolean 만 들어오도록 강제
    type Member = [number, boolean];
    let baek :Member = [100, true];

    type User = {
        id :string,
        name :string,
        email :string,
        tel? :string,
    };

    let kim :User = {id : 'kim123', name : 'kimjk', email : 'kimjk@naver.com'};

    //--- User2 의 모든 속성은 string 이어야 한다.
    type User2 = {
        [key :string] :string,
    }

    //--- interface 로 타입 지정
    interface User3 {
        email :string
    }

    //--- User3 타입을 아래의 두가지 방법으로 사용 가능하다.
    //--- 첫번째 방법을 사용하길 권장한다.
    let lee :User3 = {email : 'lee@naver.com'};
    let woo = {email : 'woo@naver.com'} as User3;


    //--- HTMLElement > HTMLInputElement
    //--- input HTMLInputElement 타입을 지정해줘야 한다.
    //--- <input type="text" id="email">
    const el = <HTMLInputElement> document.getElementById("email");
    el?.value

    
    //--- TypeScript 함수 표현식에 타입 지정하기
    function add(x : number, y : number) : number {
        return x + y;
    }
    function subtract(x : number, y : number) : number {
        return x - y;
    }

    type MathType = (x : number, y : number) => number;

    const add2 :MathType = (x, y) => x + y;
    const subtract2 :MathType = (x, y) => x - y;

    //--- Rest Parameter 를 사용한다고 가정한다면...
    type SumAllType = (a : number, ...rest : Array<number>) => number;

    const sumAll : SumAllType = (a, ...rest) => {
        return rest.reduce( (acc, n) => acc + n, a )
    }

    const printUser = (userId : number, name : string, skills : string[]) : string => {
        return `${userId} ${name} ${skills.join(" ")}`;
    }

    //--- interface 를 활용하여 변수의 타입을 지정
    interface UserInfo {
        userId : number;
        name : string;
        skills : [];
    };

    //--- type 을 활용하여 interface 의 정보를 담는다.
    //--- 이렇게 함으로써 type 에 대한 재 정의가 필요없다.
    //--- 필요에 따라 UserInfo interface 에 변수가 변경되거나, printUser2 parameter 가 변경된다.
    type PrintUserFn = (user : UserInfo) => string

    const printUser2 :PrintUserFn = ({userId, name, skills}) => {
        return `${userId} ${name} ${skills.join(" ")}`;
    }


    //--- Object 내에 Method 가 있는 경우
    type MathFn = {
        add : (a : number, b : number) => number
    }
    
    const mathObj : MathFn = {
        add(a, b) {
            return a + b;
        }
    }
    
    //--- add Method 에 직접 접근하는 방법
    type AddFn = (a : number, b : number) => number

    const mathObj2 : {add : AddFn} = {
        add(a, b) {
            return a + b;
        }
    }


    //--- 개발 시 불필요한 코드를 반복하지 않는 방법
    //--- 아래의 두개의 interface 는 StudentWithGrades 에 grades :[] 만 한개 더 추가된 것이고, 나머지는 중복 상태이다.
    interface Student {
        firstName :string;
        lastName :string;
    }
    interface StudentWithGrades {
        firstName :string;
        lastName :string;
        grades  :number[];
    }

    //--- 위의 경우 extends 를 사용하여 처리할 수 있다.
    interface StudentWithGrades2 extends Student {
        grades  :number[];
    }
    const st :StudentWithGrades2 = {
        firstName : "kim",
        lastName : "jiwoo",
        grades : [90, 80, 95]
    }

    //--- type 을 사용해서 처리할 수도 있다.
    type StudentWithGrades3 = Student & { grades : number[] }
    const st2 :StudentWithGrades3 = {
        firstName : "park",
        lastName : "sooin",
        grades : [85, 100, 90]
    }

    //--- type Config 를 활용할 수도 있다.
    //--- Student interface 에서 type 을 참조해오는 방식.
    type StudentWithType = {
        firstName : Student["firstName"];
        lastName : Student["lastName"];
    };

    //--- Map type 을 활용할 수도 있다.
    //--- [P in Properties] : P
    type StudentWithMapped = {
        [key in "firstName" | 'lastName'] :Student[key]
    }