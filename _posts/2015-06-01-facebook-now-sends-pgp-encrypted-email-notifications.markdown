---
title: Facebook Now Sends PGP Encrypted Email Notifications
description: Today, I noticed that Facebook now has a place for you to list your PGP public key.
layout: post
date: 2015-06-01 00:00:00
image: https://www.benburwell.com/assets/images/facebook_gpg.png
---

Today, I noticed that Facebook now has a place for you to list your PGP public key. If you go to your "About" page and open the "Contact and Basic Info" section, there is now a line for you to paste your key. In addition to allowing other people to easily access your public key, there's also a checkbox for Facebook to encrypt notification emails with the key.

<!--more-->

<p><a href="/assets/images/facebook_gpg.png"><img src="/assets/images/facebook_gpg.png" style="width:100%" alt="Facebook now gives the option to list your PGP public key"></a></p>

The mouseover help text states:

> If you check this box, you will receive an encrypted verification email to 
> make sure that you can decrypt notification emails that have been encrypted 
> with this public key. If you are able to decrypt the verification email and 
> click the provided link, Facebook will begin encrypting notification emails 
> that it sends to you with your public key.

I tried it, and just as described, I got an encrypted email signed with PGP key `0xDEE958CF`. After decrypting the email and following the link, I was alerted that email notifications would now be encrypted. I haven't actually verified this, since I don't receive email notifications from Facebook to begin with.

A quick Google search as well as a search in the Facebook Help Center turned up no results, so I'm not sure how recent this is, or perhaps it's being rolled out gradually.
