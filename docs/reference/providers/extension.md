# Extension

[[toc]]

## Overview

The OpenCUI is designed to have a open architecture, so that it is easy to make functionality available to chatbot. The core of this open architecture is separation between interface and implementation, so that conversational behavior can be defined on the interface, while implementation can come in various form. 

On OpenCUI, we abstract interface for every builtin functionalities that might have more than one implementations, example being channels and supports, and you are encourage to do the same thing for the application level functionalities such as payment processing. 

There are two kinds of extensions:
1. External extensions are the ones that OpenCUI platform does not have access to source code, and can only be used by you with privately deployed chatbot. 
2. Internal extensions are the ones that OpenCUI platform does have access to source code (inside opencui or framely). Chatbot using framely extensions can not be exported for private deployment. 

## Extend with Native Provider

To develop extensions with Native Provider, you should follow these steps below. To use existing extensions, you can go [Wire and Configure](native.md#wire-and-configure) directly.

### 1. Decribe interface
If the service interface you need has not been created yet, you should create a new one and describe its schema on OpenCUI platform. System service interfaces are already created for you, if you want to connect to other channels, you can use them directly, like `io.opencui.channel.IChannel`.

### 2. Generate Code Stub
If the service interface you need has already been created, you need to export it. When exporting, OpenCUI platform will generate stub code in kotlin and you will get the generated file which will be used in implementation.

### 3. Develop Extension
The standard way to develop extension is to do it inside extension repo. 
```
git clone https://github.com/opencui/extensions.git
```
OpenCUI use gradle as build system, so you can create a subdirectory to host your subproject. Using the existing building system in this repo will make it easy for you to contribute your native provider back OpenCUI community.  

The implementation can then be developed as standard Kotlin project. Make sure your project actually builds before you move to the next step.
```
./gradlew your_project:build
```

### 4. Register native provider

Regardless if the extensions are external, you need to register their native provider on the platform so that OpenCUI can generate the frontend code for them. To register native provider, follow steps in the [Build Native Provider](native.md#build-native-provider) documentation to accomplish the following:
1. Create native provider.
2. Declare service interface.
2. Configuration setup.

When you're done, make sure you merge all of your changes into master.


## Quickstart with Helloworld

Now lest's use **helloworld** extension as an example to show how extension is developed. This simple hello word extension gets name from configuration, and then simly return `hello $name`.

### 1. Decribe Interface

1. **Create service interface**. Go to one of your org, select **Components** in left side menu, click the **Create** button on the right side. In the **Create** popup window: 
    - Enter a label for service component. For example, our hello world example uses `component_0915` as label. 
    - Turn on service toggle, enable service.
    - No need to add language. As a service that provides an interface for extensions does not need to add language.
    - Click the **Save** button.

    ::: thumbnail
    ![create service component](/images/provider/extension/hello_create_service_component.png)
    *Click Create button*
    
    <br>

    ![create service component popup](/images/provider/extension/hello_service_popup.png)
    *Create popup window*
    :::

2. **Declare function**. Head to **Service** page, in the **Functions** section, click the **Add** button to declare function signature. In helloworld example, we declare a simple function labeled as `testFunction`, which takes a string as input parameter named `str`, and return a string.

    ::: thumbnail
    ![add function](/images/provider/extension/hello_add_function.png)
    *Click add function*
    
    <br>

    ![function popup window](/images/provider/extension/hello_test_function.png)
    *Function popup window*
    :::

3. Review your changes and merge them into master.


### 2. Generate Code Stub
In the service you described, click **Export** on the second navigation bar to extract the generated file. 

::: thumbnail
![export service component](/images/provider/extension/hello_export_service.png)
:::

### 3. Develop Extension
1. Clone extensions repo, create a subdirectory to host your subproject. Here we create `helloworld` under extensions.
    ```
    git clone https://github.com/opencui/extensions.git
    ```

2. Implement the service interface, you can develop it as standard Kotlin project. The implementation code example of `helloworld` is like:

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

3. Make sure the project actually builds before you move to the next step. 
    ```
    ./gradlew your_project:build
    ```

For a full overview, see [helloworld](https://github.com/opencui/extensions/tree/main/helloworld) in OpenCUI extensions repo.

### 4. Register Native Provider

1. Create a native provider. Go to one of your org, select **Provider** in left side menu, click the **Create** button on the right side. In the **Create** popup window: 
    - Enter a label for provider. For example, `test` as label. 
    - Select **Native Provider** in **Provider Type** field.
    - Select **OpenCUI-hosted** in **Deploy Mode** field as `helloworld` is one of OpenCUI extensions.
    - Click the **Save** button.

    ::: thumbnail
    ![create native provider](/images/provider/extension/hello_create_native.png)
    *Click Create button*
    
    <br>

    ![create native provider popup](/images/provider/extension/hello_create_native_popup.png)
    *Create popup window*
    :::

2. Declare service interface `component_0915` in native provider: 
    - Go to service `component_0915`, click **Import** on the second navigation bar. In the popup window, select your native provider, in this case we select `test`, and save. 
    - Back to the `test` native provider, heading to **Service** page from the left side menu. In the **Implemented** section, select `component_0915`.

    ::: thumbnail
    ![import component0915 to native provider](/images/provider/extension/hello_import_component0915.png)
    *Import service to native provider*
    
    <br>

    ![select service in native provider](/images/provider/extension/hello_select_service.png)
    *Declare service in native provider*
    :::

3. Configuration setup, heading to **Configuration** page from the left side menu:
    - Enter **Provider Class Name**, a fully qualified name of this implementation class. In this case, enter `me.test.component_0915.HelloWorldProvider`. 
    - Set **Configuration Meta** as following: 
        ```json
        [
          {
            "key": "name",
            "label": "Name",
            "type": "String"
          }
        ]
        ```
    - Enter `io.opencui.extensions:helloworld` in **Implementation** field.

    ::: thumbnail
    ![configuration setup](/images/provider/extension/hello_configuration_setup.png)
    :::

4. Review and merge your changes into master.

### 5. Wire and Configure in Chatbot

1. If you have not already created a chatbot, create one now. Inside your org, head to chatbot list page by clicking **Chatbots** in the left side menu, then click the **Create** button on the right side.
    - Enter your chatbot's label in the Project Label field, for example `helloworld`.
    - Select your preferred Region.
    - Select the languages for your chatbot in the **Add Language** field, we selcet `English(en)` here.

    ::: thumbnail
    ![create chatbot](/images/provider/extension/hello_create_chatbot.png)
    *Create chatbot*
    
    <br>

    ![create chatbot popup window](/images/provider/extension/hello_create_chatbot_popup.png)
    *Create popup window*
    :::

2. Import service `component_0915` into chatbot `helloworld`. Go to service `component_0915`, click **Import** on the second navigation bar. In the popup window, select your chatbot, in this case we select `helloworld`, and save. 

    ::: thumbnail
    ![import component0915 to chatbot](/images/provider/extension/hello_import_component0915.png)
    :::

3. Switch to your `helloworld` chatbot, wiring the implementation and configure the integration. 
    - Heading to **Settings** page, in **Integrations** tab, select the service interface you just imported and the native provider that implements it. 
    - Finish the configuration form and save. 
    ::: thumbnail
    ![chatbot integration](/images/provider/extension/hello_chatbot_integration.png)
    *Wired the implementatio*
    
    <br>

    ![configuration popup window](/images/provider/extension/hello_configuration.png)
    *Configuration popup window*
    :::

4. Don't forget to merge your latest changes to master.
