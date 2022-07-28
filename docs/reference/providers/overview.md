# Overview

[[toc]]

Framely relies on the service, a set of functions APIs, to interact with application backend, sometime also known as application logic or service. Service only defines the interface for how these functionalities can be accessed, and can have one or more implementation in form of providers. 

Providers can be implemented in different types, which decides how one connect to the actual data source and application logic in terms of protocol. Of course, the implemented provider can be instantiated with different connection settings, and thus working with different data sources with the same schema. 

We support two kinds of provider types: hosted provider type and stub provider type. [Postgrest](./postgrest.md) is the only hosted provider type Framely current supports. By hosted, it means Framely manages the schema of the data source so that we can clone database for new business, as well as hosting the database itself. On the other hand, Framely does not host data for stub providers, nor we have explicit knowledge about the data schema, so we assume we only handles function invocation through these stub providers. There will be many stub provider types, the first one we implemented are [Google Sheets](./googlesheets.md) based.  


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