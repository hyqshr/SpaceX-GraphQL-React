const hasHTMLTags = (str:string) => {
    const regex = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/gi
    return regex.test(str);
  }

  const hasSQLInjection = (str:string) => {
    const regex = /^(SELECT|UPDATE|DELETE|TRUNCATE)\s+\*\s+FROM\s+\w+\s*$/i;
    return regex.test(str);
  }
  
  const hasCreditCard = (str:string) => {
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    var isValid = false;
  
    if (visaRegEx.test(str)) {
      isValid = true;
    } else if(mastercardRegEx.test(str)) {
      isValid = true;
    } else if(amexpRegEx.test(str)) {
      isValid = true;
    } else if(discovRegEx.test(str)) {
      isValid = true;
    }
    return isValid;
  }

  export const validateInput = (input: string, field: string) => {
    if (hasHTMLTags(input)) return `${field} must not contain HTML tags`;
    if (hasCreditCard(input)) return `${field} must not contain a credit card number`;
    if (hasSQLInjection(input)) return `${field} must not contain a SQL statement`;
    return true;
  }