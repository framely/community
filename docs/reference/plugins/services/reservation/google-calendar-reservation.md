# Provider: Google Calendar
With Google Calendar, you and your team can easily create and schedule events and resources, share group calendars, track schedules, and more. Based on the convenience of google calendar in reservation scenarios, OpenCUI provides Google Calendar Reservation extension, which allows you to use reservation-related functionality directly in chatbot without additional development. 

Google Calendar Reservation works across Google Workspace. Before you begin, make sure you are done with signing up for [Google Workspace](https://support.google.com/a/answer/53926).

[[toc]]

## Set up Google Workspace
Each Google Workspace app or integration has its own Google Cloud project where you configure APIs, set up authentication, and manage deployments. To get started, you need a Google Cloud Project.

### Create a Google Cloud Project
1. Click here to [Create a Project](https://console.cloud.google.com/projectcreate). Or in the Google Cloud console, go to **Menu** > **IAM & Admin** > **Create a Project**.
2. In the **Project Name** field, enter a descriptive name for your project.
    > Optional: To edit the **Project ID**, click **Edit**. The project ID can't be changed after the project is created, so choose an ID that meets your needs for the lifetime of the project.
3. In the **Location** field, click **Browse** to display potential locations for your project. Then, click **Select**.
4. Click **Create**. The console navigates to the Dashboard page and your project is created within a few minutes.

For further information on Google Cloud projects, refer to [Creating and managing projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects).

::: thumbnail
![create cloud project](/images/plugins/reservation/googlecalendar/create_cloud_project.png)
:::

### Enable Google Workspace APIs
To make Google Calendar Reservation extension work, you need to enable APIs below in your Google Cloud project:
1. In the Google Cloud console, go to **Menu** > **More products** > **Google Workspace** > **Product Library**.

    ::: thumbnail
    ![product library](/images/plugins/reservation/googlecalendar/product_library.png)
    :::

2. Enable **Admin SDK API** and **Google Calendar API** :
    1. Click the API that you want to turn on.
    2. On the detail page of this API, click **Enable**.
    3. Repeat these steps to enable another.

    ::: thumbnail
    ![enable APIs](/images/plugins/reservation/googlecalendar/enable_apis.png)
    :::

## Set up service account
> The Google OAuth 2.0 system supports server-to-server interactions such as those between a web application and a Google service. For this scenario you need a service account, which is an account that belongs to your application instead of to an individual end user. For more information, see [Using OAuth 2.0 for Server to Server Applications](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority).

To support server-to-server interactions, first create a service account for your project in the API Console, then delegate domain-wide access to the service account.

### Create a service account
If your application runs on Google App Engine, a service account is set up automatically when you create your project.

If your application runs on Google Compute Engine, a service account is also set up automatically when you create your project, but you must specify the scopes that your application needs access to when you create a Google Compute Engine instance. For more information, see [Preparing an instance to use service accounts](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances#using).

If your application doesn't run on Google App Engine or Google Compute Engine, you must obtain these credentials in the Google API Console. To generate service-account credentials, or to view the public credentials that you've already generated, do the following:

#### 1. Create a service account
1. Open the [Service accounts page](https://console.developers.google.com/iam-admin/serviceaccounts).
2. If prompted, select a project, or create a new one.
3. Click add **Create service account**.
4. Under **Service account details**, type a name, ID, and description for the service account, then click **Create and continue**.
5. Optional: Under **Grant this service account access to project**, select the IAM roles to grant to the service account. Click **Continue**.
6. Optional: Under **Grant users access to this service account**, add the users or groups that are allowed to use and manage the service account.
7. Click **Done**.

::: thumbnail
![create service account](/images/plugins/reservation/googlecalendar/create_service_account.png)
:::

#### 2. Create a service account key
1. Click the email address for the service account you created.
2. Click the **Keys** tab.
3. In the **Add key** drop-down list, select **Create new key**.
4. Select **JSON** key type and click **Create**. Your new public/private key pair is generated and downloaded to your machine; it serves as the only copy of the private key. You are responsible for storing it securely. If you lose this key pair, you will need to generate a new one.

::: thumbnail
![create service account key](/images/plugins/reservation/googlecalendar/create_service_account_key.png)
:::

You can return to the [API Console](https://console.developers.google.com/) at any time to view the email address, public key fingerprints, and other information, or to generate additional public/private key pairs. 

### Delegate domain-wide authority to service account
To delegate domain-wide authority to a service account, a super administrator of the Google Workspace domain must complete the following steps:
1. From your Google Workspace domain's [Admin console](https://admin.google.com/), go to **Menu** > **Security** > **Access and data control** > **API Controls**.
2. In the **Domain wide delegation** pane, select **Manage Domain Wide Delegation**.

    ::: thumbnail
    ![domain wide delegation](/images/plugins/reservation/googlecalendar/domain_wide_delegation.png)
    :::

3. Click **Add new**.

    ::: thumbnail
    ![add new](/images/plugins/reservation/googlecalendar/add_new.png)
    :::

4. In the **Add a new client ID** popup window:
   1. In the **Client ID** field, enter the service account's **Client ID**. You can find your service account's client ID (*OAuth 2 Client ID*) in the [Service accounts page](https://console.developers.google.com/iam-admin/serviceaccounts).
   2. In the **OAuth scopes (comma-delimited)** field, enter the list of scopes: 
      ```
      https://www.googleapis.com/auth/calendar
      https://www.googleapis.com/auth/admin.directory.resource.calendar
      ```
   3. Click **Authorize**.

    ::: thumbnail
    ![Authorize](/images/plugins/reservation/googlecalendar/authorize.png)
    :::

The app should be available for use within an hour, but might take up to 24 hours.


## Set up Google Calendar reservation provider
To use Google Calendar Reservation Provider, you can follow steps in [Wire and Configure](/reference/providers/native.md#wire-and-configure) to accomplish the following:
1. Declare service interface [services.opencui.reservation](https://build.opencui.io/org/services.opencui/agent/reservation/struct/service_schema) into your chatbot.
2. Wire Google Calendar Reservation Provider (*services.opencui.googlCalendarReservation*) to this service interface.
3. Configuration the integration.

::: thumbnail
![configuration information](/images/plugins/reservation/googlecalendar/configuration_information.png)
:::

To set up the configuration information:
- **Label**: the integration label.
- **Service Provider**: must be *services.opencui.googleCalendarReservation*.
- **Service Account Key**: the JSON key you generated and downloaded to your machine in step [Create a service account key](#2-create-a-service-account-key). 
- **Customer ID**: Admin account setting's Customer ID.
   1. From your Google Workspace domain's [Admin console](https://admin.google.com/), go to **Menu** > **Account** > **Account settings**. 
   2. In the **Profile** pane, copy **Customer ID**.
    ::: thumbnail
    ![Customer ID](/images/plugins/reservation/googlecalendar/customer_id.png)
    :::
- **Delegated User**: specify an email address of the user account in your Google Workspace domain that the service account will impersonate. For example: *user@example.com*.


## Resources management

### Resources in Google Calendar
Set up Calendar so your customers can book your domin shared resources, such as conference rooms, tables in restaurant, doctors in hospital, hairdressers, or whatever your company provides for customers. Start by listing all the buildings in your company. Google Calendar uses buildings as the foundation for all your resources. For more information about calendar resources, see [Create buildings, features & Calendar resources](https://support.google.com/a/answer/1033925).

Now sign in to your [Google Admin console](https://admin.google.com/), do the following:

#### 1. Add buildings
1. In the Admin console, go to **Menu** > **Directory** > **Buildings and resources**, click **Manage resources**. 
2. In the Manage resources section, click **Add building**.  
    ::: thumbnail
    ![add building](/images/plugins/reservation/googlecalendar/add_building.png)
    :::
3. In the Buildings section, click **Add building**. Enter the building information in the popup window and click **Add building**.
    ::: thumbnail
    ![add building popup](/images/plugins/reservation/googlecalendar/add_building_popup.png)
    :::

#### 2. Add resources
1. In the Admin console, go to **Menu** > **Directory** > **Buildings and resources**, click **Manage resources**. 
2. In the Manage resources section, click **Add new resource**.  
    ::: thumbnail
    ![add resource](/images/plugins/reservation/googlecalendar/add_resource.png)
    :::
3. Enter the resource information in the popup window. And click **Add Resources**.
    ::: thumbnail
    ![add resource popup](/images/plugins/reservation/googlecalendar/add_resource_popup.png)
    :::

### Resources in OpenCUI
As reservation service interface declares abstract **Resource**, you need to specify your concrete resources in your Module or Chatbot by declaring subclasses of Resource abstract frame. If you want to add any features to your resource, such as table size, nickname, service items, etc., which can be used to interact with customers and filter on the business side, you need to add them as slots for your concrete resources.

Now sign in to [OpenCUI project](https://build.opencui.io/), do the following:

#### 1. Declare subclass of Resource
1. **Create** a concrete frame. Go to **Frames** page, click **Create**, type the frame Label and press the ENTER/RETURN key.
2. **Implement** Resource. In the **Implemented** section, **select** *services.opencui.reservation.Resource*. 
::: thumbnail
![resource subclass](/images/plugins/reservation/googlecalendar/resource_subclass.png)
:::

#### 2. Declare features of Resource
To add features as slots for your concrete resource:
1. **Create** entity types for your features. 
   1. Go to **Entities** page, click **Create**, type the entity Label and press the ENTER/RETURN key. (e.g. HairdresserName).
   2. **Add** entity instances you need. (*e.g. tony, zhangsan*) Don't forget to configure the expression at the language level.
    ::: thumbnail
    ![add entity](/images/plugins/reservation/googlecalendar/add_entity.png)
    :::
2. Add entity types as slots. 
   1. Back to your concrete frame page.
   2. In the **Slots** section, click **Add Slots** selector and select the entity type you want to add.  
    ::: thumbnail
    ![add slot](/images/plugins/reservation/googlecalendar/add_slot.png)
    :::

### Specify required properties
When you are done with setting up resources in both Calendar and OpenCUI, you need to specify the required properties of them in [Google Admin console](https://admin.google.com/).

#### 1. Associate timezone with buildings
Each building configured in calendar needs to set a `timezone` in building's **Description**. 

**JSON Representation**
```json
{
  "timezone": "America/New_York"
}
```

| Property   | Type   | Description | Example |
|:---        |:---    |:---         | :---    |
| `timezone` | String | Required. The time zone of this building, also represents the timezone of each resource. (Formatted as an [IANA Time Zone Database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) | *America/New_York* |

::: thumbnail
![building description](/images/plugins/reservation/googlecalendar/building_description.png)
:::

#### 2. Associate features with resources
Each resource configured in calendar needs to be associated with a JSON format in resource **Description(internal)**, which will deserialize to OpenCUI concrete frame object (the subclass of resource frame type). At the same time, you can set the corresponding features for each resource through key-value pairs, which can be used for filtering. 
- If resource is Identifiable: for example, users know which resource they are getting, like hairdresser. You should set `slotLabel` and `slotTypeInstancesLabel` as key-value pairs, like `"hairdresserName": "tony"`.
- If resource is Anonymous: for example, users do not know the identity of the resource, like tables, as long as the table meets their requirement, they do not care which table it is. You can set the corresponding key-value pairs you need to retrieve the resource.

**JSON Representation**
```json
{
  "@class": "FrameLabel", // fully-qualified name
  "durations": [
    3600,
    7200
  ],
  "key": "value"
}
```

| Property      | Type   | Description | 
|:---           |:---    |:---         | 
| `@class`      | String | Required. The concrete frame label you defined in your Module or Chatbot, which implements *services.opencui.reservation.Resource*. Label should be the fully-qualified name. | 
| `durations[]` | Int[]  | Required. How long should each appointment last. The time interval, in seconds. | 

For example: 
```json
{"@class": "me.quickstart.reservationTest.Hairdresser", "defaultDuration": [3600,7200], "hairdresserName": "tony"}
```

::: thumbnail
![resource description](/images/plugins/reservation/googlecalendar/resource_description.png)
:::


## Testing
When you're done with the setup above, before defining the full interactions, you can run a simple test to make sure you have setup successfully. To run a simple test, you can create a PingPong skill and call these functions in response or input these request parameters dynamically through slots. 

::: tip Need To Know
The testing acts on real data, so use caution when trying methods that create, modify, or delete data.
:::

Now let's use `getResourceInfo` as an example.

1. In your chatbot, create a testing skill, for example, *Ping*.
2. Use services. Go to **Schema** tab, in the **Services** section, select *services.opencui.reservation*, click **Save**.
    ::: thumbnail
    ![testing add service](/images/plugins/reservation/googlecalendar/testing_add_service.png)
    :::
3. Add actions. Go to **Response** tab, in the **Default Action** section, add the actions you need. In this case, we add **Single Value Message**.
    ::: thumbnail
    ![testing add reply](/images/plugins/reservation/googlecalendar/testing_add_reply.png)
    :::
4. Click **Commit**, and switch to language level.
5. Add language template and exemplar:
    1. Go to **Expression** tab, add **Names** and **Expressions**.
    ::: thumbnail
    ![testing add expression](/images/plugins/reservation/googlecalendar/testing_add_expression.png)
    :::
    2. Go to **Response** tab, add the reply and call the `getResourceInfo` function.
    ```kotlin
    // change "xxxxxxxx" to your resource id
    This is Resource id xxxxxxxx's info: 
    ${ (reservation.getResourceInfo("xxxxxxxx") as Hairdresser)!!.hairdresserName!!.expression() }
    ```
    ::: thumbnail
    ![testing call function](/images/plugins/reservation/googlecalendar/testing_call_function.png)
    :::
7. Click **Commit**, and test it in **Debug**. If you get the correct response, congratulations, you have successfully completed the configuration.
    ::: thumbnail
    ![testing debug](/images/plugins/reservation/googlecalendar/testing_debug.png)
    :::
