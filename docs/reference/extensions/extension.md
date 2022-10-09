# Extension

## Configuration Meta

Configuration Meta can help you generate the configuration informations needed to configure this provider, which specify what keys builder needs to declare. You can create custom configuration information forms by using a JSON format.

### JSON Representation

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

### Fields

| Fields          | Type   | Description |
|:---             |:---    |:---         |
| `key`           | string | *Required*. Key will pass to codegen. |
| `label`         | string | *Required*. Displayed on chatbot Integrations. |
| `type`          | string | *Required when there is no `options[]`*. Should be one of the following: String / Text / Boolean, case sensitive. |
| `placeholder`   | string | *Optional*. |
| `default_value` | string | *Optional*. |
| `options[]`     | array  | *Required when there is no `type`*. |

options
| Fields          | Type   | Description |
|:---             |:---    |:---         |
| `value`         | string | *Required*. |
| `label`         | string | *Required*. Displayed on selection menu. |

### Examples

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
![config meta](/images/extensions/nativeprovider/config-meta.png)
:::

