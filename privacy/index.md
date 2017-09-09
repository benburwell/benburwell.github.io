---
layout: blog
title: Privacy Statement
---

Privacy Statement
=================

This site is served from [GitHub Pages][gh-pages], so requests made to this site
will terminate and be logged on GitHub servers. You can see [their privacy
policy][gh-privacy] for more information.

The CloudFlare CDN is used to enable TLS and ensure a speedy response time
worldwide. Limited analytic data are kept by CloudFlare. CloudFlare also sets a
`__cfduid` cookie for overriding IP-based security restrictions. You can read
more about this cookie [here][cfduid]. You can also read [CloudFlare's privacy
policy][cf-privacy].

CloudFlare is also the ultimate DNS resolver for `benburwell.com`. If DNS logs
are kept, they will also be subject to CloudFlare policies.

Furthermore, very limited metrics are collected and recorded for my own use. A
[custom tracking script][metrics-script] is used and metrics are sent to and
stored by Keen.io ([privacy policy][keen-privacy]). No personally identifying
information is collected. The metrics collected include:

* page load timing information (using the [Navigation Timing API][timing-api]);
* the path and title of the page visited.

The metrics script respects the visitor's [Do Not Track][dnt] preference. If the
Do Not Track flag is _not_ set, the following information is collected in
addition to the information collected about all visits:

* language;
* browser (not the entire User-Agent string);
* referring domain.

If you have questions or concerns, please [shoot me a
note](mailto:ben@benburwell.com).

[gh-pages]: https://pages.github.com
[gh-privacy]: https://help.github.com/articles/github-privacy-statement/
[cfduid]: https://web.archive.org/web/20170611221608/https://support.cloudflare.com/hc/en-us/articles/200170156-What-does-the-CloudFlare-cfduid-cookie-do-
[cf-privacy]: https://www.cloudflare.com/security-policy/
[metrics-script]: https://github.com/benburwell/benburwell.github.io/blob/master/assets/scripts/metrics.js
[keen-privacy]: https://keen.io/privacy-policy/
[timing-api]: https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API
[dnt]: https://en.wikipedia.org/wiki/Do_Not_Track
