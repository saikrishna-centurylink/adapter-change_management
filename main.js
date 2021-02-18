
/**
 * @function get
 * @description Call the ServiceNow GET API.
 *
 * @param {string} serviceNowTable - The table target of the ServiceNow table API.
 * @param {iapCallback} callback - Callback a function.
 * @param {*} callback.data - The API's response. Will be an object if sunnyday path.
 *   Will be HTML text if hibernating instance.
 * @param {error} callback.error - The error property of callback.
 */
function get(serviceNowTable, callback) {

  // Initialize return arguments for callback
  let callbackData = null;
  let callbackError = null;

  // Construct API call to send to ServiceNow.
  // The request constructor has an options parameter
  // that holds the HTTP request method, credentials, and the API's URL.
  // Some properties are hardcoded, like the method and part of the URI.
  // Some properties are read from global const options.
  // Some properties are passed into function get() through parameters.
  const requestOptions = {
    method: 'GET',
    auth: {
      user: options.username,
      pass: options.password,
    },
    baseUrl: options.url,
    uri: `/api/now/table/${serviceNowTable}?sysparm_limit=1`,
  };

  // Send Request to ServiceNow.
  // We are passing variable requestOptions for the first argument.
  // We are passing an anonymous function, an error-first callback,
  // for the second argument.
  request(requestOptions, (error, response, body) => {
    /**
     * Process ServiceNow error, response and body.
     * Check error and response code to make sure
     * response is good.
     */
    if (error) {
      console.error('Error present.');
      callbackError = error;
    } else if (!validResponseRegex.test(response.statusCode)) {
      console.error('Bad response code.');
      callbackError = response;
    } else if (response.body.includes('Instance Hibernating page')) {
      callbackError = 'Service Now instance is hibernating';
      console.error(callbackError);
    } else {
      callbackData = response;
    }
    return callback(callbackData, callbackError);
  });

}


// This test function calls your request and logs any errors.
function main() {
  // Call function get().
  // We are passing a static argument for parameter serviceNowTable.
  // We are passing an anonymous function argument, a data-first callback,
  // for parameter callback.
  get('change_request', (data, error) => {
    if (error) {
      console.error(`\nError returned from GET request:\n${JSON.stringify(error)}`);
    }
    console.log(`\nResponse returned from GET request:\n${JSON.stringify(data)}`)
  });
}

// Call main to run it.
main();