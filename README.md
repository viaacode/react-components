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

For our deployment flow take a look at the official [meemoo docs for CI/CD](https://github.com/viaacode/ci-cd-docs/tree/main).

The current flow for publishing differs a bit from how it should be.  
For releasing a new version follow the next steps:
* Make sure everything that needs to go in the next release is merged to the current release branch.
* Switch to the release branch and make sure eveything is good to go.
	* Run these commands to make sure: `npm run lint && npm test && npm run type-check`.
* If no warnings or errors pops up we can proceed to mark the next version.
	* Run `npm version patch|minor|major` to bump the version number in package.json.
		* This version should be the same as the current release branch.
	* When successful there will be a new commit and git tag marking the new version.
* Push the new commit and git tag to the release branch.
* Open a PR from the current release branch to master.
	* When approved and merged a build and publish will be automatically triggered in the CI/CD
	pipeline

### Branching model

Important in the deployment flow is the branching model. Ours differs a bit from the official docs
but it changes nothing to the deploy flow.  
Below you can find an explanation and example of each branch:

**Feature**:

Used for creating new features or refactoring. Usually associated with a Task issue in Jira.  
If this is the case don't forget to include the correct ticket number in the branch.

*example*: `feature/ARC-1-button-component`, `feature/update-readme`

**Bugfix**:

Used for fixing bugs that arise during development or after testing. Usually associated with a bug
issue in Jira.  
If this is the case don't forget to include the correct ticket number in the branch.

*example*: `bugfix/ARC-1-button-component`, `bugfix/typo-in-readme`

**Release**:

Used during development to mark the next release we will be publishing.  
Once a new version is ready, the release branch can be merged into `master`.  
This will automatically publish to meemooo's nexus.

*example*: `release/v1.0.0`

**Master**:

Used for publishing to [meemoo's nexus](http://do-prd-mvn-01.do.viaa.be:8081/#browse/browse:npm-viaa:%40meemoo%2Freact-components).  
Opening PR's to master will also perform several checks to make sure code is passing all tests and
the build doesn't fail.  
Pushing a tag to master will deploy to PRD.

*branch name*: `master`

## Team

This project has been created by:
- Andry Charlier: andry.charlier@studiohyperdrive.be

It is currently maintained by:
- Andry Charlier: andry.charlier@studiohyperdrive.be
- Ian Emsens: ian.emsens@studiohyperdrive.be
- Bavo Vanderghote: bavo.vanderghote@studiohyperdrive.be
