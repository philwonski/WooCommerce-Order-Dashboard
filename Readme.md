# WooCommerce Dashboard

## Summary 

This repo sets up an Order Dashboard for receiving WooCommerce Orders on a dashboard server. You can read a post about the dashboard and its architecture [here](https://mydigitalmark.com/woocommerce-dashboard-with-sms-using-twilio-pipedream-and-tiddlywiki). 

![Data workflow](https://mydigitalmark.com/wp-content/uploads/2021/07/woocommerce_dashboard_with_pipedream_twilio_tiddlywiki-1024x527.jpg "Data workflow")

## App Components

### Server Dashboard

- The dashboard is built with [TiddlyWiki5](https://tiddlywiki.com) on Node.js. 
- You can set up your own node js server to use the app on a VPS, a Raspberry Pi, or wherever. I set one up on a Digital Ocean server in [this guide](https://mydigitalmark.com/add-login-to-nodejs-with-cloudflare-argo-tunnels/#dosetup).
- Once your server is set up, clone/extract the entire contents of the `server/` folder into your root directory. Then follow the Readme inside the `server/` folder. 

### Pipedream API 

- The APIs in the `pipedream/` folder were developed with [Pipedream](https://pipedream.com).
- Follow the tutorial linked in the Summary above to understand how to set up your APIs. 
- The code in these files can be pasted directly into Pipedream. 

### AWS templates 

- The Pipedream APIs *could* POST our Order data directly to our TiddlyWiki dashboard; however, instead of setting up an Express server to recieve the data on the VPS, I POST the data from Pipedream into S3, using code from the `aws/` folder. 
- Pipedream is set to POST its output to an API Gateway endpoint I created. The Body Mapping Template for this endpoint is in the `aws/` folder. 
- I have also included the Lambda function, `aws/index.js`, which is used to write Pipedream's last step to a JSON file in S3. The shell scripts in the dashboard `server/` folder will then poll S3 periodically to retrieve the latest Orders. 
- Note that, with Pipedream, it is not necessary to set up API Gateway and Lambda to write your JSON to S3. This can be done within Pipedream, by using their built-in AWS templates for the last step of the workflow instead of my POST request to APIGW. 

## To-Do

- More docs and guides and examples.
- Add more Woo functions to the dashboard, such as a button to update the status of an Order in WooCommerce. 
