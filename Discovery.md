## Connecting Discovery to Chatbot using Cloud functions.

[![Build Status](https://api.travis-ci.org/IBM/watson-discovery-sdu-with-assistant.svg?branch=master)](https://travis-ci.org/IBM/watson-discovery-sdu-with-assistant)

## What is SDU?

SDU trains Watson Discovery to extract custom fields in your documents. Customizing how your documents are indexed into Discovery will improve the answers returned from queries.

With SDU, you annotate fields within your documents to train custom conversion models. As you annotate, Watson is learning and will start predicting annotations. SDU models can also be exported and used on other collections.

Current document type support for SDU is based on your plan:

* Lite plans: PDF, Word, PowerPoint, Excel, JSON, HTML
* Advanced plans: PDF, Word, PowerPoint, Excel, PNG, TIFF, JPG, JSON, HTML

## What is a webhook?

A webhook is a mechanism that allows you to call out to an external program based on something happening in your program. When used in a Watson Assistant dialog skill, a webhook is triggered when the Assistant processes a node that has a webhook enabled. The webhook collects data that you specify or that you collect from the user during the conversation and save in context variables, and sends the data to the Webhook request URL as an HTTP POST request. The URL that receives the webhook is the listener. It performs a predefined action using the information that is provided by the webhook as specified in the webhook definition, and can optionally return a response.

In our example, the webhook will communicate with an IBM Cloud Functions `web action`, which is connected to the Watson Discovery service.



# Steps:

1. [Create IBM Cloud services](#1-create-ibm-cloud-services)
1. [Configure Watson Discovery](#2-configure-watson-discovery)
1. [Create IBM Cloud Functions action](#3-create-ibm-cloud-functions-action)
1. [Configure Watson Assistant](#4-configure-watson-assistant)



### 1. Create IBM Cloud services


Create the following services:

* [**Watson Discovery**](https://cloud.ibm.com/catalog/services/discovery)
* [**Watson Assistant**](https://cloud.ibm.com/catalog/services/assistant)

### 2. Configure Watson Discovery


#### Import the document

Launch the `Watson Discovery` tool and create a new data collection by selecting the `Upload your own data` option. Give the data collection a unique name. When prompted, select and upload the `watsonexplorerinstall` file located in the local repo.
Before applying SDU to our document, lets do some simple queries on the data so that we can compare it to results found after applying SDU. Click the `Build your own query`  button. Enter queries related to your Bot.


#### Annotate with SDU


Now let's apply SDU to our document to see if we can generate some better query responses.

From the Discovery collection panel, click the `Configure data` button (located in the top right corner) to start the SDU process.

Here is the layout of the `Identify fields` tab of the SDU annotation panel:

For this specific owner's manual, at a minimum, it is suggested to mark the following:

* The main title page as `title`
* The table of contents (shown in the first few pages) as `table_of_contents`
* All headers and sub-headers (typed in light green text) as a `subtitle`
* All page numbers as `footers`
* All warranty and licensing infomation (located in the last few pages) as a `footer`
* All other text should be marked as `text`.


Once you click the `Apply changes to collection` button , you will be asked to reload the document. Choose the same owner's manual `.pdf` document as before.

Next, click on the `Manage fields`  tab.

Once again, you will be asked to reload the document.

Now, as a result of splitting the document apart, your collection will look very different:

Return to the query panel (click `Build your own query`) and see how much better the results are.


![alt output](http://i.xp.io/si6vtWN.png)



#### Store credentials for future use


In upcoming steps, you will need to provide the credentials to access your Discovery collection. The values can be found in the following locations.

The `Collection ID` and `Environment ID` values can be found by clicking the dropdown button located at the top right side of your collection panel:


![alt output](http://i.xp.io/siUYYP3.jpg)


For credentials, return to the main panel of your Discovery service, and click the `Service credentials` tab:

Click the `View credentials`  drop-down menu to view the IAM `apikey`  and `URL` endpoint for your service.


![alt output](http://i.xp.io/siY3t7o.jpg)




### 3. Create IBM Cloud Functions action

Now let's create the `web action` that will make queries against our Discovery collection.

* Start the `IBM Cloud Functions` service by selecting `Create Resource` from the IBM Cloud dashboard. Enter `functions` as the filter , then select the `Functions` card :

![alt output](http://i.xp.io/sj8o7ku.png)

* From the `Functions` main panel, click on the `Actions` tab. Then click on `Create`. From the `Create` panel, select the `Create Action` option. On the `Create Action` panel, provide a unique `Action Name` , keep the default package , and select the `Node.js 10`   runtime. Click the `Create` button  to create the action. 
 Once your action is created, click on the `Code` tab :

![alt output](http://i.xp.io/sjhwN44.png)

* In the code editor window , cut and paste in the code from the `disco-action.js` file found in the `actions` directory of your local repo. The code is pretty straight-forward - it simply connects to the Discovery service, makes a query against the collection, then returns the response.

* If you press the `Invoke` button , it will fail due to credentials not being defined yet. We'll do this next.

 * Select the `Parameters` tab 

Add the following keys:

* url
* environment_id
* collection_id
* iam_apikey

For values, please use the values associated with the Discovery service you created in the previous step.

> Note: Make sure to enclose your values in double quotes.

![alt output](http://i.xp.io/sjkD0d1.png)

Now that the credentials are set, return to the `Code` panel and press the `Invoke` button again. Now you should see actual results returned from the Discovery service

![alt output](http://i.xp.io/sohoj7X.png)

Next, go to the `Endpoints` panel :

![alt output](http://i.xp.io/sokV7jI.png)


Click the checkbox for `Enable as Web Action` . This will generate a public endpoint URL .


### 4. Configure Watson Assistant

 Launch the `Watson Assistant` tool and create a new dialog skill. Select the `Use sample skill` option as your starting point.


This dialog skill contains all of the nodes needed to have a typical Bot conversation with a user.

#### Add new intent

The default customer care dialog does not have a way to deal with any questions involving outside resources, so we will need to add this. Create a new `intent` that can detect when the user is asking about anything else.


![alt output](http://i.xp.io/stkrDnh.png)


From the `Restaurant Bot Skill` panel, select the `Intents` tab. Click the `Create intent` button. Name the intent `Extrainfo#`,.


![alt output](http://i.xp.io/stttLqr.png)


#### Create new dialog node

Now we need to add a node to handle our intent. Click on the `Dialog`  tab, then click on the drop down menu for the `Small Talk` node , and select the `Add node below`  option.

![alt output](http://i.xp.io/stKz68R.png)

The dialog node should have a `Return variable` [1] set automatically to `$webhook_result_1`. This is the variable name you can use to access the result from the Discovery service query.

![alt output](http://i.xp.io/stU3o2U.png)



Now that the credentials are set, return to the `Code` panel and press the `Invoke` button again. Now you should see actual results returned from the Discovery service:

![alt output](http://i.xp.io/sjBZ4DI.png)






