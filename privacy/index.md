---
layout: blog
title: Privacy Information
---

Privacy Disclosure
==================

This site is served from [GitHub Pages](https://pages.github.com), so requests made to this site will terminate and be logged on GitHub servers. You can see [their privacy policy](https://help.github.com/articles/github-privacy-policy/) for more information.

The CloudFlare CDN is used to enable TLS and ensure a speedy response time worldwide. Limited analytic data are kept by CloudFlare. CloudFlare also sets a `__cfduid` cookie for overriding IP-based security restrictions. You can read more about this cookie [here](https://support.cloudflare.com/hc/en-us/articles/200170156-What-does-the-CloudFlare-cfduid-cookie-do-). You can also read [CloudFlare's privacy policy](https://www.cloudflare.com/security-policy).

CloudFlare is also the ultimate DNS resolver for `benburwell.com`. If DNS logs are kept, they will also be subject to CloudFlare policies.

Furthermore, very limited metrics are collected and recorded for my own use. A [custom tracking script](https://github.com/benburwell/benburwell.github.io/blob/master/assets/scripts/metrics.coffee) is used and metrics are stored in an isolated app running on Heroku ([TOS](https://www.heroku.com/policy/tos)). The data collected from all visitors are limited to that which cannot be used to identify the visitor, and includes:

* page load timing information (using the [Navigation Timing API](http://www.w3.org/TR/navigation-timing/));
* the path and title of the page visited.

The metrics script respects the visitor's [Do Not Track](https://en.wikipedia.org/wiki/Do_Not_Track) preference. If the Do Not Track flag is _not_ set, the following information is collected in addition to the information collected about all visits:

* language;
* browser (not the entire User-Agent string);
* referring domain.

If you have questions or concerns, please [shoot me a note](mailto:ben@benburwell.com).
