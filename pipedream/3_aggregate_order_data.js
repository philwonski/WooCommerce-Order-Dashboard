
// pull the key data points from the WooCommerce API response
let rawphone = steps.woocommerce.$return_value[0].billing.phone;
let day = steps.woocommerce.$return_value[0].meta_data[2].value;
let time = steps.woocommerce.$return_value[0].meta_data[3].value;

// quick and dirty fix of various phone # formats, bc frontend validation was a pain
// note that Twilio requires strict phone # formatting. Valid Ex: +12018675309
let fixphone0 = rawphone.replace("+1", "");
let fixphone1 = fixphone0.replace("(", "");
let fixphone2 = fixphone1.replace(")", "");
let fixphone3 = fixphone2.replace(".", "");
let fixphone4 = fixphone3.replace(".", "");
let fixphone5 = fixphone4.replace(" ", "");
let fixphone6 = fixphone5.replace(" ", "");
let fixphone7 = fixphone6.replace("-", "");
let fixphone8 = fixphone7.replace("-", "");
let phone = '+1' + fixphone8;

// to help clerk identify order, pick off first item and tell us if there's other stuff
let firstitem = steps.woocommerce.$return_value[0].line_items[0].name;
let firstitemq = steps.woocommerce.$return_value[0].line_items[0].quantity;
let first = firstitem + ' (x' + firstitemq + ')';
let countsecond = steps.woocommerce.$return_value[0].line_items;
let second = countsecond.length;

// make some changes to the email html for display tweaks
let html = event.html; /*a string*/
let fulltext = encodeURI(html); /*also a string*/
let text1 = fulltext.replace("%3C!DOCTYPE%20html%3E", "");
let text2 = text1.replace("id=%22header_wrapper%22%20style=%22padding:%2036px%2048px;%20display:%20block","id=%22header_wrapper%22%20style=%22padding:%2036px%2048px;%20display:%20none")
let text3 = text2.replace("template_header%22%20style='", "template_header%22%20style='display:none;");
let text4 = text3.replace("style=%22padding:%2048px%2048px%2032px", "style=%22padding:%200px%200px%200px");
let text5 = text4.replace("p%20style=%22margin:%200%200%2016px;%22%3EYou", "p%20style=%22display:none;margin:%200%200%2016px;%22%3EYou");
let text = text5.replace(/1px%20solid/g,"0px%20solid");

//pull out the address in case I need it later
var address = text.substring(
    text.lastIndexOf("A%3Ctable%20id=%22addresses") + 1, 
    text.lastIndexOf("%3Cp%20style=%22margin:%200%200%2016px;%22%3ECongratulations%20on%20the%20sale.")
);

//parse the email to pull out pickup or delivery deets
let pickship = text.substring(
    text.lastIndexOf("%3EShipping:%3C/th%3") + 1, 
    text.lastIndexOf("%3C/td%3E%0A%09%09%09%09%09%3C/tr%3E%0A%09%09%09%09%09%09%09%09%09%09%3Ctr%3E%0A%09%09%09%09%09%09%3Cth%20class=%22td%22%20scope=%22row%22%20colspan=%222%22%20style=%22color:%20#636363;%20border:%200px%20solid%20#e5e5e5;%20vertical-align:%20middle;%20padding:%2012px;%20text-align:%20left;%22%3ETax:")
);

//get ordernum (I could have also carried this var from earlier pipedream step)
let rawtitle = event.headers["subject"];
let title = encodeURI(rawtitle);
let ordernum = title.replace("New%20Order%20", "");

//times of day are harder to sort in dashboard frontend, so assigning weights here 
if (time == '8:30am') {
  weight = "10";
} else if (time == '9:00am') {
  weight = "11";
} else if (time == '9:30am') {
  weight = "12";
} else if (time == '10:00am') {
  weight = "13";
} else if (time == '10:30am') {
  weight = "14";
} else if (time == '11:00am') {
  weight = "15";
} else if (time == '11:30am') {
  weight = "16";
} else if (time == '12:00pm') {
  weight = "17";
} else if (time == '12:30pm') {
  weight = "18";
} else if (time == '1:00pm') {
  weight = "19";
} else if (time == '1:30pm') {
  weight = "20";
} else if (time == '2:00pm') {
  weight = "21";
} else if (time == '2:30pm') {
  weight = "22";
} else if (time == '3:00pm') {
  weight = "23";
} else if (time == '3:30pm') {
  weight = "24";
} else if (time == '4:00pm') {
  weight = "25";
} else if (time == '4:30pm') {
  weight = "26";
} else if (time == '5:00pm') {
  weight = "27";
} else if (time == '5:30pm') {
  weight = "28";
} else if (time == '6:00pm') {
  weight = "29";
} else if (time == '6:30pm') {
  weight = "30";
} else if (time == '7:00pm') {
  weight = "31";
} else if (time == '7:30pm') {
  weight = "32";
} else {
  weight = "0";
};

// take all the fun vars I assigned and make a JSON "table" out of them
let plainjson = { "title" : title, "text" : text, "address" : address, "phone" : phone, "day" : day, "time" : time, "first" : first, "second" : second, "weight" : weight, "caption" : ordernum, "pickship" : pickship };

// make sure my json is typed 
let myjson = JSON.stringify(plainjson);

// if you see uri-encoded address in console everything else prob worked 
console.log(address);

//return that json object we made, bc we need it for our tiddlywiki dashboard
return myjson