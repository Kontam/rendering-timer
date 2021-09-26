# Rtimer

Provides tool for audit rendering performance.  
It doesn't require any modification for target Web site. 

## <a name='ToC'></a>ToC
* [Getting started](#Gettingstarted)
* [How to use it?](#Howtouseit)
* [Scenario files](#Scenariofiles)
* [CLI Usage](#CLIUsage)

## <a name='Gettingstarted'></a>Getting started
Execute following command.

```sh
npm install rendering-timer -D
```

Create example scenario file.

```sh
npx rtimer init
```

Run Rtimer. Then, you can see report on your console.

```sh
npx rtimer audit
```

![resultCap](https://user-images.githubusercontent.com/28699942/134814855-b104888a-e7ce-468a-b565-880484767acf.png)

## <a name='Howtouseit'></a>How to use it?

1. Create scenario files.
2. Create rtimer.config.json if you need.
3. Run audit command to correct performance timeline files.
4. Run analyze command to analyze performance from performance timeline files.

## <a name='Scenariofiles'></a>Scenario files
rendering-timer need `scenario files` to audit performance.

```js
const { Scenario } = require('rendering-timer');

module.exports = new Scenario({
  name: 'exampleScenario',
  outDir: 'example/moreInfo',
  startUrl: 'https://example.com/',
  triger: async (page) => {
    const link = await page.$('a');
    if(!link) return console.error('link was not found')
    await link.click();
  } 
})
```
- `name` is option to specify scenario. It is used to audit single scenario with `--name` option of CLI command.
- `outDir` is option to specify path to output performance timeline json. In this example's case, output file will be stored in `[PJroot]/timeline/example/moreInfo`.
- `startUrl` is start point of audit.
- `prepare` is callback function (optional). This function will be called before `triger` callback. Usualy, it is useful for authentication.
- `triger` is callback function.  rendering-timer lunch puppeteer with `startUrl` then, call `prepare` callback and `triger` callback. After exit `triger` callback, rendering-timer start to collect performance timeline.

## <a name='CLIUsage'></a>CLI Usage

```sh
npx rtimer <command> [options]
```

### <a name='auditcommand'></a>`audit` command

Start performance audit with puppeteer, and create performance timiline files for each scenarios.
You need to create `scenario files` to run this command.
- `--times` is option for specify number of trials. Analyze result contains avarage of them.
- `--name` is option to audit with single scenario file.

### <a name='analyzecommand'></a>`analyze` command

Start analyze performance timeline files.
You need to run `audit` command to create performance timeline files before running this command.
- `--output` is option for specify output file type. ("csv" | "json")

### <a name='runcommand'></a>`run` command

Run `audit` command then, run `analyze` command.  
Options for `audit` and `analyze` can be specified.

### <a name='initcommand'></a>`init` command

Create example scenario file.

### <a name='helpcommand'></a>`help` command

Show help text.
