# Testing

[[toc]]

## Motivation

To test your bot, you can use built-in test feature **Debug** to uncover bugs and prevent regressions. You can provide user input as text step by step, or you create and execute test case as needed. 

::: thumbnail
![pingpong test](/images/guide/pingpong/pingpong_test.png)
:::

## Structure Input

When interacting with **Debug**, you can provide user input as text like *"Get me two tickets for Star Wars"*, or a json format represents the same semantics which is used to describe filling for some data structure or provide values for its slots. 

OpenCUI dialog engine can be interacted directly in Frame Event in its json format, which allows for easier bug fixes on the interaction logic by separating the dialog understanding issues. 

For example, the user utterance `Get me two tickets for Star Wars` can be encoded as following json structure:

``` json
[
  {
    "type": "BuyTicket",
    "packageName": "test001.BuyTicket",
    "slots": [
      {
        "value": "\"starwars\"",
        "attribute": "movie",
        "type": "test001.BuyTicket.Movie"
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

In **Debug**, you can set this structure in the **Structure Input** field: 
- Before connecting

::: thumbnail
![before connect](/images/platform/testing/before_connect.png)
:::

- After connecting

::: thumbnail
![after connect](/images/platform/testing/after_connect.png)
:::

Then you can get the conversation in **Debug** like: 

::: thumbnail
![structure input](/images/platform/testing/structure_input.png)
:::

## Test Cases

The goal of [golden test cases](https://en.wikipedia.org/wiki/Characterization_test) is to help you verify that the modifications made to your bot did not modify its behavior in unwanted or undesirable ways. In other words, test case execution verifies that chatbot responses have not changed for the same inputs. 

To create a test case, you should simulate the path of the conversation you want to save in **Debug** and provide a test case display name. After saving, you can view them in the left sidebar menu **Test Cases**, which shows the test name, the latest test time and the latest test result. 

::: thumbnail
![test cases](/images/platform/testing/test_cases.png)
:::

To run the test case, you can select the one you want to run. The test engine will check the following types of data turn by turn to evaluate the test result:
- Test will **Pass** when the actual output is the expected output. 
- Test will **Fail** when the actual output does not match the contents of the golden test case. You then need to figure out whether this is a bug or an intentional change.


## How To Use

**Debug** will only test the instances you committed, so you need to commit your chatbot on both structure side and language side. This means that whenever there are new changes, **Commit** is required, and the new changes will be tested in debug. Otherwise you will still test the past performance.

::: thumbnail
![commit struct](/images/guide/pingpong/commit_struct.png)
*Figure 1: click commit on STRUCT side*

<br>

![commit lang](/images/guide/pingpong/commit_lang.png)
*Figure 2: click commit on EN side*
:::

The instructions below show you how to test your bot.

### Debug

1. Select the language bot you want to test, click **Commit** in the upper-right corner of the **Build** area.

::: thumbnail
![testing commit](/images/platform/testing/testing_commit.png)
:::

2. Click **Debug** in the upper-right corner of the **Build** area, then the test field will slide out.

::: thumbnail
![testing try it now](/images/platform/testing/testing_try_it_now.png)
:::

3. Enter **Structure Input** if needed and click **Connect**. In this case, we just need to click **Connect**. 

::: thumbnail
![testing connect](/images/platform/testing/testing_connect.png)
:::

4. Chat with the bot to create a conversation that covers the functionality you want to test. 

::: thumbnail
![testing conversation](/images/platform/testing/testing_conversation.png)
:::

5. Verify correct values for the triggered type, the response, and the session parameters with **State**.

::: thumbnail
![testing state](/images/platform/testing/testing_state.png)
:::

### Create a Test Case

1. Click the **Save Test Case** icon in the topbar to save a conversation as a test case.

::: thumbnail
![save test case](/images/platform/testing/save_testcase.png)
:::

2. Enter a test case display name, for example `happy path`, click **Save** to save the test case..

::: thumbnail
![enter name](/images/platform/testing/enter_name.png)
:::

3. Click the **Reset Contexts** icon in the topbar to restart a conversation to test.

::: thumbnail
![reset](/images/platform/testing/reset.png)
:::

### Run Test Case

1. Click **Test Cases** in the left sidebar menu.

::: thumbnail
![run testcase](/images/platform/testing/run_testcase.png)
:::

2. Select the test cases you want to run, and click **Run**.

::: thumbnail
![run](/images/platform/testing/run.png)
:::

3. The test starts running and the result will be updated when it is completed.

::: thumbnail
![passed](/images/platform/testing/passed.png)
:::
