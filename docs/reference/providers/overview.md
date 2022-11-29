# Overview

The goal of OpenCUI is to make it easy to build conversational user interface for functionalities. Many such functionality are not fully known at the time of initial design and implementation of OpenCUI, including application functionalities such as payment processing, and system ones such as channels to connect with users or contact center software to loop in live agents. To accommodate new requirements, OpenCUI follows an open architecture design so that new functionalities can be supported easily. 

Following the best practices, all functionalities on OpenCUI are modeled in two parts: interfaces and implementations, so that the producer and consumer of these functionalities can be developed independently. More importantly, conversational behaviors are only constructed against these interfaces, so it is possible to switch to different implementation.

The implementations of interface, we call providers, are available in two kinds: native providers, and scripted providers. Native providers are implementation developed in Java/Kotlin, system level interfaces are typically implemented in form of native providers. Scripted providers allow builder to implement in other script language, like SQL or Json. Application related interface, we call services, are typically implemented in scripted provider.  


## Native Providers
Native provider are developed in form of extensions. Extensions are software modules that are developed to supply one or more providers to platform. The OpenCUI are implemented in Kotlin, so naturally these extensions are developed as standard Kotlin module, using the standard tool chain like gradle, popular framework spring boot. The extension are developed in four simple steps:
1. Define the interface on the OpenCUI platform (builder can only do this at application level, for services). 
2. Generate the code stub for these interfaces as basis for implementation.
3. Develop the extension. You are encouraged to contribute your extension to opencui/extensions.
4. Register each provider developed in the extension on the platform so that it can be wired to chatbots thus provide its version of implementation to these chatbots.

These native provider can be registered as external, in which case, builder does not need to make its source available to OpenCUI platform. The chatbot that relies on even one external provider can NOT be hosted by OpenCUI, instead builder need export the generated kotlin project, and build and deploy it per their devops rules. Regardless if the providers are external, extension builder need to register their provider on the platform so that we can generate the frontend code for them. 

## Scripted Providers
OpenCUI relies on the service, application related interface, to interact with application backend. Service defines the APIs for how these functionalities can be accessed, and their implementation are typically provided in form of scripted providers. We support two kinds of scripted provider types: hosted provider type and stub provider type.

1. [Postgrest](./postgrest.md) is the only hosted provider type OpenCUI currently supports. By hosted, it means OpenCUI manages the schema of the data source so that we can clone database for new business, as well as hosting the database itself. 

2. On the other hand, OpenCUI does not host data for stub providers, nor we have explicit knowledge about the data schema, so we assume we only handles function invocation through these stub providers. There will be many stub provider types, the first one we implemented are [Google Sheets](./googlesheets.md) based.  


Scripted provider are typically defined in three steps:
1. Define service, application dependent interface, on platform.
2. Pick connection. How scripted provider works are depending on the connection. Connection provider the access to the actual data source, and also decide what script language can be used to define implementation of each function declared in the service interface.
3. Use script language required by connection to implement the service functions. Function can always be implemented in Kotlin, known as native functions.

### How To Use
Follow these steps to learn how to use scripted providers:
- [Create Provider](#create-provider)
- [Import Component](#import-component)
- [Implementation](#implementation)
- [Integrate with Chatbots](#integrate-with-chatbots)
#### Create Provider
1. Enter one of your organizations, in the **Provider** field, click **Create**.

::: thumbnail
![create provider](/images/provider/overview/create-provider.png)
:::

2. Complete the follwing items in the form. Once you've done, click **Save**.
 
   - **Project Label**: an indentifier of this chatbot.
   - **Provider Type**:  a [type of a provider]((../../guide/glossary.md#provider)).
   - **Privacy**: it restricts who has access to this provider. To learn more, see [project access](../../reference/platform#project-access).
   - **Template**: there are some system components in each template.
   - **Deploy Mode**: it tells [how you deploy your provider](../../guide/glossary.md#deploy-mode). 
   - **Region**: It's where your database is hosted. Only required for the Postgrest providers.

::: thumbnail
![provider form](/images/provider/overview/provider-form.png)
:::

#### Import Component
1. Enter the component where the function interfaces are defined. Click **Import**. Select a project which this component is imported to and then click **Save**.

::: thumbnail
![import component](/images/provider/overview/import-component.png)
:::

#### Implementation

1. Go back to the provider you created. In the **Service** field, click **Add Frame to Implemen**t and select a service interface from a component.

::: thumbnail

![click add frame](/images/provider/overview/click-add-frame.png)
*Figure 1: click **Add Frame to Implemen***

<br>

![select interface](/images/provider/overview/select-interface.png)
*Figure 2: select a service interface and get function interfaces*
:::

2. By selecting a service interface, you've got the **imported** function interfaces. Apart from that, you can also add some **local** function interfaces by clicking **Add** in the **Functions** section.

::: thumbnail
![add local function](/images/provider/overview/add-local-function.png)
:::

3. To implement a fucntion, in the **Functions** section, click one function. In the popup window, choose a type of function and implement the function. Types of function are **Provider Dependent** and **Kotlin**.

::: thumbnail
![click a function](/images/provider/overview/click-function.png)
*Figure 1: click a function*

<br>

![implement function](/images/provider/overview/implement-function.png)
*Figure 2: implement a function*
:::

##### Provider Dependent Functions
In provider dependent functions, the language used to implement function is dependent on the type of provider. For [Postgrest providers](./postgrest.md), the language is [PL/pgSQL language](https://www.postgresql.org/docs/current/plpgsql.html). For [Google Sheets providers](./googlesheets.md), the language is [Query Language](https://developers.google.com/chart/interactive/docs/querylanguage). 

::: warning Warning 
The return type of provider dependent functions **can NOT be entity**. If the function only returns one column, you should wrap it using a frame.

For example, if the type of column is _X_, you should create a frame and add a slot in the frame. The type of the slot should be corresponding of _X_ in OpenCUI. To get a corresponding type, see [types conversion](./postgrest.md#types-conversion) in Postgrest providers or [types conversion](./googlesheets.md#types-conversion) in Google Sheets providers.
:::
##### Kotlin Functions
In Kotlin functions, write function bodies in [Kotlin](https://kotlinlang.org/docs/functions.html). Kotlin functions can be used to convert the value returning from a provider-dependent function to a desirable format. 

For example, if a provider-dependent function returns a multi-value frame with only one slot, you could use a Kotlin function to convert the multi-value frame into a multi-value slot.
``` kotlin
/* 
Suppose a provider-dependent is getFoodCategory() which returns a list of frame. 
There is one slot called returnValue in the frame. 
*/
return getFoodCategory()!!.map{it -> it.returnValue!!} 
```

#### Integrate with Chatbots
Once you've [reviewed all the changes](../../reference/platform/versioncontrol.md#review-changes) in the provider and merged them to the master, you can integrate the provider with your chatbot.

1. Enter the component where the function interfaces are defined and the service interfaces are implemented by this provider. [Import the component](#import-component) to your chatbot.
2. Enter your chatbot, on the **STRUCT** side, click **Setting** and switch to the **Integration** tab. Click **Select Service** and select the service from the component.

::: thumbnail
![select service](/images/provider/overview/select-service.png)
:::

3. In the popup window, type a **Label** and select the **Service Provider**.

::: thumbnail
![select provider](/images/provider/overview/select-provider.png)
:::