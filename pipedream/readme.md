# Pipedream code

[Pipedream](https://pipedream.com) is an API tool for developers. It allows us to very quickly scaffold a data workflow and make a multi-step ETL pipeline between SaaS services. 


Per the tutorial [here](), I used Pipedream to quickly feed our WooCommerce dashboard with new Order data. 

The Pipedream steps are as follows: 

## 1. Receive WooCommerce "New Order" email as a trigger 

1. Set up a new Worflow in Pipedream and use "email" as its trigger. 

## 2. Call the WooCommerce API

2. Set up an API key in your WooCommerce backend. 
3. In your Pipedream "Accounts," add your Woo API Key as one of your Accounts. 
4. Back in your Workflow, add a step after your email "trigger." Search for "WooCommerce" for the step type and select your Woo Account. 
5. Paste the contents of `2_call_woo_api.js` into this step. This will ping WooCommerce for all your Order data. 

## 3. Receive the Woo API data and organize it into a JSON object 

6. Add another step to the workflow and paste in the the contents of `3_aggregate_order_data.js`. 

## 4. POST Order data JSON to S3

7. Since we want the data in S3 as opposed to POSTing it directly to our server, we can use built-in Pipedream tools to write the JSON to an S3 bucket. You can create an IAM user, add the user to Pipedream "Accounts" and add an additional step by searching "AWS" in the Pipedream new step dialogue. 

8. However, since I have pre-built API Gateway and Lambda templates for receiving JSON and writing it to S3, I am using those. To follow along with this method, refer to the readme in the `aws/` folder. 