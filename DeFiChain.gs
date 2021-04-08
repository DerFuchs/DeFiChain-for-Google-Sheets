/**
 * Get data from the DeFiChain Blockchain
 * 
 * @author Michael Fuchs - derfuchs <michael@derfuchs.net>
 */

/**
 * Some config values for convenient access.
 */
const config = {  
  "apiUrls": {
    "general": "https://api.defichain.io/v1/",
    "mainnet": "http://mainnet-api.defichain.io/api/DFI/mainnet/",
  },
  "fractions": 100000000, // parts in which 1 DFI can be split up, similar to BTC <-> Satoshis
  "cachingTime": 10 // in Minutes
};

// -----------------------------------------------------------

/**
 * Calculate whole DFI from fractional number
 * ... which is a fancy term for dividing it by 100 mio.
 * 
 * @param {number} amount The Amount of DFI fractions to be converted to whole DFI
 */
function fractionsToDfi(amount)
{
  return parseFloat(amount) / config.fractions
}

// -----------------------------------------------------------

/**
 * Send a request to one of the DeFiChain APIs and store the result in the cache.
 * 
 * @param {"/resource/path"} resource Something like "address/8RUNjYgCHkT56t4C38YaaDvUQcY4HozdcD/balance"
 * @param {"general | mainnet"} apiType There are multiple DeFiChain-APIs for different purpose. Have a look at https://defichain-wiki.com/wiki/API.
 * @return Parsed JSON data as an object
 */
function callDefiChainApi(resource, apiType = "mainnet")
{
  url = config.apiUrls[apiType] + resource

  // fetch data
  try {

    // initialize some stuff
    var data = {};
    const CACHE_KEY = "DEFICHAIN__" + MD5(url)
    var cache = CacheService.getUserCache()

    // first check if there's a cached version available
    var cached = cache.get(CACHE_KEY);
    if (cached && cached != null && cached.length > 1) {
      data = JSON.parse(cached)
    }

    // else, fetch it from API and cache it
    else {
      // send request
      var response = UrlFetchApp.fetch(url, {muteHttpExceptions: true, validateHttpsCertificates: true})
      data = JSON.parse(response.getContentText())
    
      // if request response is valid, store it in the cache
      if (response && response.getResponseCode() == 200 && data.length > 1 && data.length < 99900) {
        cache.put(CACHE_KEY, response.getContentText(), config.cachingTime)
      }
    }
    // return the data
    return data
  }
  catch (e) {    
    throw new Error(e.message)
  }
}

// -----------------------------------------------------------

/**
 * Returns the current balance of a DeFiChain address in DFI
 *
 * @param {"DFI_ADDRESS"} address Something like "8RUNjYgCHkT56t4C38YaaDvUQcY4HozdcD"
 * @param {"Empty cell reference"} refresh_cell ONLY on 2nd argument. Reference an empty cell and change its content to force refresh the rates. 
 * @return The current balance of this particular address. Will return 0 even if address does not exist.
 * @customfunction
 */
function DEFICHAIN_ADDRESS_BALANCE(address, refresh_cell) 
{

  // sanitize input
  address = (address + "") || "";
 
  try {    
    data = callDefiChainApi("/address/" + address + "/balance")
    return fractionsToDfi(data["balance"])    
  }
  catch (e) {    
    throw new Error(e.message)
  }
}

// -----------------------------------------------------------

/**
 * Returns the current balance of a DeFiChain address in DFI
 *
 * @param {"block_height | difficulty | median_time | max_supply | current_total_supply | current_circulating_supply | current_foundation_supply | current_community_supply"} name
 * @param {"Empty cell reference"} refresh_cell ONLY on 2nd argument. Reference an empty cell and change its content to force refresh the rates. 
 * @return the requested data key from DeFiChain's info endpoint from it's general API
 * @customfunction
 */
function DEFICHAIN_INFO(name, refresh_cell) 
{

  // sanitize input
  name = (name + "") || "";
  try { 
    // some stuff
    const data = callDefiChainApi("stats", "general")
    var result = null

    switch (name) {
      case "block_height":
        result = data.blockHeight 
        break;

      case "difficulty":
        result = data.difficulty 
        break;

      case "median_time": 
        result = data.medianTime
        break;

      case "max_supply":
        result = data.tokens.max
        break;

      case "current_total_supply":
        result = data.supply.total
        break;

      case "current_circulating_supply":
        result = data.supply.circilation
        break;

      case "current_foundation_supply":
        result = data.supply.foundation
        break;

      case "current_community_supply":
        result = data.supply.community
        break;

    }
    return result;
  }
  catch (e) {    
    throw new Error(e.message)
  }    
}

// -----------------------------------------------------------

/**
 * Returns the current price for one DFI in that particular coin
 *
 * @param {"USDT | BTC | ETH | BCH | LTC | DOGE"} coin Symbol of a supported coin
 * @param {"Empty cell reference"} refresh_cell ONLY on 2nd argument. Reference an empty cell and change its content to force refresh the rates. 
 * @return The current price for one DFI in that particular coin
 * @customfunction
 */
function DEFICHAIN_PRICE(coinSymbol, refresh_cell)
{
  // sanitize input
  coinSymbol = (coinSymbol + "") || "";

  try {    
    const data = callDefiChainApi("listswaps", "general")
    const pair = coinSymbol.toUpperCase() + "_DFI" 

    if (!(pair in data)) {
      throw new Error("Unknown coin '" + coinSymbol + "'")
    }   

    return 1 / data[pair].last_price  
  }
  catch (e) {    
    throw new Error(e.message)
  }
}


// -----------------------------------------------------------

/**
 * https://gist.github.com/KEINOS/78cc23f37e55e848905fc4224483763d
 * 
 * ------------------------------------------
 *   MD5 function for GAS(GoogleAppsScript)
 *
 * You can get a MD5 hash value and even a 4digit short Hash value of a string.
 * ------------------------------------------
 * Usage1:
 *   `=MD5("YourStringToHash")`
 *     or
 *   `=MD5( A1 )` with the same string at A1 cell
 *   result:
 *     `FCE7453B7462D9DE0C56AFCCFB756193`.
 *     For your sure-ness you can verify it in your terminal as below.
 *     `$ md5 -s "YourStringToHash"`
 * Usage2:
 *   `=MD5("YourStringToHash", true)` for short Hash
 *    result:
 *     `6MQH`
 *     Note that it has more conflict probability.
 *
 * How to install:
 *   Copy the scipt, pase it at [Tools]-[Script Editor]-[<YourProject>]
 *   or go https://script.google.com and paste it.
 *   For more details go:
 *     https://developers.google.com/apps-script/articles/
 * Latest version:
 *   https://gist.github.com/dotysan/36b99217fdc958465b62f84f66903f07
 * Author/Collaborator/Contributor:
 *   KEINOS @ https://github.com/keinos
 *   Alex Ivanov @ https://github.com/contributorpw
 +   Curtis Doty @ https://github.com/dotysan
 * Reference and thanks to:
 *   https://stackoverflow.com/questions/7994410/hash-of-a-cell-text-in-google-spreadsheet
 *   https://gist.github.com/KEINOS/78cc23f37e55e848905fc4224483763d#gistcomment-3129967
 *   https://gist.github.com/dotysan/36b99217fdc958465b62f84f66903f07
 *   https://developers.google.com/apps-script/reference/utilities/utilities#computedigestalgorithm-value
 *   https://cloud.google.com/dataprep/docs/html/Logical-Operators_57344671
 * ------------------------------------------
 *
 * @param {(string|Bytes[])} input The value to hash.
 * @param {boolean} isShortMode Set true for 4 digit shortend hash, else returns usual MD5 hash.
 * @return {string} The hashed input
 * @customfunction
 *
 */
function MD5( input, isShortMode )
{
    var isShortMode = !!isShortMode; // Be sure to be bool
    var txtHash = '';
    var rawHash = Utilities.computeDigest(
                      Utilities.DigestAlgorithm.MD5,
                      input );
 
    if ( ! isShortMode ) {
        for ( i = 0; i < rawHash.length; i++ ) {

            var hashVal = rawHash[i];

            if ( hashVal < 0 ) {
                hashVal += 256;
            };
            if ( hashVal.toString( 16 ).length == 1 ) {
                txtHash += '0';
            };
            txtHash += hashVal.toString( 16 );
        };
    } else {
        for ( j = 0; j < 16; j += 8 ) {

            hashVal = ( rawHash[j]   + rawHash[j+1] + rawHash[j+2] + rawHash[j+3] )
                    ^ ( rawHash[j+4] + rawHash[j+5] + rawHash[j+6] + rawHash[j+7] );

            if ( hashVal < 0 ) {
                hashVal += 1024;
            };
            if ( hashVal.toString( 36 ).length == 1 ) {
                txtHash += "0";
            };

            txtHash += hashVal.toString( 36 );
        };
    };

    // change below to "txtHash.toUpperCase()" if needed
    return txtHash;
}
// -----------------------------------------------------------
// -----------------------------------------------------------
