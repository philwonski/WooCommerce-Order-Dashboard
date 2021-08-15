let rawtitle = event.headers["subject"];
let title = encodeURI(rawtitle);

let order = title.replace("New%20Order%20", "");

return await require("@pipedreamhq/platform").axios(this, {
  url: `https://${auths.woocommerce.url}/wp-json/wc/v2/orders`,
  auth: {
    username: `${auths.woocommerce.key}`,
    password: `${auths.woocommerce.secret}`,
  },
  order: order,
})  