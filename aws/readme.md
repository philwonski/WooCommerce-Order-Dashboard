# AWS code

Since we want our Pipedream data in S3 as opposed to POSTing it directly to our server, we can use built-in Pipedream tools to write the JSON to an S3 bucket. You can create an IAM user, add the user to Pipedream "Accounts" and add an additional step by searching "AWS" in the Pipedream new step dialogue. 

However, since I have pre-built API Gateway and Lambda templates for receiving JSON and writing it to S3, I am using these. 

## Lambda function

1. First create a new Lambda function for the purpose of writing JSON to S3. You can just copy-paste the contents of the `index.js` file into the Lambda console. Remember to replace the BUCKET_NAME with your own. 

2. Importantly, make sure your Lambda execution role has permission to write to the bucket. 


## API Gateway endpoint

1. First create a new endpoint in API Gateway using the REST API (not the newer HTTP API). If you have never done this before, follow my [guide here](https://mydigitalmark.com/build-static-html-sites-from-google-sheets-with-lambda-and-tiddlywiki/#bodymappingtemplates). 

2. In the Integration Request in the POST method of your resource, create/modify the Mapping Template with the entire contents of the `body_mapping_template.json` file. 
