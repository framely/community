# Reusability

[[toc]]

## Motivation

Reusability is one of the key design goals for Framely to help business to reduce the cost of building personalized services. In this way, you can use existing components instead of starting from scratch, and always create once, reuse often. There are four different mechanisms available: [Import](#import), [Clone](#clone), [Inherit](#inherit) and [Compose](#compose).

## Import
Instead of build functionality from scratch, on Framely, the first choice of acquired functionality is importing the relevant components. Components are shareable libraries provided by all organizations, including Framely. Where there are right components, you only need to import them and provide business dependent data to service your users. 

Importing a component is similar to copying a component, with two major differences:
- You can not modify the components structural parts but the language parts.
- You can keep it up-to-date with a later version of this component.

For example, `io.framely.core` is a public component provided by Framely, which provides the basic functionality of one chatbot. So when creating a new chatbot, `io.framely.core` will be automatically imported for the chatbot to work properly. You can update the versions of `io.framely.core` when you need it, but you can't modify the structural parts of it. 

## Clone
Clone is another way of reuse. Instead of building chatbot from empty slate, you can start from existing project by cloning it. 

After cloning a project, you will have a copy of it in your target organization. As this copy of project already belongs to your org, members in this org can make any modifications to it. Clone will disconnect the copy from the original project, so new changes on the original project cannot be synchronized. 

## Inherit
Framely supports inherit/implement on frames, so that you can get new behavior by adding to existing frame instead of building frame from scratch. 

There are two types of frames: interface and implementation, which allows you to inherit one frame into another frame. There are multiple inheritances possible: 
- Single Inheritance: In single inheritance, subclasses inherit the features of one superclass. 
- Multi-level Inheritance: In multi-level inheritance, a derived class will be inheriting a base class and as well as the derived class also act as the base class to other class.
- Hierarchical Inheritance: In hierarchical inheritance, one class serves as a superclass (base class) for more than one subclass.

In Framely, interface frame can inherit many interfaces, every function on the interface is abstract (only signature, no body). Implementation frame can implement many interfaces, but can only inherit one implementation, and must implement all the abstract functions specified in the interface. 

## Compose
The composition also provides reusability. When there is already a frame that includes the instances and behaviors you want, you can reuse the existing frame as slot for a larger frame, to get bigger and bigger behavior. 

## How To Use

### Import

To import a component to your project, please follow the subsequent directions: 
1. Click into the component which you would like to import.
2. On the right sidebar, click **Import** icon.
::: thumbnail
![import icon](/images/platform/reusability/import-icon.png)
:::
3. In the popup window, **select** the project where you want to import this component.
::: thumbnail
![import project](/images/platform/reusability/import-project.png)
:::
4. Click **Save**.
::: thumbnail
![import save](/images/platform/reusability/import-save.png)
:::

### Clone

To clone a project to your org, please follow the subsequent directions: 
1. Click into the project which you would like to clone.
2. On the right sidebar, click **Clone** icon.
::: thumbnail
![clone icon](/images/platform/reusability/clone-icon.png)
:::
3. In the popup window, **select** the organization where you want to clone this project.
::: thumbnail
![clone project](/images/platform/reusability/clone-project.png)
:::
4. Click **Save**. 
::: thumbnail
![clone save](/images/platform/reusability/clone-save.png)
:::

### Inherit

To inherit or implement frames:
1. Navigate to the target frame.
2. Under the **Schema** tab, select the frame you would like to inherit or implement in the **Implemented** section. 
::: thumbnail
![inherit](/images/platform/reusability/inherit.png)
:::
3. To declare a frame as an interface, turn on the **Interface** toggle in the top-right corner of this frame.  
::: thumbnail
![inherit interface](/images/platform/reusability/inherit-interface.png)
:::

### Compose

To compose frames, navigate to the target frame. Under the **Schema** tab, select the frame you want to reuse in the **Slots** section. 
::: thumbnail
![compose](/images/platform/reusability/compose.png)
*1. In Slots section*

<br>

![compose frame](/images/platform/reusability/compose-frame.png)
*2. Add frame as slot*
:::