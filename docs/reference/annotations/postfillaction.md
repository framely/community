# Post-fill action
The post-fill action provides a method to customize the behavior of the user interaction after filling a slot. It allows for additional information to be provided to users, filling other slots based on the value of the current slot, and even starting another skill if necessary.

For example, in a restaurant reservation scenario, the post-fill action can be used to inform users about birthday discounts when they provide their preferred date for a reservation. If the chosen date matches their birthdate, the chatbot will notify them about personalized discounts and benefits. Additionally, specific dates may have fixed event timings or specific operating hours for the restaurant. Based on the selected date, the chatbot can automatically populate the time slot with the available fixed time associated with that date. Moreover, if the user wants to request a specific table arrangement, the chatbot can initiate a separate skill specifically designed for handling such requests.

Overall, the post-fill action enhances the user experience by providing relevant information, automating certain tasks, seamlessly transitioning between skills if needed, and more.

## Overview
The post-fill action is the final step in slot filling and is triggered only after the target slot is filled. To set up the post-fill action, you need to define the target slot, conditions, and the update action:
- **Target slot**: The slot that triggers the post-fill action when it's filled.
- **Conditions**: The conditions  under which the post-fill action should be executed.
- **Update action**: The actions to be executed when the conditions are met. You can view the whole actions in [system actions](./transition.md#system-actions).

There are two ways to set up the post-fill action: at the slot level and at the frame level.

- **Slot level**: You can set the post-fill action directly in the target slot, so you only need to define the conditions and the update action.
  ::: details Details on how to set it up
  ![slot level](/images/annotation/postfillaction/slot_level.png)
  1. Enter a slot, and switch to the **Annotation** tab.
  2. Enable **Post-fill action** and click the **Add** button.
  
  ![detail](/images/annotation/postfillaction/post-fill_action.png)

  3. In the popup window, enter the **Conditions** using Kotlin expressions and select the desired **Update action**.
  :::

- **Type level**: Alternatively, you can set the post-fill action in the type to which the target slot belongs. By doing so, you can conveniently define and manage the post-fill actions for all slots of that type in a single location.
  ::: details Details on how to set it up
  ![frame level](/images/annotation/postfillaction/frame_level.png)
  1. Enter the type to which the target slot belongs, and switch to the **Annotation** tab.
  2. In the **Transition** section, click the **Add** button.
  
  ![detail](/images/annotation/postfillaction/transition_detail.png)
  
  3. On the Transition page, configure the following:
     - **Trigger method**: Condition
     - **Conditions**:
       - In the code block, enter the conditions using Kotlin expressions.
       - Trigger timing: Select the target slot.
     - **Update action**: Select the required actions.
  :::

## Limitations
Here are some things to keep in mind:
- **Only the action corresponding to the first true condition will be execuated for each slot.** Since the post-fill action follows an if-else relationship, if a true condition is encountered, the other conditions will not be evaluated.
- **If you select the "Clear slot" action, make sure to clear only the slots that appear before the target slot.** As slots are filled in the order they appear in the slot list, the value of the next slot may not have been filled when the current slot is filled.
- **Exercise caution when using the "Skill start" action.** Inappropriate usage of "Skill start" may lead to infinite loops and result in a poor user experience.

## Best practice
The post-fill action involves further processing or executing relevant actions after successfully filling the target slot. Before filling the slot, you can utilize other annotations to enhance the user experience. By using annotations before and after filling the slot, you can effectively improve the user interaction.

Here are some tips for effectively using the post-fill action:

- **Use initialization**: If the value of the target slot can be determined by your business logic, you can initialize this slot to save users' effort. For cases where only part of the value is determined by your business logic, use type-level initialization instead.
- **Use prompt**: If the value of the target slot needs to be filled by the user, set a prompt so that the chatbot can request the value from the users.
- **Use value check**: When it is necessary to verify the value of the target slot, employ the value check to ensure its accuracy based on specific conditions.
- **Use confirmation**: When values of the target slot need to be confirmed, utilize the confirmation to obtain explicit confirmation from users or provide implicit confirmation under specific conditions.

