# project-swat

## Overview

This project contains a WIP demo of the Synthetic Web Application Tester (SWAT) demo.

The purpose of this repo is to provide a POC example of a containerized nodejs app which leverages the headless chrome web browser to capture a screenshot and HAR file archive for a user inputed website value

## Requirements

You will need to have a functioning Docker install on your environment

## Building

Clone this project locally

Navigate into the repo and run the following:

```
make build
```

This will build and tag a local docker image for `project-swat:latest`

## Running

Once you've completed the build, simply run the following

```
./run.sh www.example.com
```

This will run the container and pass in `www.example.com` as a target website to capture data from. Once this complete you'll find the following in this directory:
* `www.example.com.png` - screen shot of the website
* `www.example.com.har` - har file containing the load times of all resources

# Author

Author: Josh Bradley <josh.bradley@gmail.com>
