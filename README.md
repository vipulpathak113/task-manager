# Typescript

- By default even if there is error in code compiler will convert ***.ts into .js file***. To prevent this from happening, we can configure in tsconfig.json **```noEmitOnError:true```**
- **noImplicitAny: false** will disable error for any type. *It should be true*
- **target:** In which format the ts file will be transpiled to js. Example: ```target:"es2015"```
- **Preferable to use unknown** type instead of **any type** as it is more strict.
Also using unknown type we should have to check the type before using it.
- **BigInt:**
    - Can be initialize using two ways: ```let a= BigInt("123456")``` or ```let b= 123456789n```
    - int can be used for number max upto **2^53**. For number greater than that we can use BigInt
    - Cannot be defined as **decimal value**
    - Cannot use **Math** object on BigInt

- **never** type means code terminates after that    
- A **tuple** type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.
    ``` type StringNumberPair = [string, number];```<br>
    - **Issue with tuple:**
    ```js
    let rgb: [number, number, number];

    // ✅ This is correct because it has all the values
    rgb = [225, 224, 10];

    // ❌ ERROR : Source has 4 element(s) but target allows only 3
    // It is not allowed Right.
    rgb = [225, 224, 10, 40];   

    // Now let's do this:
    rgb.push(50)
    console.log(rgb)  // output: [225, 224, 10, 50]
    // This is the flaw.
    ```
    ***You can apply any Array method to Tuple. That's why it destroys the supposed guarantees of tuple types.***

- PropTypes vs Interface:
    - Interface:
        - Not transpiled to js
        - Typescript throw error on compile time

    - PropTypes:
        - Transpiled to js
        - Throw error on runtime   

- Interface vs Types:
    - **Interface**:
        - **Can add new fields** to the existing interface.<br/>
            ```js
            interface User {
                id: string;    
                email: string;
            }

            interface User {
                name: string;
            }

            // Now you can add all the three values to the User interface
            const user: User = {
                id: "2323232",
                email: "foo@email.com",
                name: "Foo";
            }
            ```
        - For extending, Interface uses **extends** keyword
            ```js
            interface Car {
                model: string;
                color: string;
            }

            // 👇 You can extend an interface using 'extends' keywords
            interface Tesla extends Car {
            autoPilotModelName: string;
            };
            ```
        - **Cannot do Union** with Interface 
            ```js
            // ❌ ERROR: '{' expected.
            interface Person = User | Admin; 
            
            // ✅ CORRECT: However you can use union type inside the interface
            interface Person {
                person: User | Admin;
            }
            ```
    - **Types**:
        - **Cannot add new fields** to an existing type.<br/>
            ```javascript
            type User = {
                id: string;
            }

            type User = {
                email: string;
            }

            // ❌ ERROR: Duplicate identifier "User"
            ```
        - For extending, type uses **intersection**
            ```js
           type Car = {
                model: string;
                color: string;
            }
            // 👇 In type you need to use Intersection
            type Tesla = Car & {
            autoPilotModelName: string;
            };

            const newCar: Tesla = {
                model: "S",
                color: "red",
                autoPilotModelName: "xyz"
            }
            ```
        - **Can do Union** with types 
            ```js
            /// ✅ CORRECT: you can create union type like this
            type Person = User | Admin;
            ```        
              


          