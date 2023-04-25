# Kotlin expression
In Kotlin, an [expression](https://kotlinlang.org/spec/expressions.html) consists of variables, operators, methods calls etc. that can be evaluated to a single value. Expression can be arbitrarily nested via method calls, and combined via operators. Since frame on the OpenCUI is directly mapped as Kotlin class, and slot become property of that class, we can use Kotlin expression on platform directly when need some value, for example, various condition needs boolean valued expression, and value rec needs list of object of given types. Using Kotlin expression to express condition for example can give builder the raw expressive power, thus make it possible to encode arbitrary business logic. 

It should be fairly easy to write Kotlin expression to specify some value, even if you do not know Kotlin that much buy understand some modern language, here are the common thing that might help you.

#### if expression 
In Kotlin 'if' is an expression. It is called an expression because it compares the values of a and b and returns the maximum value. Therefore, in Kotlin there is no ternary operator (condition)?a:b because it is replaced by the if expression. 
``` kotlin
if (condition) a else b
```
Here we usually expect that a and b are of the same type.

#### when expression
If it is used as an expression, the value of the branch with which condition satisfied will be the value of overall expression. As an expression when returns a value with which the argument matches and we can store it in a variable or print directly. 

``` kotlin
when(dayOfWeek)
{
    1,2,3,4,5->"Weekday"
    6,7->"Weekend"
    else -> "Something terribly wrong"
}
```

#### !! operator
The not-null assertion operator (!!) converts any value to a non-null type and throws an exception if the value is null. You can write b!!, and this will return a non-null value of b (for example, a String in our example) or throw an NPE if b is null. This is useful to make things fail early, and thus make debug easier. 

#### Elvis operator
When you have a nullable reference, b, you can say "if b is not null, use it, otherwise use some non-null value":
``` kotlin
if (b != null)  b else c
```
can be simplified to:
``` kotlin
b ? c
```

#### This expression
you use this expressions:
1. In a member of a class, this refers to the current object of that class.
2. In an extension function or a function literal with receiver this denotes the receiver parameter that is passed on the left-hand side of a dot.


#### Equality operator
In Kotlin there are two types of equality:
1. Structural equality (== - a check for equals())
2. Referential equality (=== - two references point to the same object)
We can use != or !== for negation. 

Reference:
1. [Kotlin null safety](https://kotlinlang.org/docs/null-safety.html)
2. [Operator overloading](https://kotlinlang.org/docs/operator-overloading.html)
3. [Equality](https://kotlinlang.org/docs/equality.html)