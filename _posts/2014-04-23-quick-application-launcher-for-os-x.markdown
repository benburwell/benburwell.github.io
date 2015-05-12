---
layout: post
title: Quick App Launcher for OS X
description: How to remap your keyboard to quickly launch applications.
date: 2014-04-23 00:00:00
category: writing
redirect_from: "/writing/quick-application-launcher-for-os-x/"
---

I’ve been using [Alfred][] for some time now as an application launcher. If you’re not familiar with application launchers such as Alfred, it’s essentially Spotlight supercharged. It can find and launch applications, open files, perform custom web searches, even shut down your computer for you — all from commands you type in.

<!--more-->

Like many other aspects of Alfred, it has highly customizable settings for the key combination used to activate it. For a long time, I used a double-tap of the Option key, but I felt as though there must be a better solution. Inspired by the Google’s decision to replace the traditional Caps Lock key with a “Search” key on the Chromebook, I started poking around on the web.

Enter [PCKeyboardHack][].

This small application allows you to remap your keyboard as desired. I installed it with no hassle and easily found a checkbox for “Change Caps Lock Key.” I used a keycode of `101`, which corresponds to the F9 key, one that I very rarely use. To complete the setup was a matter of opening Alfred’s preferences and setting the Alfred hotkey to F9 by hitting caps lock. Now I can activate Alfred to launch applications with a quick press of the caps lock key.

The choice of F9 was mostly arbitrary; I wanted a key that I never or almost never used, as well as one that Alfred could use as a hotkey with a single press. If you use your function keys regularly, it might be wise to seek another unused key.

[Alfred]: http://www.alfredapp.com
[PCKeyboardHack]: https://pqrs.org/macosx/keyremap4macbook/pckeyboardhack.html
