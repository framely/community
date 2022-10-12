# Simple Tutorial

In this tutorial, you'll learn how to build an extension and how to use it. Examples used in this tutorial:
- A component with service: [component_0915](https://build.framely.ai/org/625e2f3cd31e3de801ef5a93/agent/6322b5cb5bc5f3543eeabd33/service_schema). 
- A native provider: [nativeProvider_1012](https://build.framely.ai/org/625e2f3cd31e3de801ef5a93/agent/63461f5b4ea6284787bcbc46/service_scheman).
- A project that implements the service: [helloworld](https://github.com/opencui/runtime/tree/main/extensions/helloworld).

The process is as follows:
[[toc]]

## Development
To begin with, you need to create a service interface(compomnent with service) and implement it.
### Prepare Runtime Environment

1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the [runtime repository](https://github.com/opencui/runtime).
2. ❓ Create a subdirectory under _runtime/extensions_. 

### Export Component

1. Enter an organization. In the **Component** field, create a component with service enabled.

::: thumbnail
![create-component](/images/extensions/tutorial/create-component.png)
:::

2. In the **Service** field, click **Add** to define a function in the component. 
3. [Review changes](../platform/versioncontrol.md#review-changes) and merge the branch into the master.
4. Click **Export** and extract the generated file from the export. ❓  Put the generated file into the subdirectory you just created.

::: thumbnail
![export-component](/images/extensions/tutorial/export-component.png)
:::

### Implement Service Interface

1. ❓ In a Kotlin file named with the component you exported, create a data class implementing the service interface. Here are code examples from [*me_test_component_0915.kt*](https://github.com/opencui/runtime/blob/main/extensions/helloworld/src/main/kotlin/me/test/component_0915/me_test_component_0915.kt):
```kotlin{1,6-8,11-15}
data class HelloWorldProvider(
    val config: Configuration,
    override var session: UserSession? = null): component_0915, IProvider {

    override fun testFunction(str: String): String? {
        return "hello ${config["name"]}, $str"
    }
    
    companion object: ExtensionBuilder<component_0915> {
        override fun invoke(config: Configuration): component_0915 {
            return HelloWorldProvider(config)
        }
    }
}
```
2. ❓ Create a pull request and wait for review.

## Register

Once your branch has been merged into the master, you can configure your provider.

1. Enter an organization. In the **Provider** field, create a native provider.

::: thumbnail
![create-provider](/images/extensions/tutorial/create-provider.png)
:::

2. [Import](../platform/reusability.md#how-to-use) the component you just created into the native provider.
3. In the **Service** field, select the imported component in the **Implemented** section.
4. In the **Configuration** field, fill in the following information:
   - **Provider class name**: a name of the implementation class that implements the service interface. Its format is `organization.component.dataClass`. 
   - **Configuration meta**: a JSON array used to generate a form when integrate the extension into a chatbot. See [configuration meta](./extension.md#configuration-meta) to learn how to write this.
   - **Implementation**: a label of the project you developed. Its format is `group:project`.
      - Group can be found the in *build.gradle* for the project.
      - Project is the name of the directory you created.
     
::: thumbnail
![configuration](/images/extensions/tutorial/configuration.png)
:::

5. [Review changes](../platform/versioncontrol.md#review-changes) and merge the branch into the master.


## Reference
When your provider is ready, integrate your chatbot with this provider. 

1. [Import](../platform/reusability.md#how-to-use) the component you created into a chatbot that needs the extension.
2. In the **Setting** field, go to the **Integrations** section. Select the component along with its service provider. Fill in the configuration form(In the picture below, provide a value for _name_).

:tada: Congratulations! You are free to call the service functions now.

::: thumbnail
![integration](/images/extensions/tutorial/integration.png)
:::

