---
title: Whitelisting Tor on CloudFlare
description: >
  CloudFlare poses a significant barrier to Tor users, but site operators can
  ease their way by whitelisting Tor.
---

On March 30th, 2016, CloudFlare posted [a blog entry entitled "The Trouble with
Tor"](https://blog.cloudflare.com/the-trouble-with-tor/) outlining the issues
Cloudflare has with serving clients' sites to Tor users. The Tor project quickly
followed it up with [their own post, "The Trouble with
CloudFlare"](https://blog.torproject.org/blog/trouble-cloudflare), which
presented an analysis of the situation from Tor's perspective.

<!--more-->

CloudFlare's post acknowledged that Tor does play an important role on the
internet, but presents the irrelevant conclusion that of "Security, Anonymity,
Convenience: Pick Any Two," security and convenience will necessarily be the
choices of their customers. Certainly, all three properties are important, but
not all of their customers' sites will be subject to the same risks.

I use CloudFlare's services on several sites, including this one. On some of my
sites, I do rely on CloudFlare to provide some measure of security, particularly
ones with dynamic content. However, for a site like this one that is entirely
static, I have nothing to gain from hiding my content due to a perceived
security threat. Everything on this site is considered public, and there are no
attack vectors that are prevented through CloudFlare doing browser verification.

On the other hand, anonymity is quite important to me. Where it does not present
a security risk to disable CloudFlare's browser verification, I have chosen to
whitelist Tor users on this site. There is little to be lost from bots or
spammers accessing this site at will, and there is much to be gained from
ensuring that people who consider their privacy important to be able to access
content without undue hinderance.

CloudFlare does provide an easy way to whitelist all Tor traffic, and they even
presented it in their original blog post. To whitelist Tor, go to the Firewall
app in your CloudFlare dashboard and add an Access Rule. Enter `T1` as the
country code (the special code for Tor), and select Whitelist as the action.
Now, Tor users will not be presented with a CAPTCHA when visiting your site.

To see it in action for yourself, [download the Tor
browser](https://www.torproject.org/projects/torbrowser.html.en) and try
visiting your site before and after adding the firewall rule. More information
about how CloudFlare handles Tor traffic can be found [on their Help Center
page](https://support.cloudflare.com/hc/en-us/articles/203306930-Does-CloudFlare-block-Tor-).

While whitelisting Tor is not the right solution for every site, I encourage you
to consider whether yours is a good candidate. Let me know your thoughts!
