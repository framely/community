# Debug a chatbot

Before your chatbot is fully ready and can be deployed to production environment, OpenCUI includes a built-in **Debug** tool that allows you to test your design in the development environment, so that you can uncover CUI design bugs as early as possible, with some restrictions. With Debug, you can't test your chatbot in asynchronous extensions including channels like Messenger. Debug can only test one language at a time, and only committed content in your branch.

### Before you start

This quickstart assumes you have finished [Clone a project](./start-with-clone.md) guide. The steps here assume you are in the chatbot you cloned in there.

### Test chatbot
To test your chatbot using Debug, follow these steps:

1. Switch to a language view, in this case **EN**. 

2. In a language view, click **Debug** in the upper-right corner of the Build area , the debug window will slide out. 

   ::: thumbnail
   ![try it now](/images/guide/pingpong/tryitnow_icon.png)
   :::

3. Click **Connect**. This may take some time to as we build and deploy the chatbot to our test environment. Once the connection is established successfully, you can test your chatbot by typing messages.

4. Enter `ping` in the text input box at the bottom and press enter, then the bot should respond with `Pong`. 
5. You can make modifications, such as changing the response and expression. For the change to take effect, make sure you commit and reconnect.

### Reset session
The replies that bot generated for the user input depends on the conversation history. Sometime, you need to have a clean start to try something, you can restart your testing by clicking the "**Reset Contexts**" icon.

### View Log
For these pro coders, you can inspect the detailed log by clicking the "**View Log**" icon.

### Save test case
   You can save test cases by clicking the "**Save Test Case**" icon, so you can rerun them in a later stage. For more information about Debug, refer to the [Testing](../reference/platform/testing.md) section.

   ::: thumbnail
   ![pingpong test](/images/guide/pingpong/pingpong_test.png)
   :::


