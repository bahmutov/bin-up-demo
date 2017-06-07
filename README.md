# bin-up-demo

> Demo project for finding NPM bin aliases up the parent chain using [bin-up][bin-up]

## The problem

Imagine monorepo with nested packages. For example, this repo has top
level [package.json](package.json) with tool `figlet` installed. Top level
can easily use this tool from NPM scripts

```json
{
  "scripts": {
    "test": "figlet 'Hi from root'"
  }
}
```
```sh
$ npm t

> bin-up-demo@1.0.0 test /Users/user/git/find-parent-bin-tool
> figlet 'Hi from root'

  _   _ _    __                                       _
 | | | (_)  / _|_ __ ___  _ __ ___    _ __ ___   ___ | |_
 | |_| | | | |_| '__/ _ \| '_ ` _ \  | '__/ _ \ / _ \| __|
 |  _  | | |  _| | | (_) | | | | | | | | | (_) | (_) | |_
 |_| |_|_| |_| |_|  \___/|_| |_| |_| |_|  \___/ \___/ \__|
```

What about subprojects? Do we want to install same tool in every project
leading to wasted space and version mismatch? We want to install a dev tool
once in the root package and then find it from the subprojects.
Unfortunately, NPM does NOT search up the folder chain when looking for
**bin aliases**, it only does so for regular module `require(...)` calls.

We could hardcode relative path to the bin alias ourselves.
For example, take package file [A/B/C/package.json](A/B/C/package.json).
It could use the relative path to the root `bin/figlet` tool but that looks
nasty.

```json
{
  "scripts": {
    "test": "../../../node_modules/.bin/figlet Manual path"
  }
}
```

## Solution

Just like `$(npm bin)/<name>` returns the relative path to the bin alias
*in the current folder*, the user space tool [bin-up][bin-up] looks in the
current folder and up the folder chain until it reaches repo root folder
or file system root. `bin-up` checks each `node_modules/.bin` on the way
to see if has the tool alias `<name>`. If it finds one, it returns it and
it can be executed. So any inner package can just install `npm i -D bin-up`
and use it to find tools from parent folders by name

```json
{
  "scripts": {
    "test": "$(bin-up figlet) bin-up!"
  }
}
```
```sh
$ npm t

> C@1.0.0 test /Users/user/git/find-parent-bin-tool/A/B/C
> $(bin-up figlet) bin-up!

Found /Users/user/git/find-parent-bin-tool/node_modules/.bin/figlet
  _     _                         _
 | |__ (_)_ __        _   _ _ __ | |
 | '_ \| | '_ \ _____| | | | '_ \| |
 | |_) | | | | |_____| |_| | |_) |_|
 |_.__/|_|_| |_|      \__,_| .__/(_)
                           |_|
```

[bin-up]: https://github.com/bahmutov/bin-up

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/bin-up/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
