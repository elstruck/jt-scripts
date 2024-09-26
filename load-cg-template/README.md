# load-cg-template

## Author
Elliott Wittstruck

## Date
09-25-2024

## Overview
This script is designed to find Cost Group data in a database, transform it into the desired API format, and load it into a Job Budget.

## Usage
1. getcostgroup.js needs to be run first to get the Cost Group data from the database. This script can be run as an API script. 
2. Run the transform script to transform the data into the desired API format, which is a javascript function. Can be run in Zapier javascript code.
3. Run the load script to load the data into a Job Budget. This script can be run as an API script. 

## Notes
- The script assumes that you know the cost group id.
