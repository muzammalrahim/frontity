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
            {
              name: 'Home',
              link: '/',
            },
            {
              name: 'Health Insurance',
              link: '/category/health-insurance/',
              submenu: [
                {
                  name: 'Dental',
                  link: '/category/health-insurance/dental/'
                },
                {
                  name: 'Disability',
                  link: '/category/health-insurance/disability/'
                },
                {
                  name: 'Medicaid',
                  link: '/category/health-insurance/medicaid/'
                },
                {
                  name: 'medicare',
                  link: '/category/health-insurance/medicare/'
                }
              ]
            },
         
			      {
              name: 'Money and Finance',
              link: '/category/senior-resources/money-and-finance/',
              submenu: [
                {
                  name: 'Real Estate Investment Trusts',
                  link: '/category/finance/real-estate-investment-trusts/'
                },
                {
                  name: 'Dividend Paying Stocks',
                  link: '/category/finance/dividend-paying-stocks/'
                },
                {
                  name: 'Cryptocurrency Investments',
                  link: '/category/finance/cryptocurrency-investments/'
                },
                {
                  name: 'Loans and Credit Lines',
                  link: '/category/finance/lending-options/'
                },
                {
                  name: 'Reverse Mortgage',
                  link: '/category/finance/reverse-mortgage/'
                },
                {
                  name: 'Municipal Bonds',
                  link: '/category/finance/municipal-bonds/'
                },
                {
                  name: 'Credit Card',
                  link: '/category/finance/credit-cards/'
                },
                {
                  name: 'Roth IRA',
                  link: '/category/finance/roth-ira/'
                },
                {
                  name: 'SEP IRA',
                  link: '/category/finance/sep-ira/'
                },
                {
                  name: 'Annuities',
                  link: '/category/finance/annuities/'
                },
              
              ]
            },
			      {
              name: 'Senior Resources',
              link: '/category/senior-resources/',
              submenu: [
                {
                  name: 'Alzheimers Resources',
                  link: '/category/senior-resources/alzheimers-resources/'
                },
                {
                  name: 'Social Security',
                  link: '/category/senior-resources/social-security/'
                },
                {
                  name: 'Aarp',
                  link: '/category/senior-resources/aarp/'
                }
              ]
            },
			      {
              name: 'Retirement',
              link: '/category/retirement/',
              submenu: [
                {
                  name: 'Retirement Planning',
                  link: '/category/retirement/retirement-planning/'
                },
              
              ]
            },
            {
              name: 'Coronavirus News',
              link: '/category/coronavirus/',
            
            }
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
