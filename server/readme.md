# Server setup

## Getting started

1. The files in this `server/` directory require a server running node js, pm2, and rclone. 

2. Clone/extract the contents of this directory into your server's root directory. 

3. Install tiddlywiki globally on your server by running `npm install -g tiddlywiki`. If you need help setting this up or figuring out how to secure it with a login, check out [this guide](I set one up on a Digital Ocean server in [this guide](https://mydigitalmark.com/add-login-to-nodejs-with-cloudflare-argo-tunnels/).

4. In order to send SMS with Twilio, you need to set up a Twilio account. 
- Use your "From" number and your auth code to update the file `tiddlers/$__plugins_OokTech_SubmitForm_action-submitform.js`. You will need to base64 encode your auth code first. 
- Use your Twilio endpoint URL (available in Twilio Dash -> API Explorer) to update the `tiddlers/mymacros` file. Replace the first macro definition, TWILIO_URL, with your own URL. 

## Starting the dashboard

1. To fire up the tiddlywiki dashboard, navigate to the server folder and launch the thdash script: `pm2 start thdash.sh`. This starts the server listening on port 7401. 

2. At any time you can see a list of processeses running with the command `pm2 list`. If we run that, we should see our dashboard running as process `0`. 

3. You can now visit your dashboard by visiting `MYDOMAIN_OR_IP:7401`. The guide linked in the Getting Started section shows you how to configure this with an actual domain, so you do it like mydomain.com/dashboard. 

4. To display brand new Orders that come in, the wiki will need to be restarted. You can set this up with by adding a cron flag to a pm2 command: `pm2 restart 0 --cron "*/2 * * * *"` will restart TiddlyWiki every 2 minutes. The dashboard will update automatically without having to refresh the page. 

## Feeding the dashboard with Orders

1. If you followed my tutorial, your orders are being dropped into an S3 bucket. 
- Originally I used the minimal Express server in `server/express_test` to receive the Orders on the server; 
- however, since I want to protect the server with Cloudflare Argo Tunnels, I can't POST the Order JSON directly to the Express server unless I pay Cloudflare. 
- This is why I write the Orders to S3, then use the server to poll S3 periodically and download the Orders. 

2. To get our Orders out of S3, use the `server/rclonenew.sh` script. 
- First install rclone and [configure it to work with S3](https://rclone.org/s3/#amazon-s3). Make sure you create an IAM user with permission to read your bucket. 
- Check the `rclone.sh` script to make sure your folder names (in S3 and locally) match up with those in the script. 
- From the `server/` directory, run `pm2 start rclonenew.sh`. This will pull the Orders and write them to your `tiddlers` folder for use in your dashboard. 
- Note that the rclone command is a bit tricky: I tried many combinations of rclone commands in an effort to copy each Order from S3 only *once*. Instead, rclone likes to copy the same Order multiple times. This means we can't edit the Order in our Wiki directly, since rclone will just overwrite our changes. To accommodate this, the dashboard is designed to store Order updates in separate Tiddlers. 
- To trim your data down over time, use an S3 lifecycle policy in AWS. In the dashboard, you can create another script to delete old Order data if you'd like. 

3. Set your rclone script to download new orders periodically. You can set this up by adding a cron flag to a pm2 command for this new process (assuming it's process #1): `pm2 restart 1 --cron "*/3 * * * *"` will check S3 every 3 minutes.

## Updating the dashboard's date

1. The dashboard is set up with two main tabs of Orders: Orders for the current day, and Orders for future days. To get the current date from the server, `dater.sh` will overwrite a tiddler to set the Wiki dashboarrd's date. 

2. To set it up, we want to run `pm2 start dater.sh`, then add cron as before, like `pm2 restart 1 --cron "0 2 * * *"` to update the date at 2am every day. 

## ONCE YOUR SCRIPTS ARE RUNNING, REMEMBER TO RUN PRESERVE THEM WITH PM2

1. Now that all your scripts are set up, save them with `pm2 save`. 

2. Finally, preserve your configuration so your app survives server reboots. Run `pm2 startup.`