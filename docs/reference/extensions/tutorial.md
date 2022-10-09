# Simple Tutorial

In this tutorial, you'll learn how to build an extension and how to use it.

[[toc]]

## Development
To begin with, you need to define functions and implement them.
### Prepare Runtime Environment

1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the [runtime repository](https://github.com/opencui/runtime).
2. ❓ Create a subdirectory under _runtime/extensions_.

### Export Component

1. Enter an organization. In the **Component** field, create a component with service enabled.

::: thumbnail
![create-component](/images/extensions/create-component.png)
:::

3. In the **Service** field, click **Add** to define a function in the component.
4. [Review changes](../platform/versioncontrol.md#review-changes) and merge the branch into the master.
5. Click **Export** and extract the generated file from the export. ❓  Put the generated file into the subdirectory you just created.

::: thumbnail
![export-component](/images/extensions/export-component.png)
:::

### Implement Functions

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
2. ❓ Create a pull request and wait for reviewing.

## Register

Once your branch has been merged into the master, you can configure your provider.

1. Enter an organization. In the **Provider** field, create a native provider.

::: thumbnail
![create-provider](/images/extensions/create-provider.png)
:::

2. [Import](../platform/reusability.md#how-to-use) the component you just created into the native provider.
3. In the **Service** field, select the imported component in the **Implemented** section.
4. In the **Configuration** field.
    - Input the provider's qualified name of which format is `orgName.componentName.dataClass`.
    - Provider the implementation of which format is `project(":extension:xxx")`. ❓ `xxx` is the name of the subdirectory you created in runtime/extensions.
    - Fill in [configuration meta](#configuration-meta).

::: thumbnail
![connection](/images/extensions/connection.png)
:::
   
5. [Review changes](../platform/versioncontrol.md#review-changes) and merge the branch into the master.
#### Configuration Meta

Configuration Meta can help you generate the configuration informations needed to configure this provider, which specify what keys builder needs to declare. You can create custom configuration information forms by using a JSON format.

##### JSON Representation

   ``` json
   [
     {
       "key": "key1",
       "label": "Display Label 1",
       "type": "String | Text | Boolean",
       "placeholder": "placeholder text",
       "default_value": "default value"
     },
     {
       "key": "key2",
       "label": "Display Label 2",
       "placeholder": "placeholder text",
       // when options exist, we provider selection type.
       "options": [
         {
           "value": "value1",
           "label": "Option 1"
         },
         {
           "value": "value2",
           "label": "Option 2"
         }
       ]
     }
   ]
   ```

##### Fields

| Fields          | Type      | Description                                                                                                       |
|:---             |:----------|:------------------------------------------------------------------------------------------------------------------|
| `key`           | string    | *Required*. Key will pass to codegen.                                                                             |
| `label`         | string    | *Required*. Displayed on chatbot Integrations.                                                                    |
| `type`          | string    | *Required when there is no `options[]`*. Should be one of the following: String / Text / Boolean, case sensitive. |
| `placeholder`   | string    | *Optional*.                                                                                                       |
| `default_value` | string    | *Optional*.                                                                                                       |
| `options[]`     | array     | *Required when there is no `type`*.                                                                               |

options
| Fields          | Type   | Description |
|:---             |:---    |:---         |
| `value`         | string | *Required*. |
| `label`         | string | *Required*. Displayed on selection menu. |

##### Examples

This example defines an configuration information form using text input, selection and boolean component.

   ``` json
   [
     {
       "key": "key1",
       "label": "String Input",
       "type": "String",
       "placeholder": "Enter string input",
       "default_value": "Default Value"
     },
     {
       "key": "key2",
       "label": "Text Area",
       "type": "Text",
       "placeholder": "Enter text"
     },
     {
       "key": "key3",
       "label": "Boolean",
       "type": "Boolean",
       "default_value": "true"
     },
     {
       "key": "key4",
       "label": "Options",
       "placeholder": "Please select",
       "default_value": "value1",
       "options": [
         {
           "value": "value1",
           "label": "Option 1"
         },
         {
           "value": "value2",
           "label": "Option 2"
         }
       ]
     }
   ]
   ```

This code will generate the configuration information forms like the screenshot below:

::: thumbnail
![config meta](/images/extensions/config-meta.png)
:::
## Reference
When your provider is ready, integrate your chatbot with this provider. 

1. [Import](../platform/reusability.md#how-to-use) the component you created into a chatbot that needs the extension.
2. In the **Setting** field, go to the **Integrations** section. Select the component along with its service provider. Fill in the configuration meta (In the picture below, there is only one key called _name_ in configuration meta).

:tada: Congratulations! You are free to call the service functions now.

::: thumbnail
![integration](/images/extensions/integration.png)
:::

