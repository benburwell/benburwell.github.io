---
title: Enhancing Printing at Muhlenberg
description: >
  Avoiding frustration and wasted paper by providing remote status reporting and
  logical DNS names.
---

A common frustration of Muhlenberg students is to print a document to a dorm
printer only to find that the printer had no paper when going to collect it.
This leads to both frustration and wasted paper, since when more paper is put
into the printer, it will print out all the queued jobs from when the tray was
empty. By that time, students have often given up and printed their document to
another printer.

<!--more-->

To avoid this, I created a web page that [reports the status of Muhlenberg
printers](http://mathcs.muhlenberg.edu/~bb246500/printers/). The PHP script
queries the printers to determine the status of their trays. If you’d like to
see other printers added, let me know [by email](mailto:hi@benburwell.com) or
[on Twitter](https://twitter.com/intent/tweet?text=@bburwell).

## DNS Names

To facilitate printing from personal computers, I created DNS records for
several printers which enable them to be configured with a logical name rather
than by IP address. Currently, the following printers/DNS names are available:

- `trumbower48.print.muhlenberg.benburwell.com`
- `trumbower125.print.muhlenberg.benburwell.com`
- `trumbower147.print.muhlenberg.benburwell.com`
