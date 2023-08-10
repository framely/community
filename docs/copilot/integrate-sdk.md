## How to build a Copilot frontend with the OpenCUI Copilot SDK

This doc describes how to implement a copilot on the frontend using the copilot sdk, using the copilot implementation on [OpenCUI platform](build.opencui.io) as an example to guide you through building a copilot on your website.

### Install 

The OpenCUI copilot sdk supports javascript and typecript, and the OpenCUI platform is built using typescript + react. 

1. install by npm :`npm install opencui-copilot --save`
2. Install by yarn: `yarn add opencui-copilot in`

### Import the sdk and initialize a copilot client

```javascript
// import sdk
import { CopilotMessageType, OpencuiCopilot, CopilotMessageCardActionType } from 'opencui-copilot';

// create client
const client = OpencuiCopilot.create({
  url: 'https://api-64b897ae0f50353c647ca60b.api-us.naturali.io/v1/en',  // Make sure you have built and deployed your own Copilot bot on the open platform, the url is the address where the bot is deployed online or privately.
  user: {
    id: 'my_user_id',
    name: 'Me'
  } // The id and name of the user who is talking to copilot locally，user.id will be used as the session id
});
```

Before this step, you need to make sure that you have built and deployed your copilot bot on the [OpenCUI platform](build.opencui.io). See [How to build and deploy copilot bot](). CopilotConfig parameter description of  function create :

| field name    | Type               | required | Description                                                  |
| ------------- | ------------------ | -------- | ------------------------------------------------------------ |
| url           | string             | true     | Specifies the url where the bot is deployed.                 |
| user          | CopilotUser        | true     | You can use the information of your local logged-in user as the user value. When you talk to the bot, the sdk will default to this user.id as the session id of the conversation |
| defaultParams | {[key:string]:any} | false    | If copilot requires some default parameters in the bot implementation, you can define them in this parameter. These parameters are passed to the copilot bot every time a conversation message is sent |

The CopilotUser object is as follows:

| field name | Type   | Description                                         |
| ---------- | ------ | --------------------------------------------------- |
| id         | string | The id is in string format with no limit on length. |
| name       | string | name Indicates the user name                        |

### Modify client configuration

You can modify the url,user, or defaultParams after the client is created:

```javascript
// change copilot bot url
client.setUrl('new.bot.url');

// change the user that talks to the bot locally
client.setUser({
  id:'new_user_id',
  name: 'new user name'
});

// change the default parameters

client.setDefaultParam('key1', 'value1'); // To set single parameter, you can clear a parameter by setting the value to undefined or null

client.setDefaultParams({
  key1: 'value1',
  key2: 'value2'
});  // Batch setting parameters

client.resetDefaultParams({
  key1: 'value1',
  key2: 'value2'
}); // Clear all old parameters and reset to the new parameters passed

```



### Initializes a conversation with the bot

Calling the connect function generates a session with the copilot bot and returns  greeting messages from the copilot bot if the connection is successful

```javascript
client.connect().then(initMsgs => {
      // received greeting messages
      console.log(initMsgs);
    }).catch(err => {
      console.log(err);
    });

```

A connection with parameters, such as sending the url of the current page to copilot as a parameter:

```javascript
client.connect({currentUrl:window.location.href}).then(initMsgs => {
      // received greeting messages
      console.log(initMsgs);
    }).catch(err => {
      console.log(err);
    });
```



### Send message

Send a message with no parameters:

``` javascript

client.sendMessage({
        messageType: CopilotMessageType.text,
        text: 'message to bot',
        user: {
          id: 'my_user_id',
          user: 'Me'
        }
      }).then(resps => {
        // received messages from bot
        console.log(resps);
      }).catch(err => {
        console.log(err);
      });


```

Sending messages with parameters, using OpenCUI platform copilot as an example, Information such as org, agent,type or page type of the current page needs to be sent to copilot when sending messages, so that copilot bot can determine the interactive content and action parameters according to the page status:

```javascript
 
instance.sendMessage(msg, getCtxParams()).then((resp: CopilotMessage[]) => {
     	nextList.push(...resp);
      setMessageList([
        ...nextList
      ]);
 	});

// function getCtxParams
function getCtxParams() {
  const location = window.location;
  const path = location.pathname;
  const components = path.split('/');

  const ctx = new Map<string, any>();

  for (let i = 0; i < components.length; i += 1) {
    const comp = components[i];
    if (comp === 'org' && i + 1 < components.length) {
      ctx.set('orgLabel', components[i + 1]);
    } else if (ctx.get('orgLabel') && comp === 'agent' && i + 1 < components.length) {
      ctx.set('botLabel', components[i + 1]);

      if (i + 2 < components.length) {
        ctx.set('lang', components[i + 2]);
      }

    } else if (ctx.get('botLabel') && ['intent', 'frame', 'entity', 'service'].findIndex((item: string) => item === comp) !== -1) {
      switch (comp) {
        case 'intent':
          ctx.set('type', 'skill');
          break;
        case 'frame':
          ctx.set('type', 'frame');
          break;
        case 'entity':
          ctx.set('type', 'entity');
          break;
        default:
          break;
      }

      const typeId = components[i + 1];
      const param = ParameterMapStore.get(typeId);

      if (param && param.name) {
        ctx.set('typeLabel', param.name);
      }
    } else if (ctx.get('typeLabel') && comp === 'slot' && i + 1 < components.length) {
      const slotId = components[i + 1];
      const param = ParameterMapStore.get(slotId);

      if (param && param.name) {
        ctx.set('slotLabel', param.name);
      }
    }
  }

  return Object.fromEntries(ctx);
}
```



## The data structure associated with the message

### CopilotMessage

| field name  | Type                                    | Description                                                  |
| ----------- | --------------------------------------- | ------------------------------------------------------------ |
| messageType | CopilotMessageType                      | For the message type, see [CopiloMessageType](#CopilotMesageType) |
| title       | string                                  | When messageType is CopilotMesageType.Card, the field is the title of the card |
| text        | string                                  | The text of the message                                      |
| richMedia   | {fileURL: string;  alterText: string; } | If messageType is CopilotMesageType.Card, this field is the information about the attached media resource; if media is a image, fileURL is the image address; altText is the value of alt when the <img></img> tag is displayed, |
| user        | CopilotUser                             | The user that sends the message                              |
| actionList  | CopilotMessageAction[]                  | When the messageType is CopilotMesageType.Card, This field can return information for rendering several buttons, see [CopilotMessageAction](#CopilotMessageAction) |



### CopilotMesageType

```typescript
export enum CopilotMessageType {
  Text = 0,
  Card = 1,
  Other = 2
}
```

### CopilotMessageAction

| field name   | Type                         | Description                                                  |
| ------------ | ---------------------------- | ------------------------------------------------------------ |
| text         | string                       | is mainly used to render the title of button                 |
| actionType   | CopilotMessageCardActionType | When the actionType value is CopilotMessageCardActionType.reply, should be the value of the text field as a message sent to the copilot bot. When the value of the actionType is CopilotMessageCardActionType.click, should handle the action locally |
| url          | string                       | when actionType is CopilotMessageCardActionType.click, if the url field has value, should switch current page to the url |
| actionParams | { [key: string]:  string}    | when actionType is CopilotMessageCardActionType.click and url is empty, the custom action should be handled with the action parameters. |

### CopilotCardActionType

```typescript
export enum CopilotMessageCardActionType {
  click = 'click',
  reply = 'reply'
}
```



## How to build a Copilot front end

### How to implement the dialog interface first

Since different integrators have their own customized interface interactions and styles, integrators can design dialogue containers themselves or with the help of third-party UI frameworks to render messages sent and received. In this doc, with the help of [ChatUI](https://chatui.io/docs/quick-start) to draw a dialog container framework components in the sample, [view source](https://github.com/opencui/copilot-demo/blob/main/src/demo.js) :

```javascript
// demo.js

import React from 'react';

// import components and styles from ChatUI
import Chat, { Bubble, Button, useMessages } from '@chatui/core';
import '@chatui/core/es/styles/index.less';
import '@chatui/core/dist/index.css';

// import types from opencui-copilot
import { CopilotMessageType, OpencuiCopilot, CopilotMessageCardActionType } from 'opencui-copilot';

// the bot avatar you want to show
const botAvatar = require('./copilot-bot.png')

// define the local user
const me = {
  id: 'my_user_id',
  name: 'me'
};

// create client
const client = OpencuiCopilot.create({
  url: 'https://api-64b897ae0f50353c647ca60b.api-us.naturali.io/v1/en',
  user: me
})

function getAvatar(user) {
  return user.id === 'my_user_id' ? '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' : botAvatar;
}

// Converts the message returned by the copilot into the structure required by ChatUI
function converMessage(copilotMsg) {

  switch (copilotMsg.messageType) {
    case CopilotMessageType.Text:
      return {
        type: 'text',
        content: { text: copilotMsg.text },
        position: copilotMsg.user.id === 'my_user_id' ? 'right' : 'left',
        user: { avatar: getAvatar(copilotMsg.user) }
      };
    case CopilotMessageType.Card:
      return {
        type: 'card',
        content: copilotMsg,
        position: copilotMsg.user.id === 'my_user_id' ? 'right' : 'left',
        user: { avatar: getAvatar(copilotMsg.user) }
      }
    default:
      return { type: 'text' };
  }
}

// the chat container demo
export default function Demo(props) {

  // message list
  const { messages, appendMsg, setTyping } = useMessages([]);

  React.useEffect(() => {
    
    // init session, append the received greeting messages to mssage list
    client.connect().then(initMsgs => {
      for (const msg of initMsgs) {
        appendMsg(converMessage(msg))
      }
    }).catch(err => {
      console.log(err);
    });

  }, [appendMsg]);

  // send message
  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {

      // append the message to send
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
        user: {
          avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg'
        }
      });

      // set typing state
      setTyping(true);

      // call the send function of copilot
      client.sendMessage({
        messageType: CopilotMessageType.text,
        text: val,
        user: me
      }).then(resps => {
        for (const msg of resps) {
          appendMsg(converMessage(msg))
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  function handleQuickReplyClick(text) {
    handleSend('text', text);
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    const media = content.richMedia;
    // Render according to message type
    switch (type) {
      case 'text':
        return <Bubble content={content.text} style={{ textAlign: 'left' }} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      case 'card':
        return (
          <Bubble type="card" content={<div style={{ padding: '0 8px' }}>
            {
              content.title && <h3 key="title" style={{
                textAlign: 'left',
                margin: 4
              }}>{content.title}</h3>
            }
            {
              content.text && <pre key="text" style={{
                margin: 4,
                textAlign: 'left',
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'normal',
                overflowWrap: 'anywhere'
              }}>{content.text}</pre>
            }

            {media && <img key="img" style={{ maxWidth: '100%' }} src={media.fileURL} alt={media.altText} />}
            {content.actionList && content.actionList.length ? <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: -4, marginRight: -4 }}>
              {
                content.actionList.map((action, index) => {
                  return <Button key={index} onClick={() => {
                    executeAction(action);
                  }} color="primary" style={{ margin: 4 }}>{action.text}</Button>;
                })
              }
            </div> : ''
            }
          </div>} />
        );
      default:
        return null;
    }
  }

  // execute actions from card messages
  function executeAction(action) {

    switch (action.actionType) {

      case CopilotMessageCardActionType.reply:
        handleQuickReplyClick(action.text)
        break;
      case CopilotMessageCardActionType.click:
        if (action.url) {
          window.location.href = action.url;
        } else if (props.onCustomAction) {
          props.onCustomAction(action);

        } else {
          alert('This action is not supported yet');
        }
        break;
      default:
        alert('This action is not supported yet');
        break;
    }
  }

	// return the chat component of ChatUI
  return (
    <Chat
      locale='en-US'
      navbar={{ title: 'Copilot' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      placeholder='Please enter...'
      {...props}
    />
  );
}
```

### How to handle an action

demo.js contains the rendering code for action：

```javascript
<div>
	// ...
  {content.actionList && content.actionList.length ? <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: -4, marginRight: -4 }}>
                {
                  content.actionList.map((action, index) => {
                    return <Button key={index} onClick={() => {
                      executeAction(action);
                    }} color="primary" style={{ margin: 4 }}>{action.text}</Button>;
                  })
                }
</div>
```

When the action button is clicked, it excute the action in the action list. When the actionType is CopilotMessageCardActionType. The reply, Text text as the next message should be sent to the copilot bot, when actionType is CopilotMessageCardActionType. Click, the custom action should be executed with action parameters.

```javascript
function executeAction(action) {

    switch (action.actionType) {
    
      case CopilotMessageCardActionType.reply:
        handleQuickReplyClick(action.text)
        break;
      case CopilotMessageCardActionType.click:
        if (action.url) {
          window.location.href = action.url;
        } else if (props.onCustomAction) {
          props.onCustomAction(action);
    
        } else {
          alert('This action is not supported yet');
        }
        break;
      default:
        alert('This action is not supported yet');
        break;
    }

  }
```

In the above code, the action of click type gives priority to determine whether there is a value in the url field, and if there is, url changing should be done, otherwise it is passed to the specific business module for processing. You can obtain the parameters required for executing the action in the action.actionParams field.