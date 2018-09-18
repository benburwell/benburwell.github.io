---
title: Notes on setting up a FreeBSD home server
permalink: /freebsd.html
---

# Notes on setting up a FreeBSD home server

## Prologue

A few months ago, I purchased a beefy second-hand tower to act as a home server.
I was looking to bring some of the services that I was previously outsourcing
into a single location, and to expand my familiarity with networking and systems
administration. Specifically, I wanted to:

- Replace the small DigitalOcean box that I was using as a VPN/proxy when I
  needed to use public WiFi
- Stop paying for a GitHub subscription to host private repositories
- Have a better home media and file sharing/backup solution
- Host a Minecraft server (nothing too serious, I occasionally play with a few
  friends)
- Have a stable home for various VMs that I spin up as part of my security lab
  (I've been playing around with pen testing and trying to learn more about
  Windows as a part of this).

My initial solution was to install a free version of VMWare ESXi as a hypervisor
and create several virtual machines. It was actually quite easy to get ESXi up
and running and start creating VMs. For the past several months, my home network
has been completely routed through the server (it has dual Ethernet, so I'm
using pfSense in a VM as my firewall/NAT/DHCP/etc), and I've spun up several VMs
(mostly Ubuntu) for things like Gitlab and Minecraft.

However, there are a few things that I don't quite like. I did have an incident
following a power outage after my free trial of ESXi had expired but before I
inputted my free license key in the UI. This resulted in my pfSense VM not
auto-booting and due to some poor configuration on my part, I was unable to
access the ESXi web UI to enter the license key without resetting the network
settings through the ESXi console. This brings me to my second gripe: the ESXi
web UI is _very_ buggy and overall pretty awful to use. Certain pages have to be
reloaded to work properly, dialogs are randomly empty, etc. Thirdly, I've found
myself creating a "general purpose" VM that I can SSH into remotely. While
there's nothing explicitly _wrong_ with this, it just doesn't feel quite right
to me to have a general purpose server that is completely parallel to my other
server VMs.

As a result of these shortcomings and learnings, I have decided to embark upon a
journey towards further simplification and reliability. I'll be replacing ESXi
with FreeBSD, a rock-solid operating system. Rather than running a utility VM,
I'll simply have the FreeBSD system on the server itself as a "base of
operations."

I plan to learn more about and use several tools during this process. Currently,
I only have one 2 TB drive installed. I plan to add a second one and use zfs to
create a mirrored vdev pool for redundancy. This will make me feel a lot better
about using my server as a backup destination. Of course, this in itself is not
a complete backup solution, but it's a significant step forward from just
relying on a single disk. Rather than running pfSense in a VM, I plan to just
use the ISC DHCP server from the ports collection and use the built-in `pf`
firewall to accomplish just about everything I was using pfSense for. I'll
likely also end up running a BIND DNS server for a few local network things.

I am still learning about jails in FreeBSD, but I think they could replace a few
of the VMs I have currently, such as the Minecraft and GitLab servers. I plan to
use bhyve to run things like Windows VMs for pen testing that jails are clearly
not suited for.

I've used FreeBSD as my desktop OS in the past, and really love how it feels
compared with GNU/Linux. Everything just seems more straightforward, and I was
surprised to find that things like graphics drivers Just Work&trade; under
FreeBSD where they require a lot of ugly finagling under Linux. I'm quite
looking forward to using FreeBSD more often frequently, and gaining more depth
in some of its great tools like jails and pf.

To start making the transition (which might be a little painful), I've installed
a fresh copy of FreeBSD 11.2 on a currently-unused machine to start poking
around with zfs configurations, jails, and bhyve. This will give me the
foundation I need to effectively set up my top-level environment and hopefully
get it mostly right the first time. Incidentally, I'm also about half way
through reading [The Book of PF](https://nostarch.com/pf3) from No Starch Press,
which will no doubt be helpful in my transition from pfSense to pure pf.

I intend to update this page with notes as I continue on my FreeBSD journey.
Stay tuned!
