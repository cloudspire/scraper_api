## Synopsis

This application exposes a scraper API for applications to request raw html content from 3rd party sites.

## Quick Start

To start the server, open a command line interface, navigate to the project folder, then type 'npm start'.
To test the server, open the following link in Chrome: http://localhost:3000/scrape?to_url=google.com&https=true

## API Parameters

The API allows you to pass the below parameters to GET requests in order to configure requests dynamically. 

FORMAT: http://localhost:<port>/scrape?to_url=<link url>&https=<true/false>&iso_body=<true/false>&remove_origin=<true/false>&prep_html=<true/false>

1. to_url (required): link you are wanting to scrape (please remove 'http://', 'https://' and instead use 'https' parameter)
2. https (optional): set to true if site requires https, leave blank or set to false if http is allowed
3. iso_body (optional): only returns html body
4. remove_origin (optional): remove references to 3rd party links (scripts, styles, iframes, etc); use this if you are injecting the html into another page.
5. prep_html (optional): changes html container tags (<html>, <head>, <body>) into injectable tags (<html_scraper>, etc); use this if you are injecting the html into another page.