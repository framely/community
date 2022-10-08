# External Extension

[[toc]]

## Motivation
xx
## How To Build

### Prepare Runtime Environment

1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the [runtime repository](https://github.com/opencui/runtime).
2. ❓ Create a subdirectory under runtime/extensions.

### Component Side

1. Enter an organization. In the **Component** field, create a component with service enabled.

::: thumbnail
![create-component](/images/platform/extension/create-component.png)
:::

3. In the **Service** field, click **Add** to define a function in the component.
4. [Review changes](./versioncontrol.md#review-changes) and merge the branch into the master.
5. Click **Export** and extract the generated file from the export. ❓  Put the generated file into the subdirectory you just created.

::: thumbnail
![export-component](/images/platform/extension/export-component.png)
:::

### Develop

1. Create a data class and implement the interface. You may refer to the following codes.
```kotlin{1,6,11}
data class HelloWorldProvider(
    val config: Configuration,
    override var session: UserSession? = null): component_0915, IProvider {

    // Implement the interface
    override fun testFunction(str: String): String? {
        return "hello ${config["name"]}, $str"
    }
    
    // Configuration
    companion object: ExtensionBuilder<component_0915> {
        override fun invoke(config: Configuration): component_0915 {
            return HelloWorldProvider(config)
        }
    }
}
```
2. ❓ Follow README.md to build a JAR file

### Provider Side

1. Enter an organization. In the **Provider** field, create a native provider.

::: thumbnail
![create-provider](/images/platform/extension/create-provider.png)
:::

2. [Import](./reusability.md#how-to-use) the component you just created into the native provider.
3. In the **Service** field, select the imported component in the **Implemented** section.
4. In the **Connection** field.
   - Input the provider's qualified name of which format is `orgName.componentName.dataClass`.
   - Upload the JAR file you just built.
   - Fill in [configuration meta](../providers/extension.md#configuration-meta).

::: thumbnail
![connection](/images/platform/extension/connection.png)
:::

## How To Use

### Integrate with Provider

1. [Import](./reusability.md#how-to-use) the component you created into a chatbot that needs the extension.
2. In the **Setting** field, go to the **Integrations** section. Select the component along with its service provider. Fill in the configuration meta (In the picture below, there is only one key called _name_ in configuration meta).

::: thumbnail
![integration](/images/platform/extension/integration.png)
:::

### Test Chatbot

1. [View your Changes](./versioncontrol.md#view-your-changes) and merge the branch into the master.
2. [Deploy](./deployment.md#how-to-use) the chatbot.
3. ❓ Click Try it now to test the chatbot.