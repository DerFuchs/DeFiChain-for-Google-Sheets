<br />
<p align="center">
  <h3 align="center">DeFiChain for Google Sheets</h3>

  <p align="center">
    A Google Apps Script for accessing balances and prices from the DeFiChain (DFI) using it's official APIs
    <br />
    <a href="https://github.com/DerFuchs/DeFiChain-for-Google-Sheets"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/DerFuchs/DeFiChain-for-Google-Sheets/issues">Report Bug</a>
    ·
    <a href="https://github.com/DerFuchs/DeFiChain-for-Google-Sheets/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#about-defichain-for-google-sheets">About DeFiChain for Google Sheets</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a>
        <ul>
            <li>General Blockchain Information</li>
            <li>Address Balance</li>
            <li>Price</li>
            <li>Minted blocks</li>
        </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About DeFiChain for Google Sheets

This adds the ability to insert and update balances and other data from the DeFiChain Blockchain into Google Sheets by requesting data from the official DeFiChain APIs.


<!-- INSTALLATION -->
## Installation

You have to create a custom script in your Google Sheets document

1. In your Sheet document go to "Tools" -> "Script Editor"
1. Choose "Create New Project"   
1. Name it to whatever you want
   "DeFiChain" may be appropriate, so you can find it in the future. This name is completely up to you
1. Copy the content of the file "DeFiChain.gs" from this repository into the Code.gs document
1. Save
1. Return back to your Google Sheet document


<!-- USAGE EXAMPLES -->
## Usage

DeFiChain for Google Sheets provides additional functions you can call in cells.


### General Blockchain Information

Gives you some common information about the blockhain's status

```
=DEFICHAIN_INFO("information_key")
```

possible information_keys:
* block_height 
* difficulty
* median_time
* max_supply
* current_total_supply
* current_circulating_supply
* current_foundation_supply
* current_community_supply


### Address balance
Gives you the current balance of a particular DeFiChain Address.

```
=DEFICHAIN_ADDRESS_BALANCE("DeFiChainAddressYouWantToKnow")
```

### Price
Gives you the current price for one DFI in that particular coin. That price is read from the DeFiChain Decentralized Exchange (DEX).

```
=DEFICHAIN_PRICE("COIN_SYMBOL")
```

possible COIN_SYMBOLs:
* USDT 
* BTC
* ETH
* BCH
* LTC
* DOGE



### Minted blocks from staking collateral address
Gives you the current count of minted blocks of that particular staking collateral.

```
=DEFICHAIN_MINTED_BLOCKS("DeFiChainStakingCollateralAddress")
```

### Update On Premise

You can interactively request an update of the data by adding the name of a cell which can be changed to every function as a second parameter.
Best practice is to insert a checkbox into that particular cell by selecting a cell and then clicking "Insert" --> "Checkbox" from the main menu.
Now you can use that cell as a update reference. Let's assume you inserted that checkbox to Cell A1:

```
=DEFICHAIN_INFO("block_height", $A$1)
```

Now, the cell will update when you check or un-check the box.


### NOTE 

You may have to use a semi-colon (;) instead of comma (,) depending on your language setting in your Google Sheets document. If you get an error, please try using ; instead of ,


### Didn't find what you need?

Feel free to [ask for implementation](https://github.com/DerFuchs/DeFiChain-for-Google-Sheets/issues) or do it by yourself (and make a pull request to let others participate :) ).


<!-- ROADMAP -->
## Roadmap

There may be updates in the future depending on your requests and my personal needs.

See the [open issues](https://github.com/DerFuchs/DeFiChain-for-Google-Sheets/issues) for a list of proposed features (and known issues).


### Recent Version 1.0

First Version. Ability to ask for balances and general blockhain information.


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

Michael Fuchs - derfuchs - michael@derfuchs.net

Project Link: [https://github.com/DerFuchs/DeFiChain-for-Google-Sheets](https://github.com/DerFuchs/DeFiChain-for-Google-Sheets)

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/DerFuchs/DeFiChain-for-Google-Sheets.svg?style=for-the-badge
[contributors-url]: https://github.com/DerFuchs/DeFiChain-for-Google-Sheets/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/DerFuchs/DeFiChain-for-Google-Sheets.svg?style=for-the-badge
[forks-url]: https://github.com/DerFuchs/DeFiChain-for-Google-Sheets/network/members
[stars-shield]: https://img.shields.io/github/stars/DerFuchs/DeFiChain-for-Google-Sheets.svg?style=for-the-badge
[stars-url]: https://github.com/DerFuchs/DeFiChain-for-Google-Sheets/stargazers
[issues-shield]: https://img.shields.io/github/issues/DerFuchs/DeFiChain-for-Google-Sheets.svg?style=for-the-badge
[issues-url]: https://github.com/DerFuchs/DeFiChain-for-Google-Sheets/issues
[license-shield]: https://img.shields.io/github/license/DerFuchs/DeFiChain-for-Google-Sheets.svg?style=for-the-badge
[license-url]: https://github.com/DerFuchs/DeFiChain-for-Google-Sheets/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/derfuchs/
