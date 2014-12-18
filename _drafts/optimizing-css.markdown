---
title: Optimizing boilerplate CSS
description: Boilerplate code is good, but don't forget to optimize it for your application.
layout: post
category: writing
---

Using frontend boilerplate like Bootstrap for CSS or a grid system can be really helpful for prototyping pages quickly. However, for production use, it's important to remove CSS rules that are not in use in order to optimize your page load times and rendering speed.

On my website, I use a watered-down and responsive version of the 960 grid system. However, I only use one grid width, so instead of a twelve-column layout, I really only need a four-column layout. While there's no harm from a CSS perspective in leaving the extra, unused rules in my code, there's a major performance hit when it comes to rendering the pages in a browser.

Additionally, it may make sense to use inline CSS rather than linking to an external stylesheet. Some factors to consider here are whether your pages are predominantly static or dynamic; you definitely want to be able to leverage the full potential of caching with something as rarely-changed as a stylesheet.