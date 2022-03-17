---
title: Operation on platform
---

# Operation on platform
### Reusability
Reusability is the one of the key design goal for Framely to help business to reduce the cost of building personalized services. There are four different mechanisms available.

#### Import
Instead of build functionality from scratch, on Framely, the first choice of acquired functionality is import the relevant components. Where there are right components, builder only need to provide the business dependent data to service their users.

#### Clone
Clone is another way of reuse. Instead of build chatbot from empty slate, one start from exist chatbot by clone it.

#### Inherit
We support inherit/implementation on frames, so that we can get new behavior by adding to existing frame instead of building frame from scratch.

#### Compose
We can use frame as slot of larger frame, to get bigger and bigger behavior.

### Deployment
The project, chatbot or backend, defined on the Framely have two deploy options.
#### Framely Hosted
When configured to be Framely hosted, there will be a button "deploy" that can trigger the new definition be deployed on the Framely cloud to serve the user traffic.
#### Private Deploy
When configured to be private deployed, there will be a button "export" that can trigger the code generated for the project. The code can then be used by your devops team to bring up the service.

### Version control
Framely platform have a version control built in, so that it is easy for builder to collaborate on building chatbot. The version control is modeled after git for the nested structures.
#### Branch
One always works with a branch. Each builder can keep one active branch for each project.
#### Master
There is target branch where every one merge their result into. This is the version that get deployed.
#### Base
Each branch has a base.
#### Rebase
When master moved to new version, we need to rebase first.
#### Commit
Commit the your current change will result in a new version that can be reviewed and merged into master:
#### Review
Before your change can be merged into master, it need to be reviewed by your peers.
#### Pull request
Pull request to indicate that you have change that you want to merge into master.
#### Approve
Only approved change can be merged into master.
#### Merge
Master will have your change after merged.
#### Close
You can discard your change by close it.