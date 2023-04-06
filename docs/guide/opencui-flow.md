# OpenCUI flow

OpenCUI comes with a Git like version control system, that is specifically designed for the structured chatbot definition so that we can manage the definition across modules and languages accurately. If you used Git in your development, this process should be very similar.

OpenCUI flow is a branch-based workflow. After you tested your changes, it's important to ask project owner to review your changes and ensure they meet the chatbot's features and quality standards, by opening a pull request and comparing the changes across your branch. Once your change is approved, you can merge them into the master. For more information on working with branch and reviewing changes, please refer to the [Version control](../reference/platform/versioncontrol.md) section.


## Before you start

To follow OpenCUI flow, you will need to [sign up](./signingup.md#sign-up) for a OpenCUI account and log into [OpenCUI](https://build.opencui.io/login) platform. Make sure to complete the steps outlined in the [Build a chatbot](./pingpong.md) guide. The steps in this guide build upon the chatbot created in the previous guide.

## Create branch

When you start building a project, such as creating a type, adding or modifying an instance, a branch is automatically created for you based on the current master. This gives you a space to work on your changes without affecting the master. You can work on your changes in isolation from the changes that other people are making. Additionally, creating a branch gives your collaborators a chance to review your changes before you merge them into the master. In OpenCUI, you can only have one active branch per project.

## Make changes

In your branch, you can make any desired changes to the project, such as the changes in [Build a chatbot](./pingpong.md) guide. If you make a mistake, you can undo your changes or revert to your latest commit. Your changes will not be added to the master branch until you merge your branch.

## Create a pull request

Once you're ready to share your work, you can create a pull request to get feedback on your changes from your collaborators. Pull requests show the changes you made in your branch compared to the master branch, which indicates that you're ready to merge your changes into the master branch.

To create a pull request:
1. In the navigation bar, select the **Versions** tab.
2. Click **Pull request** in the upper-right corner of the Versions area.
::: thumbnail
![pingpong pull request](/images/guide/pingpong/pingpong_pull_request.png)
:::

## Review and merge pull request

Collaborators can review pull request and submit reviews by marking **Approve** or **Close**.

To review changes: 
1. Click the item you want to review, and **Compare diffs** field will slide out.
   ::: thumbnail
   ![version item](/images/guide/pingpong/version_item.png)
   :::
2. In the **Compare diffs** drawer, make sure all the changes are what you want. You can switch between different layers from the topbar.
   ::: thumbnail
   ![review pull request](/images/guide/pingpong/review_changes.png)
   :::
3. Once you're satisfied with the changes, you can **Approve** them. 
   ::: thumbnail
   ![approve pull request](/images/guide/pingpong/approve_changes.png)
   :::
4. Once the pull request is approved, you can **Merge** this pull request. OpenCUI will tell you if your pull request has conflicts that must be resolved before merging. For more information, see [Resolve Merge Conflict](../reference/platform/versioncontrol.md#resolve-merge-conflict).
   ::: thumbnail
   ![merge pull request](/images/guide/pingpong/merge_changes.png)
   :::