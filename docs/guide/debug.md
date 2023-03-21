# Test a chatbot

Before your chatbot is fully ready to be deployed to production environment, OpenCUI includes a built-in **Debug** tool that allows you to test your design in a development environment, so that you can uncover CUI design bugs as early as possible. There are some restrictions with this tool: you can't test your chatbot in asynchronous extensions including channels like Messenger. Furthermore, you can only test one language at a time, and only committed content in your branch.

### Before you start

This quickstart assumes you have finished [Clone a project](start-with-clone.md) guide. This guide assume you are in the chatbot you cloned following that.

### Test chatbot
To test your chatbot using Debug, follow these steps:
* Switch to a language view, in this case **EN**. 
   ::: thumbnail
   ![try it now](/images/guide/pingpong/switch_pingpong_en.png)
   :::
* In a language view, click **Debug** in the upper-right corner of the Build area , the debug window will slide out. 

   ::: thumbnail
   ![try it now](/images/guide/pingpong/tryitnow_icon.png)
   :::
* Click **Connect**. This may take some time to as we build and deploy the chatbot to our development environment. Once the connection is established successfully, you can test your chatbot by typing messages in the input box at bottom and press enter. For example, enter `ping` then the bot should respond with `Pong`. 
   
   ::: thumbnail
   ![pingpong test](/images/guide/pingpong/pingpong_test.png)
   :::
* You can make modifications, such as changing the response and expression. For the change to take effect, make sure you commit and reconnect.

### Reset session
The replies that bot generated for the user input depends on the conversation history. Sometime, you need to have a clean start to try something, you can restart your testing session by clicking the "**Reset Contexts**" icon.

### View Log
For coders, you can inspect the detailed log by clicking the "**View Log**" icon.

### Save test case
You can save test cases by clicking the "**Save Test Case**" icon, which allow you rerun them in a later stage. For more information about Debug, refer to the [Testing](../reference/platform/testing.md) section.

### Next steps
Now you know how you can test a chatbot, let's see how you can [build a simple chatbot](pingpong.md).
