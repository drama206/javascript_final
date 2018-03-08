/*
testing area for javascript functions
var OptionPrice = [
    250.00,
    50.00,
    30.00,
    200.00,
    100.00,
    500.00
];
*/
var fltBase = 0.0;
var fltTaxRate = 0.095;
/*
function orderSummary()
purpose:		recalculate the current order information
parameters:		none
*/
function orderSummary() {
    var intSize = 0;
    var intCrust = 0;
    var intTopping = 0;
    var intSpecialty = 0;
    var fltTax = 0;
    var fltTotal = 0;
    var fltSub = fltBase;
    var intOptionCount = 0;
    var strPizza = "Order Summary:<br /><br />";
    var strSummary = "";
    var strPriceSum = "";
    var intWhichSpec = 0;
    // check to see which size is selected
    for (var i = 0; i < document.forms[0].rdoSize.length; i++) {
        if (document.forms[0].rdoSize[i].checked) {
            intSize = i;
        }
    }
    // set the DHTML display to include the pizza crust type
    switch(intSize) {
        case 0:
          strPizza = strPizza + '12" ';
          fltSub = 6.95;
          break;
        case 1:
          strPizza = strPizza + '16" ';
          fltSub = 9.95;
          break;
        case 2:
          strPizza = strPizza + '20" ';
          fltSub = 12.95;
          break;
    }
    // check to see which crust type is chosen
    for (var i = 0; i < document.forms[0].rdoCrust.length; i++) {
        if (document.forms[0].rdoCrust[i].checked) {
            intCrust = i;
        }
    }
    // set the DHTML display to include the crust type
    switch(intCrust) {
        case 0:
          strPizza = strPizza + "Hand-tossed <br /><br />";
          break;
        case 1:
          strPizza = strPizza + "Deep dish <br /><br />";
          fltSub += 1;
          break;
    }
    // check to see which toppings 
    for (var i = 0; i < document.forms[0].chkOption.length; i++) {
        if (document.forms[0].chkOption[i].checked) {
            intTopping = i;
            fltSub += 0.75;
                // set the DHTML display to include the toppings chosen
            switch(intTopping) {
                case 0:
                  strPizza += "&nbsp;&nbsp;Pineapple<br/>";
                  break;
                case 1:
                  strPizza += "&nbsp;&nbsp;Canadian Bacon<br/>";
                  break;
                case 2:
                  strPizza += "&nbsp;&nbsp;Pepperoni<br/>";
                  break;
                case 3:
                  strPizza += "&nbsp;&nbsp;Chicken<br/>";
                  break;
                case 4:
                  strPizza += "&nbsp;&nbsp;Sausage<br/>";
                  break;
                case 5:
                  strPizza += "&nbsp;&nbsp;Tomatoes<br/>";
                  break;
            }            
        }
    }
    // check to see which specialty pizza is selected
    for (var i = 0; i < document.forms[0].rdoSpecialty.length; i++) {
        if (document.forms[0].rdoSpecialty[i].checked) {
            intSpecialty = i;
            switch(intSpecialty) {
                case 0:
                  strPizza = strPizza + '<br />Hawaiian, which includes:<br /><br />&nbsp;&nbsp;Pineapples<br />&nbsp;&nbsp;Canadian Bacon<br />';
                  fltSub += 1.5;
                  document.getElementById("logo").src="graphics/hawaiian.png";
                  break;
                case 1:
                  strPizza = strPizza + '<br />Veggie, which includes:<br /><br />&nbsp;&nbsp;Pineapple<br />&nbsp;&nbsp;Tomatoes<br />';
                  fltSub += 1.5;
                  document.getElementById("logo").src="graphics/veggie.png";
                  break;
                case 2:
                  strPizza = strPizza + '<br />Meat Lovers, which includes:<br /><br />&nbsp;&nbsp;Canadian Bacon<br />&nbsp;&nbsp;Pepperoni<br />&nbsp;&nbsp;Chicken<br />&nbsp;&nbsp;Sausage<br />';
                  fltSub += 3;
                  document.getElementById("logo").src="graphics/meat.png";
                  break;
            }
        }
    }
    // set the DHTML display to include the pizza crust type
    fltSub = fltSub.toFixed(2);
    fltTax = fltSub * fltTaxRate;
    fltTax = fltTax.toFixed(2);
    fltTotal = parseFloat(fltSub) + parseFloat(fltTax);

    fltTotal = parseFloat(fltTotal);
    fltTotal = fltTotal.toFixed(2);

    SetCookie("strPizza", strPizza);
    SetCookie("fltSub", fltSub);
    SetCookie("fltTax", fltTax);
    SetCookie("fltTotal", fltTotal);

    strSummary = strPizza;

    strPriceSum = "<table> <tr><td>Subtotal:</td> <td align='right'>$" + fltSub + "</td></tr><tr><td>" + "Tax:</td> <td align='right' style='border-bottom-color: White; border-bottom-width: 1px; border-bottom-style: solid;'>" + fltTax + "</td></tr><tr> <td>Total:</td> <td align='right'>$" + fltTotal + "</td></tr></table>"

    document.getElementById("orderSum").innerHTML = strSummary;
    document.getElementById("priceSum").innerHTML = strPriceSum;

    return true;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/*
function changeOption()
purpose:		Make the options visible to user
parameters:		none
*/
function changeOption() {    
	document.getElementById("options").style.visibility = "visible";    
    for (var i = 0; i < document.forms[0].rdoSpecialty.length; i++) {
        document.forms[0].rdoSpecialty[i].checked=false;
        document.getElementById("logo").src="graphics/logo.png";
    }
    
	// uncheck and enable
	for (var i = 0; i < document.forms[0].chkOption.length; i++) {
		//document.forms[0].chkOption[i].checked = true;            
		document.forms[0].chkOption[i].disabled = false;       
	}	
	orderSummary();	    
}
/*
function hideOption()
purpose:		Make the options invisible to user
parameters:		none
*/
function hideOption() {
	document.getElementById("optionEnabled").checked=false;
    
	// uncheck and disable
	for (var i = 0; i < document.forms[0].chkOption.length; i++) {
		document.forms[0].chkOption[i].checked = false;
		document.forms[0].chkOption[i].disabled = true;        
	}
	orderSummary();    
}
/*
function ckform(formIndex)
purpose:		verify that required fields are completed
parameters:		formIndex as an integer, representing the form number within the page				
*/
function ckform(formIndex) {
	// identifed txtFName as the field 15 of the form
	var intStartCheck = 15;	
	var intNumFields = document.forms[formIndex].elements.length;
	var strCustomer = "";
	
	for (var i = intStartCheck; i < intNumFields; i++) {
		if (document.forms[formIndex].elements[i].name != "txtApartment") {
			if (document.forms[formIndex].elements[i].value == "") {
				document.getElementById(document.forms[formIndex].elements[i].name).innerHTML = "<span style='color:yellow'>Required Field</span>";
				document.forms[formIndex].elements[i].focus();
				return false;
			}
			strCustomer += document.forms[formIndex].elements[i].value + " ";
			if (document.forms[formIndex].elements[i].name != "txtFName") {
				strCustomer += "<br />";
			}
		}
    }	
	orderSummary();
	// remove the value of the submit button from the string
	strCustomer = strCustomer.slice(0, (strCustomer.length - 23));	
	SetCookie("Customer", strCustomer);		
	SetCookie("custFName", document.forms[0].txtFName.value);
	SetCookie("custLName", document.forms[0].txtLName.value);	
	return true;
}
/*
function clearThis()
purpose:        dynamically clears the "Required Field" text string per input field once user enters 
                input requirements in compliance with input field's static labels
parameters:     none
*/
function clearThis() {	
	var formIndex = 0;
	var intStartCheck = 0;
	var intNumFields = document.forms[formIndex].elements.length - 1;	
	for (var i = intStartCheck; i < intNumFields; i++) {
		if (document.forms[formIndex].elements[i].name != "txtApartment") {
			document.getElementById(document.forms[formIndex].elements[i].name).innerHTML = "";
		}
	}	
	return true;
}
/* ----------------------------------------------
function replaceString(stringValue)
purpose:		replaces special HTML characters in cookie values
parameters:		stringValue as string, the value to be encoded
notes:			can be used for more than cookies
---------------------------------------------- */
function replaceString(stringValue) {
	newString = stringValue;	
	/*newString = newString.replace('"','&quot;');
	newString = newString.replace("'", '&apos;');
	newString = newString.replace("–", '&ndash;');
	newString = newString.replace("—", '&mdash;');
	newString = newString.replace("¡", '&iexcl;');
	newString = newString.replace("¿", '&iquest;');
	newString = newString.replace("“", '&ldquo;');
	newString = newString.replace("”", '&rdquo;');
	newString = newString.replace("‘", '&lsquo;');
	newString = newString.replace("’", '&rsquo;');
	newString = newString.replace("«", '&laquo;');
	newString = newString.replace("»", '&raquo;');
	newString = newString.replace(" ", '&nbsp;');
	newString = newString.replace("&", '&amp;');
	newString = newString.replace("¢", '&cent;');
	newString = newString.replace("©", '&copy;');
	newString = newString.replace("÷", '&divide;');
	newString = newString.replace(">", '&gt;');
	newString = newString.replace("<", '&lt;');
	newString = newString.replace("<", '&lt;');*/
	return newString;
}
/* ----------------------------------------------
function writePizzaCookies(){
purpose:	writes the pizza information cookies 
author:	
parameters:		none
---------------------------------------------- */
function writePizzaCookies() {
	SetCookie("pizzaDesc", document.getElementById("orderSum").innerHTML);
	SetCookie("priceSum", document.getElementById("priceSum").innerHTML);
	window.location.href = "custInfo.html";	
	return true;
}
/* ----------------------------------------------
function chForm(){
purpose:	checks the customer information form for complete and correct information
author:	
parameters:		none
---------------------------------------------- */
function chForm() {
	var intNumFields = document.forms[0].elements.length;	
	var emailExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var zipExp = /\d{5}/;
    var phoneExp = /^\d{3}-\d{3}-\d{4}$/;		
	// check that values have been entered into required fields
	for (var i = 0; i < intNumFields; i++) {
		if (document.forms[0].elements[i].name != "txtApartment") {
			if (document.forms[0].elements[i].value.length == 0) {
				document.getElementById(document.forms[0].elements[i].name).innerHTML = "Required Field";
				document.forms[0].elements[i].focus();
				document.forms[0].elements[i].select();
				return false;
			}
		}
	}		
    if (!phoneExp.test(document.forms[0].txtPhone.value)) {
        document.getElementById("txtPhone").innerHTML = "Please enter a valid phone number";
        document.forms[0].txtPhone.focus();
        document.forms[0].txtPhone.select();
        return false;
    }    
    if (!emailExp.test(document.forms[0].txtEmail.value)) {
		document.getElementById("txtEmail").innerHTML = "Please enter a valid email address";
		document.forms[0].txtEmail.focus();
		document.forms[0].txtEmail.select();
		return false;
	}    
    if (!zipExp.test(document.forms[0].txtZipcode.value)) {
        document.getElementById("txtZipcode").innerHTML = "Please enter a valid zip code";
        document.forms[0].txtZipcode.focus();
        document.forms[0].txtZipcode.select();
        return false;
    }    
	// customer order information is correct write cookie for customer information
	writeCustCookie();	
	return true;
}
/* ----------------------------------------------
function writeCustCookie(){
purpose:	Writes the customer informstion cookies
author:	
parameters:		none
---------------------------------------------- */
function writeCustCookie() {
	var strCustName = document.forms[0].txtFName.value + " " + document.forms[0].txtLName.value;	
	SetCookie("custName", document.forms[0].txtFName.value + " " + document.forms[0].txtLName.value);
	SetCookie("custAddress", document.forms[0].txtAddress.value + " " + document.forms[0].txtApartment.value);
	SetCookie("custCity", document.forms[0].txtCity.value + ", " + document.forms[0].txtState.value + " " + document.forms[0].txtZipcode.value);
	SetCookie("custEmail", document.forms[0].txtEmail.value);
	SetCookie("custPhone", document.forms[0].txtPhone.value);
	return true;
}
/*
var milisec=0;
var seconds=60;
var minutes=29;
*/
/* ----------------------------------------------
function secondPassed(){
purpose:	Count down clock for delivery
author:	
parameters:		none
---------------------------------------------- */ 
// 1800 seconds in 30 minutes
//var seconds = 30*24*3600;
// seconds set at 20 for testing
//var seconds = 20;
var seconds = 1800;
function secondPassed() {
// Calculate the number of days left
    var days=Math.floor(seconds / 86400); 
// After deducting the days calculate the number of hours left
    var hours = Math.floor((seconds - (days * 86400 ))/3600)
// After days and hours , how many minutes are left 
    var minutes = Math.floor((seconds - (days * 86400 ) - (hours *3600 ))/60)
// Finally how many seconds left after removing days, hours and minutes. 
   var secs = Math.floor((seconds - (days * 86400 ) - (hours *3600 ) - (minutes*60)))   
   var x = minutes + ":" + secs + " minutes";
   document.getElementById('countdown').innerHTML = x.toString();   
	// create an alternate display if pizza has not arrived
	if (seconds == 0) {
   	    clearInterval(countdownTimer);
        document.getElementById('countdown').innerHTML = "Please call us if your pizza hasn't arrived yet!";
    }
	else {
   	    seconds--;
    }	
	return true;	
} 
var countdownTimer = setInterval('secondPassed()', 1000);