# Overview

[[toc]]



::: thumbnail
![provider-workflow](/images/provider/overview/provider-workflow.png)
How Provider Works
:::

## Get Access to Business Data
1. Connection

## Import Service
1. Import
2. Implement

## Implement Functions
- There are two kinds of functions in a provider and both of them need to be implemented.
    - **Imported functions** are imported from a component so you can't change their declarations.
    - **Local functions** are added within the current provider and you can change the declarations.
- There are two kinds of ways to implement a function
    - **Provider Dependent** means the language of function implementation is dependent on the type of the provider. For example, in Postgrest Provider, the language is PL/pgSQL.
    - **Kotlin** means the function is implemented in kotlin. You can call both Kotlin functions and provider dependent functions in a Kotlin function.