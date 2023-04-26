# Typescript

- By default even if there is error in code compiler will convert *.ts into .js file*. To prevent this from happening, we can configure in tsconfig.json **```noEmitOnError:true```**
- **noImplicitAny: false** will disable error for any type. *It should be true*
- **target:** In which format the ts file will be transpiled to js. Example: ```target:"es2015"```
- **Preferable to use unknown** type instead of **any type** as it is more strict.
Also using unknown type we should have to check the type before using it.
- BigInt: 
    - Can be initialize using two ways: ```let a= BigInt("123456")``` or ```let b= 123456789n```
    - int can be used for number max upto **2^53**. For number greater than that we can use BigInt
    - Cannot be defined as **decimal value**
    - Cannot use **Math** object on BigInt

- **never** type means code terminates after that    
- A **tuple** type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.
    ``` type StringNumberPair = [string, number];```
