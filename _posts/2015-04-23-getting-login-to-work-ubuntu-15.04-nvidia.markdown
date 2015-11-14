---
title: Getting Login to Work on Ubuntu 15.04 with NVIDIA Drivers
description: When I upgraded to Ubuntu 15.04, logging in broke. Here's how I fixed it.
layout: post
date: 2015-04-23 00:00:00
---

When I upgraded to Ubuntu 15.04, I was unable to log in. The machine started normally and I was presented with the login window. But when I entered my password, the screen went black for a few moments and then the login screen came back.

<!--more-->

Since I'm using an [NVIDIA GeForce GTX 750](http://www.geforce.com/hardware/desktop-gpus/geforce-gtx-750), which Ubuntu's Nouveau drivers don't support, I previously needed to install the NVIDIA graphics drivers.

By entering <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>F3</kbd>, I was able to drop to a shell. When I checked `/var/log/Xorg.0.log`, I found a message stating that the NVIDIA driver had failed to load the GLX module, despite earlier messages that it had been loaded. The message also recommended reinstalling the NVIDIA driver.

In the same shell, I ran:

{% highlight bash %}
wget http://us.download.nvidia.com/XFree86/Linux-x86_64/349.16/NVIDIA-Linux-x86_64-349.16.run
chmod u+x NVIDIA-Linux-x86_64-349.16.run
sudo service lightdm stop
sudo ./NVIDIA-Linux-x86_64-349.16.run
{% endhighlight %}

After that, restarting my computer cleared up the issue.
