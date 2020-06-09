# llSPS-INT-1858-Intelligent-Customer-Help-Desk-with-Smart-Document-Understanding

## Intelligent-Customer-Help-Desk-with-Smart-Document-Understanding

 In this project a chatbot is created which offers a complete and easy way to answer different sets of questions asked by the customers. With the help of Watson discovery channel it can also answer some typical questions about the operation of a device becaus we have feede the owners manual to the watson discovery channel. The benefits of this kind of chatbot is that it is superior than the typical chatbot which can answers simpe questions like store location and hours. The chatbot is upgraded with the help of watson discovery collection which is build using smart document understanding.

         It's main objective is to solve customer's queries as early as possible to save the time of the customer. 
         
         We will use the IBM cloud function that allows watson assistant to post queries to watson discovery.

         The goal is to set up a remote connection between the customer and the company. 
         
        
        
   *By this chatbot anyone can have their problem solved by posting queries to chatbot via being at home or without calling an employee.*
   
   

*Project Requirements:*

       * IBM Cloud
       * IBM Watson services
       * Node Red
       * Web Framework

*Functional Requirements:*

     * A Chatbot able to answer queries.
     * Redirect the operational queries to Owner's manual.
     * Redirect the query to the particular section of the owner's manual.


*Technical Requirements:*

     * Create a chatbot using Watson Assistant.
     * Use Watson Discovery to  redirect the user's query to the section of the owner's manual.
     * Use Node Red to wire together Api and online services.
     * Integrating it with IBM Cloud.

*Software Requirements:*

    * IBM watson services
    * IBM Assistant
    * IBM cloud
    * Github
    * Node red
    * User interface
    * Security
    * Json editor


*Project Deliverables:*

    The model created i.e. a chatbot would be able to identify any operational question posted by the user
    and using IBM Watson discovery will redirect the user to the  section of the owner's manual
    where the answer to the question lies.
    
    
  ## Flow

![architecture](http://i.xp.io/tWSpUFl.png)

    
    
    
    
    
    

## What will you get to know here?


1. How to [create a skill](skill.md) using Watson Assistant.


2. How to [create UI](flow.md) with node red flow (Chatbot).


3. How to [create cloud function](Cf.md) using IBM cloud.


4. How to [connect Watson discovery](Discovery.md) to chatbot through Cloud funtcion.









# License

This code pattern is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).


[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)


