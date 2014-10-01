---
layout: post
title: What is Two-Factor Authentication and Why Does it Matter?
description: As more web services allow users to enable two-factor authentication (2FA), it's important to understand how it helps secure your accounts.
date: 2014-09-30 00:00:00
category: writing
image: http://www.benburwell.com/assets/images/padlock.png
---

With subversions of the security measures of cloud-based services on the rise, many service providers are implementing a strategy known as multi-factor authentication or simply educating their users about the implementations they’ve had for years.

So what exactly is it? While logging in to an account usually only requires you to enter the proper password, two-factor authentication, or 2FA for short, relies on multiple different ways of proving your identity. In general, the three types of identification are _knowledge_ (something you know), _posession_ (something you have), and _inherence_ (something you are). Typical 2FA schemas require the presentation of two of these “factors” in order to authenticate.

The knowledge factor is the most popularly understood and includes passwords or passphrases, PINs, and secret patterns. Essentially, 2FA is an authentication scheme that combats the multitude of ways an attacker might gain your password by introducing another — usually posession — factor. It’s easy to imagine a scenario in which your password could be compromised, whether it’s an attacker brute-force guessing, using the same password for multiple purposes, social engineering attacks such as phishing, or any other means. However, it is unlikely that any of these attackers who gain access to your password will be in sufficient physical proximity to steal or even just see your access token.

A posession factor can take many forms. A simple example of a posession factor is the key that you might use to unlock your door. One posession factor used in electronic systems is a small token such as the RSA SecurID that has an LCD screen that displays a new number every 30 to 60 seconds. The number is generated with cryptographic functions such that both the authentication server and the token will know the same number simultaneously but it is mathematically hard to predict the next number in the sequence given all previous data. Therefore, by entering the number displayed on the token, you can prove to the server that you are indeed in posession of the token. Myriad other posession factors, each with varying resistance to forgery, include USB tokens, magnetic stripe cards, RFID, and smart cards.

Another common approach to the posession factor is the use of SMS. The authentication server will text a code to the user’s known phone number and expect that code to be entered in order to access the protected resource. This process has evolved with smart phones to leverage push notification technology. Rather than SMS, the authentication server sends a push notification to the user’s preregistered smartphone where they can confirm or deny the access requested. Perhaps the most common form of 2FA currently being deployed for cloud services is a time-based one-time password scheme. This allows a smartphone app to act as a physical token by generating a time-based password that is supplied as the posession factor.

A typical implementation of the time-based one-time password (TOTP) algorithm as defined by [RFC 6238](http://tools.ietf.org/html/rfc6238) consists of the following steps:

1. The authentication server generates a cryptographic key and shares it securely with the client such as by scanning a QR code.
2. The client and server [agree upon several parameters](http://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm#Implementation) needed to generate the token.
3. The server prompts the user for the generated token to verify that the token is being generated correctly.

Many websites allow their users to enable 2FA as an additional layer of protection for their accounts. Doing so should add an exponentially larger challenge for attackers, making unauthorized access extremely unlikely. To start using 2FA, many service providers will suggest using the [Google Authenticator app](https://support.google.com/accounts/answer/1066447?hl=en). You can also visit [twofactorauth.org](https://twofactorauth.org) for a list of sites that offer 2FA.
