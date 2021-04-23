const settings = {
  "name": "frontity-wp",
  "state": {
    "frontity": {
      "url": "https://seniorresourcehub.com/",
      "title": "Senior Resource Hub",
      "description": "WordPress installation for Frontity development"
    }
  },
  "packages": [
    {
      "name": "@frontity/frontity-chakra-theme",
      "state": {
        "theme": {
          logo: "https://seniorresourcehub.com/wp-content/uploads/2021/02/SRH_logo_small.png" ,
          "menu": [
            [
              "Home",
              "/"
            ],
            [
              "Health Insurance",
              "/category/health-insurance/"
            ],
            [
              "Money and Finance",
              "/category/senior-resources/money-and-finance/"
            ],
            [
              "Senior Resources",
              "/category/senior-resources/",
              
            ],
            [
              "Retirement",
              "/category/retirement/"
            ],
            [
              "Coronavirus News",
              "/category/coronavirus/"
            ]
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://seniorresourcehub.com/"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
