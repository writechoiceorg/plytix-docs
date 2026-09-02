---
title: Accessing your PIM's Process Log
source_url: https://help.plytix.com/en/process-queue
description: "How to monitor system processes like imports, exports, and bulk edits"
---

# Accessing your PIM's Process Log

## How to monitor system processes like imports, exports, and bulk edits

Some operations require a bit of processing time to finish. To find out what processes are currently running or have recently finished, you can consult the Process Log. 

 

[Types of processes](#processes)

[Accessing the Process Log](#accessing)

[Reading the Process Log](#Reading)

[Canceling Processes](#cancel)

 

_*Skip to any section in this article by clicking on the links above_

 

---

### Types of processes

Processes that require processing time include:
- Imports
- Exports
- Feed and Channel processing
- Editing a custom attribute that requires a post-calculation, like [Completeness attributes](https://help.plytix.com/en/completeness-tracking) or [Formula attributes](https://help.plytix.com/en/formula-attributes)
- Bulk updates

---

### Accessing the Process Log

You can find the Process Log in the top right of the main navigation bar by clicking on the icon next to your account name.

[![Process icon](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Process%20queue/Process%20icon.png?width=670&height=357&name=Process%20icon.png)](https://help.plytix.com/hubfs/Process%20Log.png)

 

---

### Reading the Process Log

The Process Log has two sections:** 'Process Queue'** and **'Activity'**. 
- The **Process Queue** shows all active or pending processes. If the process is in this part of the log it is not yet complete. 
- The **Activity** part of the Log shows the last 25 completed processing events. 

Each processing event includes an action, a user (or "System" if the event was scheduled), and the time/date it was completed.

![Activity panel](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Process%20queue/Activity%20panel.png?width=670&height=357&name=Activity%20panel.png)

 

---

###  

### Canceling Processes

In the **'Process Queue'** section of the Process Log you can view all processes that are currently running and those that are queued.

Users with account management permissions can stop a queued process or a process in progress by clicking on the red 'X' icon that appears when hovering over it. Users without account management permissions can stop processes they started themselves.

![Cancel processes](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Process%20queue/Cancel%20processes.png?width=670&height=357&name=Cancel%20processes.png)

Note that only some types of processes can be stopped depending on whether they are queued or in progress:
- Processes that are _queued_ and can be canceled:
-
 - Exports from product overview
 - Exports from asset overview
 - Imports
 - Scheduled import feeds
 - Channel processing (manual and scheduled)

- Processes that are _in progress _and can be canceled:
-
 - Imports
 - Scheduled import feeds
 - Channel processing (manual and scheduled)

 

Upon clicking the 'X' icon on a process, a popup will appear to confirm that you wish to stop it. Click the red **'Cancel process'** button.

 

ℹ️ Canceling a process will prevent further changes from being made, but will not undo changes that have already been made while the process was running.

 

---

### What's next?

- Check out our [import log](https://help.plytix.com/import-logs)
- Learn how to [manage users in Plytix](https://help.plytix.com/account-users)
- Learn how to [manage channels](https://help.plytix.com/managing-channels)

---
