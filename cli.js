#!/usr/bin/env babel-node

import cli from 'cli'
import lispToJs from './'
import fs from 'fs'

cli.parse({
  output: ['o', 'File to save output to', 'file'],
  exec: ['e', 'Execute']
})

cli.main(function (args, options) {
  if (args.length !== 1) {
    cli.error('Exactly 1 input file must be supplied')
    cli.getUsage()
  }
  fs.readFile(args[0], function (err, content) {
    var out

    if (err) {
      console.log(err)
      cli.fatal(`An error occured while reading "${args[0]}"`)
    }

    content = String(content)
    if (options.exec) {
      out = JSON.stringify(lispToJs.exec(content))
    } else {
      out = lispToJs(content)
    }

    if (options.output) {
      fs.writeFile(options.output, out, function (err) {
        if (err) {
          console.log(err)
          cli.fatal(`An error occured while writing "${options.output}"`)
        }
      })
    } else {
      console.log(out)
    }
  })
})
