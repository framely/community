# Extension

With the help of native providers, you can easily use services provided by OpenCUI or other orgs, and you can even efficiently develop new services for yourself or other builders. The process of building and register native provider is as follows, assuming that you want to use OpenCUI platform to define the conversational user interface frontend. You can potentially use OpenCUI runtime to develop chatbot without using OpenCUI platform, it is certainly possible, but is not covered here. 

To develop extension service with Native Provider, you can follow these simple steps:
1. [Decribe interface]()
2. [Generate code stub]()
2. [Develop extension]()
3. [Register native provider]() 

To use existing services you can go directly to [Wire and Configure]().

## Decribe Interface

To decribe interface, you need to create a service component on the OpenCUI. Service can be defined as follows:

1. Enter one of your organizations. In the **Component** field, create a component with service enabled.

::: thumbnail
![create-component](/images/extensions/tutorial/create-component.png)
:::

2. In the **Service** field, click **Add** to define a function in the component.
3. Review changes and merge the branch into the master.


## Generate Code Stub
Before you can develop the native provider, you first need to export the code generated for the interface in the Kotlin source code. 
Click **Export** and extract the generated file from the export. You can get the service interface named with the component in the generated file. Move this file to the directory you just created.

::: thumbnail
![export-component](/images/extensions/tutorial/export-component.png)
:::

## Develop extension
The standard way to develop native provider is to do it inside extension repo. 
```
git clone https://github.com/opencui/extensions.git
```
We use gradle as build system, so you can create a subdirectory to host your subproject. Using the existing building system in this repo will make it easy for you to contribute your native provider back OpenCUI community.  

The implementation can then be developed as standard Kotlin project. See code examples from [helloworld](https://github.com/opencui/extensions/tree/main/helloworld) to learn how.
the code example

```kotlin
data class HelloWorldProvider(
  val config: Configuration,
  override var session: UserSession? = null): IComponent_0915, IProvider {

  override fun testFunction(str: String): String? {
    return "hello ${config["name"]}, $str"
  }

  companion object: ExtensionBuilder<IComponent_0915> {
    override fun invoke(config: Configuration): IComponent_0915 {
      return HelloWorldProvider(config)
    }
  }
}
```

Make sure your project actually builds before you move to the next step.
```
./gradlew your_project:build
```

## Register Native Provider
In order to make the native provider available for the chatbots on the platofrm, we need to register it on OpenCUI platform first, by creating a provider component.