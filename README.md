# Meemoo - React components

## Synopsis

This repository contains the AVO React components to be consumed by the end user and admin applications.

## Technical

|Role              | Handle / username|
| -------------    |--------------|
|Principal/Owner   | Bart Debunne <bart.debunne@viaa.be>  |
|Lead Developer    | Enzo Eghermanne <enzo.eghermanne@studiohyperdrive.be> |
|Lead Developer    | Bert Verhelst <bert.verhelst@studiohyperdrive.be> |
|Developer         | Benjamin Naesen <benjamin.naesen@studiohyperdrive.be> |

**Code Review:**

## Functional

The avo components app will provide the following:
* Re-usable React components, published on registry under @viaa/components

## Server

N/A

## Stack

React w/ Storybook

## Logging and monitoring

N/A

## Deployment/Installation

## Deploy

Steps to deploy:
* update package.json version to match release branch version
* merge release branch into master
* add tag on master + push the tag (format: v1.1.1)
* goto jenkins to start a build or wait up to 20 minutes for an automatic build
    * only available on the viaa vpn
    * https://jenkins-ci-cd.apps.do-prd-okp-m0.do.viaa.be/securityRealm/commenceLogin?from=%2Fjob%2Fci-cd%2F
    * password in 1password (VIAA jenkins login)
    * go to ci-cd
    * click on ci-cd/avo2-components-dev
    * click build now
    * click console output to follow the build
* When the build succeeds you should see the version of the npm package in the viaa npm repository:
    * http://do-prd-mvn-01.do.viaa.be:8081/#browse/browse:npm-viaa:%40viaa
    * same login as jenkins
* You can now update the package version in the client and run npm install
    * Make sure you're conected with the viaa vpn for npm install to succeed
    * The avo2 packages are under @viaa namespace

## Usage

`docker-compose up`

## Process Flow

N/A
