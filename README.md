<div align="center">
  <img alt="file analyze" title="file-difference-calculator" src="https://cdn-icons-png.flaticon.com/512/1265/1265944.png" width="150"/>
</div>

<div align="center">

[![Node.js CI](https://github.com/DmitriyK/file-difference-calculator/actions/workflows/nodejs.yml/badge.svg)](https://github.com/DmitriyK/file-difference-calculator/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/0875cc3054ae2777fe7e/maintainability)](https://codeclimate.com/github/DmitriyK/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0875cc3054ae2777fe7e/test_coverage)](https://codeclimate.com/github/DmitriyK/frontend-project-lvl2/test_coverage)

</div>

## About Difference Calculator

A difference calculator is a program that determines the difference between two data structures. This is a popular task for which there are many online services, such as [jsondiff](http://www.jsondiff.com/). A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

## About project

This pet-project was created as part of the [Hexlet](https://ru.hexlet.io/programs/frontend/projects/46) curriculum.

## Requirements

- Node (v.13+)

## Getting started

```sh
git clone https://github.com/dmytro-komlyk/file-difference-calculator.git
cd file-difference-calculator/
make install
make link
```

## Run tests

```sh
make test
make test-coverage
```

## Usage

```sh
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format [stylish] (default: "stylish")
  -h, --help           display help for command
```

## Examples

### Workflow
Flat file comparison (JSON)

[![asciicast](https://asciinema.org/a/326679.svg)](https://asciinema.org/a/326679)

Flat file comparison (yaml)

[![asciicast](https://asciinema.org/a/327167.svg)](https://asciinema.org/a/327167)

Flat file comparison (ini)

[![asciicast](https://asciinema.org/a/327177.svg)](https://asciinema.org/a/327177)

Recursive comparison

[![asciicast](https://asciinema.org/a/329788.svg)](https://asciinema.org/a/329788)

Flat format

[![asciicast](https://asciinema.org/a/330232.svg)](https://asciinema.org/a/330232)

Вывод в json

[![asciicast](https://asciinema.org/a/330392.svg)](https://asciinema.org/a/330392)
