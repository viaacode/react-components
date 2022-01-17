# Meemoo - React components

## General

This repository contains the general meemoo React components to be consumed by applications built
for meemoo using the React framework.

It is built with:
- node: `v16.x.x` ( ~ `lts/gallium`)
- npm: `v8.x.x`
- React: `v17.0.2`
- Storybook: `v6.4.9`

For a complete list of packages and version check out the `package.json` file.

## Setup

### Clone and install dependencies
To setup this project, clone the repo and run `npm i` to install the dependencies.

This will also setup [husky](https://github.com/typicode/husky) via the `npm run prepare` script,
this lifecycle script will run automatically after the install.

### NPM

The available commands for development are:

| command      | runs                                                                                                 |
|--------------|------------------------------------------------------------------------------------------------------|
| start        | Run Storybook for development.                                                                       |
<br>

The available commands for building the project are:

| command      | runs                                                                                                 |
|--------------|------------------------------------------------------------------------------------------------------|
| build        | Build a production ready package to the `/dist` folder.                                              |
<br>

The available commands for testing the project are:

| command      | runs                                                                                                 |
|--------------|------------------------------------------------------------------------------------------------------|
| test         | Run all the unit tests.                                                                              |
| test:output  | Ouput test results to json file                                                                      |
| test:watch   | Run all the unit tests in watch mode.                                                                |
<br>

Other available commands are:

| command      | runs                                                                                                 |
|--------------|------------------------------------------------------------------------------------------------------|
| lint         | Lint all scripts and styling.                                                                        |
| lint:ts      | Lint all script files.                                                                               |
| lint:scss    | Lint all style related files.                                                                        |

## Deploy

Steps to deploy:
* update package.json version to match release branch version
* merge release branch into master
* add tag on master + push the tag (format: v1.1.1)
* goto jenkins to start a build or wait up to 20 minutes for an automatic build
    * only available on the meemoo vpn
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
    * The meemoo packages are under @meemoo namespace

## Team

This project has been created by:
- Andry Charlier: andry.charlier@studiohyperdrive.be

It is currently maintained by:
- Andry Charlier: andry.charlier@studiohyperdrive.be
- Ian Emsens: ian.emsens@studiohyperdrive.be
- Bavo Vanderghote: bavo.vanderghote@studiohyperdrive.be
