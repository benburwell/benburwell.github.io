---
title: Optimizing your CSS
description: Boilerplate code is good, but don't forget to optimize it for your application.
layout: post
category: writing
date: 2015-01-15 00:00:00
---

There are probably a lot of ways that you can significantly speed up your page load times by taking a look at your CSS. Here are a couple of places to start looking.

<!--more-->

## Remove unused CSS rules

Using frontend boilerplate like [Bootstrap](http://getbootstrap.com) for CSS or a grid system can be really helpful for prototyping pages quickly. However, in production, it's important to remove CSS rules that are not in use in order to optimize your page load times and rendering speed.

On my website, I use a distilled and responsive version of the [960 grid system](http://960.gs). However, I only use a few grid widths. While there's no harm from a CSS perspective in leaving the extra, unused rules in my code, there's a major performance hit when it comes to rendering the pages in a browser.

I was recently able to trim down the size of my stylesheet substantially be eliminating rules that came with 960 that weren't necessary for my site and only keeping the ones that I needed. One tool that can be really helpful for this is the [Audit tab in the Chrome Developer Tools](https://developer.chrome.com/devtools#audits) that can tell you all the CSS rules that are in effect but unused. You can also try running Google's [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) on your site for additional information.

## Choose the location of your CSS

It may make sense to put some of your CSS in the HTML `<head>` in addition to linking in an external stylesheet. Some factors to consider here are whether your pages are predominantly static or dynamic; you definitely want to be able to leverage the full potential of caching with something as rarely-changed as a stylesheet.

If you use a very small amount of CSS and have mostly static content, or a single-page application, the time saved by not making that extra network request may be worthwhile. Just remember that it won't be cached, so you'll be sending your entire stylesheet each time a visitor requests a different page on your site.

On my site, I use a small stylesheet in the `<head>` to load my webfonts; this allows the browser to start loading them sooner rather than having to wait for the external stylesheet to download before finding out about the webfonts.

## Bonus: minified SCSS, Sass, or CSS in Jekyll layouts

If you're using Jekyll, you can pretty easily include a minified SCSS segment in your layouts. I keep my font stylesheet at `_includes/fonts.scss`, so I can use the following chunk of code to include the minified version:

{% gist bbaea7d51dd9ab9afa15 %}

The minification is, of course, dependent on your `_config.yml`. You can [take a look at mine](https://github.com/benburwell/benburwell.github.io/blob/master/_config.yml) for reference.
