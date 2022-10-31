#  Native Providers

Native providers are crucial to OpenCUI chatbots, they provide the implementation to system interface like channel and support, as well as application interface or services like payments. 

The process of building and register native provider is as follows, assuming that one want to use OpenCUI platform to define the conversational user interface frontend. One can potentially use OpenCUI runtime to develop chatbot without using OpenCUI platform, it is certainly possible, but is not covered here. 


[[toc]]

## Define interface
For application level interface, builder need to create a service component on the OpenCUI. System interfaces are already created for you, if you want to connect to other channels, you should use them directly: io.opencui.channel.IChannel. Service can be defined as follows:

1. Enter one of your organizations. In the **Component** field, create a component with service enabled.

::: thumbnail
![create-component](/images/extensions/tutorial/create-component.png)
:::

2. In the **Service** field, click **Add** to define a function in the component.
3. Review changes and merge the branch into the master.


## Export Component
Before you can develop the native provider, you first need to export the code generated for the interface in the Kotlin source code. 
Click **Export** and extract the generated file from the export. You can get the service interface named with the component in the generated file. Move this file to the directory you just created.

::: thumbnail
![export-component](/images/extensions/tutorial/export-component.png)
:::

## Development
The standard way to develop native provider is to do it inside extension repo. 
```
git clone https://github.com/opencui/extensions.git
```
We use gradle as build system, so you can create a subdirectory to host your subproject. Using the existing building system in this repo will make it easy for you to contribute your native provider back OpenCUI community.  

The implementation can then be developed as standard Kotlin project. See code examples from [*helloworld*](https://github.com/opencui/runtime/blob/main/extensions/helloworld/src/main/kotlin/me/test/component_0915/me_test_component_0915.kt#L732) to learn how.

Make sure your project actually builds before you move to the next step.
```
./gradlew your_project:build
```
 
## Register
In order to make the native provider available for the chatbots on the platofrm, we need to register it on OpenCUI platform first, by creating a provider component.

1. Enter one of your organizations. In the **Provider** field, create a native provider.

::: thumbnail
![create-provider](/images/extensions/tutorial/create-provider.png)
:::

2. Import the service component you want to implement into the native provider.
3. In the **Service** field, select the imported component in the **Implemented** section.
4. In the **Configuration** field, fill in the following information. Examples are shown in the screenshot below.
   - **Provider class name**: a fully qualified name of the class that implements the service interface. 
   - **Configuration meta**: a JSON array used to generate a form when integrate the extension into a chatbot. See [configuration meta](#configuration-meta) to learn how to write this.
   - **Implementation**: a label of the project to which the provider class belongs. The format of implementation is `group:project`.
      - Group can be found the in *build.gradle* for the project.
      - Project is the name of the directory you created.
     
::: thumbnail
![configuration](/images/extensions/tutorial/configuration.png)
:::

5. Review changes and merge the branch into the master.

### Configuration Meta

Configuration Meta can help you generate the configuration information needed to configure this provider, which specify what keys builder needs to declare. You can create custom configuration information forms by using a JSON format.

#### JSON Representation

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

#### Fields

| Fields          | Type   | Description |
|:---             |:---    |:---         |
| `key`           | string | *Required*. Key will pass to codegen. |
| `label`         | string | *Required*. Displayed on chatbot Integrations. |
| `type`          | string | *Required when there is no `options[]`*. Should be one of the following: `String`, `Text` or `Boolean`, case sensitive. |
| `placeholder`   | string | *Optional*. |
| `default_value` | string | *Optional*. |
| `options[]`     | array  | *Required when there is no `type`*. |

options
| Fields          | Type   | Description |
|:---             |:---    |:---         |
| `value`         | string | *Required*. |
| `label`         | string | *Required*. Displayed on selection menu. |

#### Examples

This example shows how some provider can be configured using text input, selection and boolean component.

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
![config meta](/images/extensions/nativeprovider/config-meta.png)
:::



## Wire provider to service
After native provider is registered on the platform, any builder can make use of it, by wiring the provider to the service in the chatbot settings. 

1. Import the component you created into a chatbot that needs this extension.
2. In the **Setting** field, go to the **Integrations** section. Select the service and choose its serivce provider. 
3. Fill in the configuration form. As shown in the picture below, there is one field (_Name_) to fill as we have configured in the configuration meta.

::: thumbnail
![integration](/images/extensions/tutorial/integration.png)
:::

