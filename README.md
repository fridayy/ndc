[![CircleCI](https://circleci.com/gh/fridayy/ndc/tree/master.svg?style=svg)](https://circleci.com/gh/fridayy/ndc/tree/master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![NPM Version](http://img.shields.io/npm/v/ndc.svg?style=flat)](https://www.npmjs.org/package/ndc)
[![NPM Downloads](https://img.shields.io/npm/dm/ndc.svg?style=flat)](https://npmcharts.com/compare/ndc?minimal=true)
# ndc

_ndc_ is a simple command line utility tool to provide an overview of out-dated node dependencies and its best use is
probably in CI environments before or after the build step of a node project.


![Demo](https://i.imgur.com/ofj0Db9.gif)

## Installation
**yarn:** ```yarn global add ndc``` <br/>
**npm:** `npm install -g ndc`

## Usage

> tbd

## Available options

> tbd

## Export / POST

If `--export <url>` is used the following json report is sent to the given `<url>`:

```json
{
    "results": [{
        "_distTag": "ts-jest",
        "_currentVersion": "23.0.0",
        "_latestVersion": "23.0.1"
    }, {
        "_distTag": "@types/request-promise",
        "_currentVersion": "4.1.41",
        "_latestVersion": "4.1.42"
    }, {
        "_distTag": "tslint",
        "_currentVersion": "5.10.0",
        "_latestVersion": "5.11.0"
    }, {
        "_distTag": "tslint-config-prettier",
        "_currentVersion": "^1.13.0",
        "_latestVersion": "1.14.0"
    }, {
        "_distTag": "rxjs",
        "_currentVersion": "6.2.1",
        "_latestVersion": "6.2.2"
    }, {
        "_distTag": "@types/jest",
        "_currentVersion": "23.1.4",
        "_latestVersion": "23.3.0"
    }, {
        "_distTag": "jest",
        "_currentVersion": "23.3.0",
        "_latestVersion": "23.4.1"
    }, {
        "_distTag": "rxjs-compat",
        "_currentVersion": "6.2.1",
        "_latestVersion": "6.2.2"
    }],
    "statistics": {
        "totalDependencies": 20,
        "outdatedDependencies": 8,
        "outdatedPercentage": 40
    },
    "metaInfo": {
        "name": "ndc",
        "repositoryName": "ndc",
        "version": "0.1.4"
    }
}
```
