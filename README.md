# Rtimer

Provides tool for audit rendering performance.  
It doesn't require any modification for target Web site. 

## ToC
<!-- toc -->

<!-- tocstop -->

## Getting started
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

## How to use it?

1. Create scenario files.
2. Create rtimer.config.json if you need.
3. Run audit command to correct performance timeline files.
4. Run analyze command to analyze performance from performance timeline files.

## Scenario files
rendering-timer need `scenario files` to audit performance.


## CLI Usage

```sh
npx rtimer <command> [options]
```

### `audit` command

Start performance audit with puppeteer, and create performance timiline files for each scenarios.
You need to create `scenario files` to run this command.

### `analyze` command

Start analyze performance timeline files.
You need to run `audit` command to create performance timeline files before running this command.

### `run` command

Run `audit` command then, run `analyze` command.

### `init` command

Create example scenario file.

### `help` command

Show help text.
