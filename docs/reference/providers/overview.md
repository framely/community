# Overview

OpenCUI relies on the service, a set of functions APIs, to interact with application backend, sometime also known as application logic or service. Service only defines the interface for how these functionalities can be accessed, and can have one or more implementation in form of providers. 

Providers can be implemented in different types, which decides how one connect to the actual data source and application logic in terms of protocol. Of course, the implemented provider can be instantiated with different connection settings, and thus working with different data sources with the same schema. 

We support two kinds of provider types: hosted provider type and stub provider type. [Postgrest](./postgrest.md) is the only hosted provider type OpenCUI current supports. By hosted, it means OpenCUI manages the schema of the data source so that we can clone database for new business, as well as hosting the database itself. On the other hand, OpenCUI does not host data for stub providers, nor we have explicit knowledge about the data schema, so we assume we only handles function invocation through these stub providers. There will be many stub provider types, the first one we implemented are [Google Sheets](./googlesheets.md) based.  


::: thumbnail
![provider-workflow](/images/provider/overview/provider-workflow.png)
How Provider Works
:::

Follow these three steps to learn how to use a provider:
[[toc]]

## Get Access to Business Data

Go to a provider, there is a **Connection** on the left sidebar. Connection is used by a provider to get access to your business data.
- For [Postgres Providers](./postgrest.md), we support regions of Mainland China and North America to store your data in PostgreSQL. Once you deploy a chatbot with a specific region, the connection to that region will be available.
- For RESTful Providers and [Google Sheet Providers](./googlesheets.md), you need to provide information to connect to the restful APIs or your Google Sheet.


## Import Service
The service functions called in a chatbot are defined in components. Before implementing these functions, you need to import service first. You can import service in two steps:
1. Go to a component with a service, click **Import Project** in the right sidebar and choose a provider which will implement service functions.

![import-component](/images/provider/overview/import-component.png)


2. Go to the provider which you just imported a component to. In the **Service** field, click **Add Frame to implement** and choose the component you just import.

![add-frame](/images/provider/overview/add-frame.png)

## Implement Functions
- There are two kinds of ways to implement a function
    - **Provider Dependent** means the language of function implementation is dependent on the type of the provider. For example, in Postgrest Provider, the language is PL/pgSQL.
    - **Kotlin** means the function is implemented in kotlin. You can call both Kotlin functions and provider dependent functions in a Kotlin function. 