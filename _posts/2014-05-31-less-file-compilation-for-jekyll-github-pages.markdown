---
layout: post
title: LESS File Compilation for Jekyll and GitHub Pages
description: Git’s pre-commit hook allows one-click static site deployment — including LESS file compilation — to GitHub pages.
category: writing
date: 2014-05-31 00:00:00
redirect_from: "/writing/less-file-compilation-for-jekyll-github-pages/"
---

I recently wrote about [migrating my website to GitHub Pages](/writing/migrating-to-github-pages-and-jekyll) and noted that I wasn’t completely satisfied with my deployment workflow. Ideally, [creating a build should be done in a single step](http://www.joelonsoftware.com/articles/fog0000000043.html). As I wrote, my previous build workflow required me to manually compile my [LESS](http://lesscss.org) files before committing if I’d made changes. While my stylesheet doesn’t change often, this method is certainly not ideal.

<!--more-->

Using [Git hooks](http://git-scm.com/book/en/Customizing-Git-Git-Hooks), it’s possible to run a script at certain points during the Git workflow. To take advantage of this in my case, I added a small bash script to `.git/hooks/pre-commit`:

{% highlight bash %}
#!/bin/sh

export PATH=/usr/local/bin:$PATH
cd /Users/Ben/Documents/Code/benburwell.github.io/assets/less
lessc --clean-css style.less ../css/style.css
cd /Users/Ben/Documents/Code/benburwell.github.io
git add /Users/Ben/Documents/Code/benburwell.github.io/assets/css/style.css
{% endhighlight %}

This is a pretty rough script, but it gets the job done for me. For a much more thorough script, see [this article by TJ VanToll](http://tjvantoll.com/2012/07/07/the-ideal-less-workflow-with-git/).
