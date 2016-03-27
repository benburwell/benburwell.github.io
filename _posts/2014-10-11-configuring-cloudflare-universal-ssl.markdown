---
layout: post
title: Configuring CloudFlare’s Universal SSL
description: CloudFlare recently began enabling SSL for all its customers. Here’s how to leverage the CDN to make your website faster and more secure.
date: 2014-10-11 00:00:00
category: writing
image: https://www.benburwell.com/assets/images/universal-ssl.png
redirect_from: "/writing/configuring-cloudflare-universal-ssl/"
---

On September 29, 2014, [CloudFlare](https://www.cloudflare.com/), a web security company and CDN provider, [announced](http://blog.cloudflare.com/introducing-universal-ssl/) that they would begin offering free, automatic SSL to all its customers (including those on their free plan). This is an enormous step forward for enhancing security and privacy on the Internet; while website owners would previously need to purchase an SSL certificate for their site and often pay extra for SSL hosting, CloudFlare now makes this all free. Plus, you get the benefits of their other services such as DDoS protection.

<!--more-->

I’ve previously written about [hosting static sites with GitHub Pages](https://www.benburwell.com/writing/migrating-to-github-pages-and-jekyll/), which is what I use for www.benburwell.com. GitHub provides SSL hosting for its static sites, but not with custom domain names (e.g. `https://example.github.io` but `http://example.com`). Using CloudFlare, it’s possible to use `https://example.com` for free. And as a bonus, you won’t need to worry about DNS hosting either.

What is CloudFlare?
-------------------

CloudFlare works by having all of the traffic for your site routed through CloudFlare’s network, which provides CDN services such as caching of static resources, as well as security options like DDoS protection and a Web Application Firewall (WAF). You’ll need to import your DNS records to CloudFlare and specify CloudFlare’s DNS servers with your domain registrar to facilitate the service. Other nice features include apex `CNAME` records using the `@` character ([traditionally challenging](http://stackoverflow.com/a/16041655)), as well as IPv6 DNS support.


Setting Up Free, Universal SSL with GitHub Pages
------------------------------------------------

_(Note: you can really do this with any host, but I’m going to be describing how I did this with my site.)_

To get started, head over to [CloudFlare](https://www.cloudflare.com/sign-up) and create an account. Next, you’ll specify the website you want to use CloudFlare with (be sure to use your custom DNS name, not `you.github.io`). You’ll have to wait for a few minutes as CloudFlare scrapes your DNS records. Be sure all of them are there, as any that aren’t will cease to be valid once you enable CloudFlare.

Next, head over to your registrar and and change your authoritative name servers to the ones listed in CloudFlare to start routing your traffic through their network. This will take some time to propagate through the DNS network, but should be effective within a few hours. In the meantime, you can take a look at the three Settings pages. There are many options for optimization, redirects, caching, security, and more. The important one is to go down to the SSL option and set it to Flexible SSL. Note that even though you can access your GitHub pages site over SSL, trying to do so with full SSL through CloudFlare will result in an “Unknown Site” error from GitHub.

<aside>
	<p>
		<em>Update on 22 May, 2015:</em>
		Since this article was published, CloudFlare has <a href="https://support.cloudflare.com/hc/en-us/articles/205075117-FAQ-New-CloudFlare-Dashboard">updated their dashboard</a>. Now, the settings for SSL are located under the <a href="https://www.cloudflare.com/a/crypto">"Crypto" tab</a> for your website. The page rules as described below are still configured the same way, but now found under the <a href="https://www.cloudflare.com/a/page-rules">"Page Rules" tab</a>.
	</p>
</aside>

On the free tier, CloudFlare states that it will take up to 24 hours to provision the SSL certificate for your site. In my case, it only took a few hours. Using one of their paid plans will result in immediate provision. You can check in on whether the certificate has been provisioned by trying to navigate to https://yoursite.com. You’ll likely get a domain mismatch SSL error as CloudFlare defaults to a different certificate until yours has been provisioned. Once you stop receiving the error, you’re good to go!

The final step is to set up Page Rules (of which you get three for free) to redirect visitors to the non-secure site to the SSL one. Go to [My Websites](https://www.cloudflare.com/my-websites) and click Page Rules under the gear icon. Enter the URL patterns to match and flip the “Always use https” to ON.

<p style="text-align:center">
    <a href="/assets/images/cloudflare_ssl_page_rules.png">
        <img src="/assets/images/cloudflare_ssl_page_rules.png" alt="Sample CloudFlare page rules for always using SSL">
    </a>
</p>

That’s it! You’ve taken an important step towards making the web browsing experience more secure and private for your visitors.
