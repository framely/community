# Simple Tutorial

This tutorial helps you build and use an external extension. Examples used in this tutorial:
- Service interface: [component_0915](https://build.framely.ai/org/625e2f3cd31e3de801ef5a93/agent/6322b5cb5bc5f3543eeabd33/service_schema). 
- Native provider: [nativeProvider_1012](https://build.framely.ai/org/625e2f3cd31e3de801ef5a93/agent/63461f5b4ea6284787bcbc46/service_scheman).
- Extension demo: [helloworld](https://github.com/opencui/runtime/tree/main/extensions/helloworld).

The process of building and using external extensions is as follows.
[[toc]]

## Development
To begin with, you need to create a service interface(component with service) and implement it.
### Prepare Runtime Environment

1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the [runtime repository](https://github.com/opencui/runtime).
2. Create a subdirectory under _runtime/extensions_. 

### Export Component

1. Enter one of your organizations. In the **Component** field, create a component with service enabled.

::: thumbnail
![create-component](/images/extensions/tutorial/create-component.png)
:::

2. In the **Service** field, click **Add** to define a function in the component. 
3. [Review changes](../platform/versioncontrol.md#review-changes) and merge the branch into the master.
4. Click **Export** and extract the generated file from the export. You can get the service interface named with the component in the generated file. Move this file to the directory you just created.

::: thumbnail
![export-component](/images/extensions/tutorial/export-component.png)
:::

### Implement Service Interface

1. Create a data class and implement the service interface. See code examples from [*helloworld*](https://github.com/opencui/runtime/blob/main/extensions/helloworld/src/main/kotlin/me/test/component_0915/me_test_component_0915.kt#L732) to learn how to implement.

2. Follow _README.md_ in the export file to build a JAR file.
 
## Declaration

Now in a native provider, you need to declare the data class that implements the service interface and the project it belongs to.

1. Enter one of your organizations. In the **Provider** field, create a native provider.

::: thumbnail
![create-provider](/images/extensions/tutorial/create-provider.png)
:::

2. [Import](../platform/reusability.md#how-to-use) the component you just created into the native provider.
3. In the **Service** field, select the imported component in the **Implemented** section.
4. In the **Configuration** field, fill in the following information. Examples are shown in the screenshot below.
   - **Provider class name**: a fully qualified name of the class that implements the service interface. 
   - **Configuration meta**: a JSON array used to generate a form when integrate the extension into a chatbot. See [configuration meta](./extension.md#configuration-meta) to learn how to write this.
   - **Implementation**: a label of the project to which the provider class belongs. The format of implementation is `group:project`.
      - Group can be found the in *build.gradle* for the project.
      - Project is the name of the directory you created.
     
::: thumbnail
![configuration](/images/extensions/tutorial/configuration.png)
:::

5. [Review changes](../platform/versioncontrol.md#review-changes) and merge the branch into the master.


## Reference
Next, integrate your chatbot with the native provider you created. 

1. [Import](../platform/reusability.md##import-1) the component you created into a chatbot that needs this extension.
2. In the **Setting** field, go to the **Integrations** section. Select the service and choose its serivce provider. 
3. Fill in the configuration form. As shown in the picture below, there is one field (_Name_) to fill as we have configured in the configuration meta.

:tada: Congratulations! Now you are free to call the service functions in the chatbot.

::: thumbnail
![integration](/images/extensions/tutorial/integration.png)
:::

