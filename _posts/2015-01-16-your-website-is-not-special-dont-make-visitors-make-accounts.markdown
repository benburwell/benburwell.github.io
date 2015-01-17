---
title: Your Website is not Special, Don't Make Visitors Make Accounts
description: Few things bother me more than when I am forced to make an account to have some basic interaction with a website.
layout: post
category: writing
date: 2015-01-16 00:00:00
---

One of my pet peeves in website usability design is forcing people to create unnecessary accounts. My recent purchase of some concert tickets from [Ticketfly](https://www.ticketfly.com) required me to make an account to buy them. For people who buy a lot of concert tickets, having an account may make a lot of sense. But for me, as someone who buys concert tickets at most once every year or two, having an account on a site that I will probably only use once is not only unnecessary, it's annoying.

This is not to say that you shouldn't offer accounts; that would be ridiculous (depending on the type of site you are running, of course). However, in general, your users know far better than you do whether or not they actually want or will use an account. Forcing them to create an account will only drive them away. People don't like creating accounts they don't want to have. There's really no reason you can't have a "check out as guest" option.

And if you do offer accounts, here are a couple of rules to follow to ensure a good user experience:

1. Allow the option of using a 3rd-party identity provider (OpenID, Facebook, Google, etc.). Often, visitors don't want to have yet another username/password to remember.
2. Don't force visitors to use a 3rd-party provider. Always have a local option. As a counter point to (1), many visitors won't want to use their Facebook/Google accounts for authenticating to other sites.
3. Username = Email. Don't make people remember a username for your site. You may allow them to pick a username later on that can be used in lieu of their email address, e.g. as the URL for a profile page, but don't force them to use a username to log in.
4. Don't make complicated password rules. If you do have password requirements, show them to the user *before* they try to make a password. Only telling them when their password doesn't fit your requirements causes consternation.
5. Never *ever* limit how long a password can be (within reason, obviously you don't want to be receiving a megabyte long password). My bank limits passwords to 14 characters, which is rather absurd. Since you're hashing your passwords anyway, it's not like you need to allocate extra memory in your tables to store longer passwords.
6. Always allow your users to close their account. This should remove all information about them from your service to the extent possible without disrupting the integrity of other information.

Of course, there are technical details that you need to be watching out for that are outside the scope of this post. I'll leave it to you to make sure your implementation is secure and robust, but I'll leave you with a few general tips:

* Don't invent your own crypto. This applies to protocols, hashing, encryption, everything.
* Use salt.
* Use a slow, secure hash function like SHA-256. Don't use MD5!
* Using unsecured HTTP (no SSL/TLS) is inexcusable.
* Don't invent your own crypto.
* *Don't invent your own crypto.*

For a good overview, see [Salted Password Hashing - Doing it Right](https://crackstation.net/hashing-security.htm).
