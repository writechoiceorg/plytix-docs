---
title: Connecting to FTP/SFTP and Dropbox
source_url: https://help.plytix.com/en/establish-channel-connections-to-ftp-and-dropbox
description: "A detailed breakdown on how to send data to FTP/SFTP or Dropbox by connecting it to your Plytix PIM account"
---

# Connecting to FTP/SFTP and Dropbox

## A detailed breakdown on how to send data to FTP/SFTP or Dropbox by connecting it to your Plytix PIM account

Plytix Channels integrate directly with Dropbox and FTP/SFTP servers.  By creating a connection between Plytix and an FTP/SFTP server or Dropbox account, you can send copies of channel files whenever they are processed. This way, you can push channel feed data for redistribution or storage. 

 

[Connections Overview](#overview)

[Connection Details](#details)

[Creating a Connection](#creating-connection) 

[Pushing Data from a Channel](#push-data)

 

_*Skip to any section in this article by clicking on the links above_

 

---

### Connections Overview 

You can create and manage all FTP/SFTP and Dropbox connections from the '**Connections'** tab of the PIM settings. 

To get here: 
1. Click on '**Settings'** in the top navigation menu.
2. On the left side menu, choose '**Connections.'**

![Settings-connections](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections.png?width=670&height=357&name=Settings-connections.png)

Your FTP/SFTP and Dropbox connection will be listed in the table along with the following basic information:
- **Name - **The name used to identify the connection
- **Type - **Connection type (FTP, SFTP or Dropbox)
- **Last result - **The result of the last time the connection was tested 
- **Last time processed - **The date and time when this connection was last processed.

 

💡 Use the search bar to quickly find the connection you are looking for. You can also sort your connections by any of the columns above. 

###  

---

### Connection Details 

From the connection overview table, click on a connection's name. This will take you to the connection's details page where you can see all the details of that connection.

 

You will see three sections in the details page: 

[Header](#details-header)

[Connection Setup](#details-connection)

[Used in](#details-used)

 

#### Header

The header provides you with an overview of the connection.

![Settings-connections-details](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-details.png?width=670&height=357&name=Settings-connections-details.png)

It tells you: 

1. **Type** **of connection** (FTP, SFTP or Dropbox)

2. **Name of the connection** (click on the name and press enter to edit it)

3. **Last time updated** - The last time the connection setup was edited.

4. **Created** - The day and time this connection was added

 

#### Connection Setup 

The "Connection Setup" section will look different depending on if it's an FTP/SFTP connection or a Dropbox connection. This is where you can add your login credentials to setup the connection between an FTP/SFTP server or a Dropbox account. 

[![Settings-connections-details-Dropbox_vs_FTP](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-details-Dropbox_vs_FTP.png?width=670&height=357&name=Settings-connections-details-Dropbox_vs_FTP.png)](https://help.plytix.com/hubfs/Connection%20details%20-%20setup-1.png)

 

#### Used in

This section will list the channels that are currently using this connection to push data. You can click on a channel listed to see that channel's details. 

![Settings-connections-dropbox_connection](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-dropbox_connection.png?width=670&height=357&name=Settings-connections-dropbox_connection.png)

###  

---

### Creating a Connection

There are two steps to adding an FTP/SFTP or Dropbox connection with your Plytix account.

 

[Adding the connection](#adding)

[Setting up the connection (FTP/SFTP)](#ftp-setup)

[Setting up the connection (Dropbox)](#dropbox-setup)

 

#### Adding the connection

To add a connection between your Plytix account and an FTP/SFTP server or Dropbox account: 

 
1. Click on '**Add connection'**

**[![Settings-connections-add_connection](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-add_connection.png?width=670&height=357&name=Settings-connections-add_connection.png)](https://help.plytix.com/hubfs/Help%20center/Channels/FTP%20Connection/connection-type.png)**

2. Select the type of connection you want to add: '**FTP/SFTP' **or '**Dropbox'

[![Settings-connections-add_connection-02](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-add_connection-02.png?width=670&height=357&name=Settings-connections-add_connection-02.png)](https://help.plytix.com/hubfs/Help%20center/Channels/FTP%20Connection/ftp-sftp-setup.png)
**
3. Select if you want to add an **'FTP'**, **'SFTP'** or **'Dropbox'** connection.

4. Name the connection.

5. Click '**Add Connection**'

This will take you to the connections dashboard where you can continue with the set up process. 

 

#### FTP/SFTP Connection Setup

 

Once in the connection details page, head to the Connection Setup area.
1. Click the '**Edit'** button found on the bottom right of the Connection Setup area. 
2. Fill in the **Host** information. This will be the main URL of the website. 
3. Define the **Port** (_this is optional_).
4. Add the login credentials (username and password) for the server. 

![Settings-connections-add_connection-03](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-add_connection-03.png?width=670&height=357&name=Settings-connections-add_connection-03.png)

 5. Click '**Test** **connection.'** In the window that appears, sheck the box to agree to the creation of a temporary test file within your FTP, then click **'Test connection'** again to confirm.

![Settings-connections-add_connection-04](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-add_connection-04.png?width=670&height=357&name=Settings-connections-add_connection-04.png)

 

6. Save your connection. 

When you test the connection, a window will appear letting you now if the connection test was successful or not. 

ℹ️ If you don't have the server credentials, contact your site administrator for these details or get direct connection information to a specific folder on your server.

 

If the connection wasn't successful, you will get the following message after clicking on '**Test Connection**':

![Settings-connections-add_connection-05](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-add_connection-05.png?width=670&height=357&name=Settings-connections-add_connection-05.png)

If you are facing connection errors, please make sure you are reviewing the following common errors to troubleshoot it:

**1. Permission rights**

In order for the FTP/SFTP connection to work, the configured FTP user must have the right to read, write, create, and delete both files and folders in the FTP root folder.

**2. Private and public key files**

Private and public key files are not supported in Plytix. If your FTP/SFTP connection includes those, the connection with Plytix will fail.

**3. Firewall/access control policy**

If you have a firewall or access control policy set up, your connection may fail due to not recognizing Plytix's server. To prevent this, make sure to **whitelist Plytix's public IP**. If you are facing issues with this, please contact help@plytix.com or click on the chat icon below to request more information.

#### Dropbox Connection Setup

Once in the connection details page, head to the Connection Setup area.
1. Click the '**Connect** **to** **Dropbox'** button. A popup will appear where you can sign in to your dropbox account.
2. Sign in to the Dropbox account you want to connect. 

![Settings-connections-add_connection-dropbox](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-add_connection-dropbox.png?width=644&height=343&name=Settings-connections-add_connection-dropbox.png)

3. Click '**Allow'** in the popup. 

![Settings-connections-add_connection-dropbox-02](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-add_connection-dropbox-02.png?width=644&height=343&name=Settings-connections-add_connection-dropbox-02.png)

4. Another popup will appear letting you know if the connection was successful or not. Click **'Close'**

![Settings-connections-add_connection-dropbox-03](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Settings-connections-add_connection-dropbox-03.png?width=644&height=343&name=Settings-connections-add_connection-dropbox-03.png)

You are now ready to begin using these connections in your channels. 

 

---

###  

### Pushing Data from a Channel

Once you have added connections to your Plytix account, you can begin using them in your channels. Doing so will send a copy of your channel file to the connection you want every time you process the channel. You can add as many connections as you'd like to send a copy of the channel to. 

 

To do this: 
1. Click on '**Channels'** in the top navigation menu.
2. Click on the name of the channel that you want to add the connection.
3. Head to the '**Settings'** tab of the channel details 
4. Under the '**Connections'** section select the connection where you want to send the file.
5. Click '**Save changes'**.

![Channels-settings](https://help.plytix.com/hs-fs/hubfs/Help%20center/Help%20Center%20Images/HC%20-%20Connecting%20to%20FTP%20SFTP%20and%20Dropbox/Channels-settings.png?width=670&height=357&name=Channels-settings.png)

 💡 Define the destination folder name or leave the space blank to use the channel's name. 💡 When creating an FTP connection you can only send data to a folder one level down and you cannot enter the “\” character in the destination folder. A new folder will be created if “\” is used.

 

---

###  

### What's next? 

- Learn how to [create a channel](https://help.plytix.com/en/creating-a-channel)
- Learn how to manage your [product table views](https://help.plytix.com/create-and-manage-product-table-views)
- Learn about [setting up an import feed](https://help.plytix.com/en/feed-imports/csv)

---
