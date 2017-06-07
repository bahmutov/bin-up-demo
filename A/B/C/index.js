#!/usr/bin/env node

console.error('args', process.argv)
const program = process.argv[2]
if (!program) {
  console.error('bin-up: finds bin link in node_modules/.bin folders')
  console.error('up to the Git root folder')
  console.error('usage: $(bin-up <name>)')
  console.error('for example:')
  console.error('$(bin-up mocha) --verbose test/*.js')
  process.exit(1)
}
console.log('../../../node_modules/.bin/figlet')
