# Access control

[[toc]]

## Motivation
It is common for multiple members to collaborate on building a project. OpenCUI offers access control, which lets you give more granular access to specific project resources and prevents unwanted access to other resources. 

Access control lets you adopt the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege), so control access and permissions granted to team members, you grant only the necessary access to your project resources.

## Organization access
Your team can collaborate on OpenCUI by using an organization account, which serves as a container for your shared work and gives the work a unique name and brand. You can invite people to join your organization, then give these members a variety of roles that grant different levels of access to the organization and its project. 

The roles in the organization are:
| Role   | Summary |
|:--     |:---     |
| Member | Can see all other members, can be granted access to projects. |
| Owner  | Full administrative rights to the org, and have complete access to all projects. |

Organizations can own public, internal and private project. You can start with Starter Plan, which includes limited features on public project. To get the full feature set on public project, internal and private project and additional features at the organization level, you can upgrade to Team or Case Based plan. For more information, see [Pricing](../../pricing/README.md).

## Project access
In addition to managing access to the organization itself, you can separately manage access to your organization's projects. 

1. You can restrict who has access to a project by choosing a project's privacy: public, internal or private:

| Privacy  | Summary |
|:--       |:---     |
| Public   | Accessible to everyone in the OpenCUI. Only have read-only permissions, if they are not granted specific access. |
| Internal | Accessible to certain organization internal members. Only have read-only permissions, if they are not granted specific access. |
| Private  | Only accessible to you and people you explicitly share access with |

2. You can customize access to each project including chatbots, components and providers in your organization by assigning granular roles. From least access to most access, the roles for a project are:

| Role 	| Summary |
|:--    |:---     |
| Read  | Accessible to view your project |
| Edit  | Accessible to edit language related content to your project |
| Write | Manage the project without access to sensitive or destructive actions |
| Admin | Full access to the project, including sensitive and destructive actions like managing privacy or deleting a repository |

::: tip Note
By default, **Member** of an organization will have **Read** permissions to the projects, **Owner** of an organization will have **Admin** permissions. 
:::

## How to use

### Invite member join organization
To invite a member to join your org:

1. Head to the organization **Settings** page, select the **Team Members** tab, click **Add Member**.

::: thumbnail
![add org member](/images/platform/access/add_org_member.png)
:::

2. In the popup, type the email address of the person you want to invite and click **Add**.

::: thumbnail
![type email](/images/platform/access/type_email.png)
:::

3. To manage members, find the person whose role you'd like to change, hover “**…**” icon on the right side. You can set a member as **Owner**, convert internal memeber to **Collaborator** or **Remove Member**. 

::: thumbnail
![manage member](/images/platform/access/manage_member.png)
:::

::: warning Need To Know
- When you removing members from your organization, all project corresponding datas of their branch will be permanently destroy. The paid license count does not automatically downgrade.

- When you converting members to collaborator, means this operation will covert them from **Internal Member** to **Outside Collaborator**, their permissions to the internal projects will be lost. If they do not have specific permissions for any of the projects, they will be removed from the organization.
:::

### Manage access to project
To give a member specific access to a project:

1. Head to the project **Settings** page, select the **Access** tab, click **Add Member**.

::: thumbnail
![project access](/images/platform/access/project_access.png)
:::

2. In the popup, type the email address of the person you want to add and click **Save**. You can allow the person who is not a member of your organization to access projects that your org owns, who will be an outside collaborator. Adding an outside collaborator to a project will use one of your paid licenses.

::: thumbnail
![project type email](/images/platform/access/project_type_email.png)
:::

3. To manage member access, find the person whose access you'd like to change. Hover “**…**” icon on the right side, select and click the new role. 

::: thumbnail
![manage project access](/images/platform/access/manage_project_access.png)
:::