# Build a copilot frontend

## Summary
OpenCUI provides a chat component in the form of a React component that chat with a Chatbot. The integrator only needs to pass the following properties to the component:
1. Bot url: Enter the url where the Chatbot is deployed
2. Context getter function: When a user's message is sending to the bot, it will call this function to obtain the current frontend status before the request and send it to the bot as request parameters, so that the bot can return more accurate replies and actions according to the current front-end status
3. Action handler function: The action returned by the bot is displayed in the chat component as a button, When the button is clicked, the execution of the action handler will be triggered. The information of the action (including the type and parameters of the action) will be passed to the action handler as a parameter, which will be processed by the integrator for  a specific action business.

## Install
1. Install by npm :`npm install @opencui/copilot-react --save`
2. Install by yarn: `yarn add @opencui/copilot-react`

## Use chat component 
Import chat component into your react app and embed it in your UI. In this example code, the url of the current page is used as an example of the app status, and the alert displays the action information as an example of processing the action. The integrator should pass in status and process actions based on the specific business requirements of the app. 

``` javascript
import './App.css';
import { ChatComponent } from '@opencui/copilot-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ height: '80vh', width: 500 }}>
          <ChatComponent
            botURL="https://api-64b897ae0f50353c647ca60b.api-us.naturali.io/v1/en"
            contextGetter={() => {  
              return {
                url: window.location.href
              };
            }}
            actionHandler={action => {
              alert(JSON.stringify(action, null, 4));
            }}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
```

See [Demo](https://github.com/opencui/web-copilot).