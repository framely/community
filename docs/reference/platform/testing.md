# Testing

[[toc]]

## Motivation

To test your chatbot, you can use built-in test feature **Debug** to uncover bugs and prevent regressions. When entering user input, there are two methods:

- Directly enter it as either text or JSON data. This method is useful for testing individual steps or simple logic flows.
- Create and execute a test case to automate inputs. This method is ideal for testing more complex or multi-step processes, allowing you to easily repeat tests and analyze results.

::: thumbnail
![testing demo](/images/platform/testing/testing_demo.png)
:::

## Structure input

When interacting with **Debug**, you can provide user input as text like *"Get me two tickets for Star Wars"*, or a json format represents the same semantics which is used to describe filling for some data structure or provide values for its slots. 

OpenCUI dialog engine can be interacted directly in Frame Event in its json format, which allows for easier bug fixes on the interaction logic by separating the dialog understanding issues. 

For example, the user utterance `Get me two tickets for Star Wars` can be encoded as the following JSON structure:

``` json
[
  {
    "type": "SellTicket",
    "packageName": "me.test.movieTheater",
    "slots": [
      {
        "value": "\"starwars\"",
        "attribute": "movie",
        "type": "me.test.movieTheater.Movie"
      },
      {
        "value": "2",
        "attribute": "number",
        "type": "kotlin.Int"
      },
    ]
  }
]
```

In **Debug**, you can input JSON structures in the **Structure input** field both before and after connecting.

::: thumbnail
![before connect](/images/platform/testing/before_connect.png)
*Before connecting*

<br>

![after connect](/images/platform/testing/after_connect.png)
*After connecting*
:::

For instance, if you input a JSON structure after connecting, the conversation will be displayed in a view similar to this screenshot:

::: thumbnail
![structure input](/images/platform/testing/structure_input.png)
:::

## Test cases

The goal of [golden test cases](https://en.wikipedia.org/wiki/Characterization_test) is to help you verify that the modifications made to your chatbot did not modify its behavior in unwanted or undesirable ways. In other words, test case execution verifies that chatbot responses have not changed for the same inputs. 

To create a test case, you should simulate the path of the conversation you want to save in **Debug** and provide a test case display name. To access saved test cases in the **Debug** area, click **Test cases** located in the upper-right corner of the panel. These elements allow you to access and view saved tests before and after establishing a connection.
::: thumbnail
![structure input](/images/platform/testing/test_cases_entrance_1.png)
*Before connecting*

<br>

![structure input](/images/platform/testing/test_cases_entrance_2.png)
*After connecting*
:::

The test cases list will appear and can be viewed for either situation. 
::: thumbnail
![test cases](/images/platform/testing/test_cases.png)
:::

To run the test case, you can select the one you want to run. The test engine will check the following types of data turn by turn to evaluate the test result:
- Test will **Pass** when the actual output is the expected output. 
- Test will **Fail** when the actual output does not match the contents of the golden test case. You then need to figure out whether this is a bug or an intentional change.


## How to use

When using **Debug**, it is important to commit your chatbot changes in both the structure view and language view. Only the instances that you have committed will be tested in debug, so committing regularly ensures that you are testing the latest version of your chatbot.

To commit changes in the structure view, click **Propagate**. This will commit your changes and propagate them to the language view. To commit changes in the language view, simply click **Commit**.
::: thumbnail
![commit struct](/images/platform/testing/commit_struct.png)
*Click **Propagate** in the structure view*

<br>

![commit lang](/images/platform/testing/commit_lang.png)
*Click **Commit** in the language view*
:::

The instructions below show you how to test your bot.

### Debug

1. To test a specific language chatbot, navigate to the corresponding language view, and click **Commit** in the upper-right corner of the **Types** area.

::: thumbnail
![commit lang](/images/platform/testing/commit_lang.png)
:::

2. Click **Debug** in the upper-right corner of the **Types** area, then the test field will slide out.

::: thumbnail
![testing try it now](/images/platform/testing/testing_try_it_now.png)
:::

3. Enter **Structure Input** if needed and click **Connect**. In this case, we just need to click **Connect**. 

::: thumbnail
![testing connect](/images/platform/testing/testing_connect.png)
:::

4. Chat with the chatbot to create a conversation that covers the functionality you want to test. 

::: thumbnail
![testing conversation](/images/platform/testing/testing_conversation.png)
:::

5. Verify correct values for the triggered type, the response, and the session parameters with **State**.

::: thumbnail
![testing state](/images/platform/testing/testing_state.png)
:::

### Create a test case

1. Click the **Save Test Case** icon in the topbar to save a conversation as a test case.

::: thumbnail
![save test case](/images/platform/testing/save_testcase.png)
:::

2. Enter a test case display name, and click **Save** to save the test case.

::: thumbnail
![enter name](/images/platform/testing/enter_name.png)
:::

3. Click the **Reset Contexts** icon in the topbar to restart a conversation to test.

::: thumbnail
![reset](/images/platform/testing/reset.png)
:::

### Run test case

1. Click **Test cases** located in the upper-right corner of the **Debug** panel.
::: thumbnail
![structure input](/images/platform/testing/test_cases_entrance_1.png)
*Before connecting*

<br>

![structure input](/images/platform/testing/test_cases_entrance_2.png)
*After connecting*
:::

2. Select the test cases you want to run, and click **Run**.

::: thumbnail
![run](/images/platform/testing/run.png)
:::

3. The test starts running and the result will be updated when it is completed.

::: thumbnail
![passed](/images/platform/testing/passed.png)
:::
