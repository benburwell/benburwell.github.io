---
title: How does DHCP work?
---

DHCP (Dynamic Host Configuration Protocol) is an integral part of most networks,
from small home network to campuses serving thousands of devices. I recently
realized that I didn't have a solid understanding of how it functions. I knew
that DHCP was used to obtain an IP address from a central server when joining a
network, but wasn't clear on how that negotiation takes place. How could a
machine without an IP address talk to a server that it didn't know the address
of?

<!--more-->

To learn more, I started a Wireshark capture and then connected my computer to a
network to see what happened. I immediately discovered that DHCP is part of the
Bootstrap Protocol (also known as `BOOTP`), which is transported over UDP/IP.
DHCP servers read and write on port 67, while DHCP clients read and write on
port 68. Before the client has acquired an IP address, it uses `0.0.0.0` as the
source address for packets it transmits, and addresses its packets to the
broadcast address `255.255.255.255`.

For the simple case that I examined, I found that there are four messages
involved in acquiring an IP address: Discover, Offer, Request, and ACK. At a
high level, the client broadcasts a request for an address, a DHCP server
responds with an offer, the client makes a request based on the offer it
received, and finally the DHCP server acknowledges the request.

## Step 1: Discovery

The client sends a UDP broadcast packet from `0.0.0.0:68` to
`255.255.255.255:67`. This is a BOOTP Discover message that includes details
about what information is being requested from the network's authoritative DHCP
server. In the case I observed, the following items were requested:

- Subnet mask
- Classless static route
- Router
- DNS server
- Domain name
- Proxy autodiscovery
- LDAP server
- NetBIOS Name Server
- NetBIOS Node Type

A DHCP lease time of 90 days was requested, and my DHCP client identifier (MAC
address) and hostname were also included.

In the case I observed, after the first discovery packet that was transmitted
was not responded to with an offer after 1.125 seconds, a second discovery
packet was transmitted. Since UDP does not guarantee delivery, it makes sense
that a basic replay mechanism would be part of the protocol to handle dropped
packets. While TCP uses a sequence number to correctly order packets, BOOTP
appears to use a somewhat surprising metric: its header contains a "seconds
elapsed" field which was set to 0 for the first discovery packet and 1 for the
packet 1.125 seconds later.

## Step 2: Offer

The server sends UDP packet from `192.168.1.1:67` to `192.168.1.2:68` containing
a DHCP Offer message. There are a few ways we can tell this offer is for us:

- The BOOTP Transaction ID field is set to the value that we sent in our
  Discover packet
- The Client MAC address field in the BOOTP message is set to ours
- At the Ethernet layer, the destination address is also set to our MAC address

In this offer message, we get the responses to some of the questions we asked in
our Discover packet. In this case, we are offered a lease time of `3600` (one
hour, much less than our requested 90 days). We are instructed to renew after 30
minutes, rebind after 52 minutes 30 seconds, and given a netmask of
`255.255.255.0`. We're also informed of the router/DNS server's address of
`192.168.1.1` and supplied with the domain name `home` (so our machine's "FQDN"
will be `<hostname>.home`).

To figure out the address we have been offered, we can look at either the IP
address that the packet was sent to, or we can examine the "Your IP" field in
the BOOTP message.

## Step 3: Request

Now that we've received an offer, we make a request for the offer. This mostly
involves reiterating the initial request, again sent from `0.0.0.0:68` to
`255.255.255.255:67`. Additionally, the message includes a "Requested IP" field
that specifies the IP address from the Offer.

## Step 4: Acknowledgement

Finally, the DHCP server acknowledges our request. This completes the process of
IP address acquisition. The server reiterates the correct parameters it provided
in the Offer, including the rebinding and renewal periods, netmask, etc.

---

Some observations: it makes sense to see UDP used for this protocol rather than
TCP since TCP is connection-oriented and we don't know the address of the server
(nor our own address for that matter) at the beginning of this process. It's
also easy to imagine havoc being wreaked on a network by creating a rogue DHCP
server that provides fake leases with conflicting IP addresses.

Armed with my basic knowledge of how DHCP functions, I wanted to better
understand some of what I had encountered while experimenting. For instance,
what is the difference between "rebinding" and "renewal"? What is the reason for
using "seconds elapsed" as a kind of sequence number? My next stop to find
answers was the IETF RFCs.

As of this writing, there have been three iterations of the DHCP RFC, along with
a few other extension/option RFCs. All three were written by Ralph Droms of
Bucknell University. The first two ([RFC 1531][rfc1531] and [RFC 1541][rfc1541])
were published in October 1993, and the latest version, [RFC 2131][rfc2131], was
published in March 1997. For historical context, I wanted to learn what had
changed throughout the versions, so I ran `$ diff rfc1531.txt rfc1541.txt` (this
is one of those times that I love having the [RFC repository available
locally](https://www.rfc-editor.org/retrieve/rsync/). There don't seem to be any
protocol changes between RFC 1531 and RFC 1541, just a few formatting and
phrasing changes. Running `diff` on RFC 1531 and RFC 2131 produced quite a large
output that I was not eager to read through, but conveniently, section 1.1 of
RFC 2131 is called "Changes to RFC 1541". The 1997 changes are described as:

> This document updates the DHCP protocol specification that appears in RFC1541.
> A new DHCP message type, DHCPINFORM, has been added; see section 3.4, 4.3 and
> 4.4 for details. The classing mechanism for identifying DHCP clients to DHCP
> servers has been extended to include "vendor" classes as defined in sections
> 4.2 and 4.3. The minimum lease time restriction has been removed. Finally,
> many editorial changes have been made to clarify the text as a result of
> experience gained in DHCP interoperability tests.

Interestingly, the terms we're used to seeing defined in [RFC 2119][rfc2119]
(MUST, MUST NOT, REQUIRED, etc) are specifically defined in the document. On
closer inspection, RFC 2119 was _also_ published in March 1997!

With regard to my lingering questions, I learned that "renewing" is when a
client is attempting to renew its lease by recontacting the server that
initially granted it. If the server can't be contacted, or refuses to renew the
lease, the client enters the "rebinding" state in which it tries to contact any
DHCP server to renew its lease or obtain a new one.

I was only able to find one mention of an actual use for the "seconds" field (on
page 15):

> To help ensure that any BOOTP relay agents forward the DHCPREQUEST message to
> the same set of DHCP servers that received the original DHCPDISCOVER message,
> the DHCPREQUEST message MUST use the same value in the DHCP message header's
> 'secs' field and be sent to the same IP broadcast address as the original
> DHCPDISCOVER message.

I did notice that there are a lot of sections with language like "a DHCP server
MAY extend a client's lease **only if it has local administrative authority** to
do so" (emphasis added). But what if someone were to put a rogue DHCP server on
the network, one that did _not_ have "local administrative authority"? It's
probably quite possible to wreak a bit of havoc by creating a rogue DHCP server,
though perhaps not quite as easy as it might seem. Since DHCP leases often last
for some time (hours or days), existing clients might not be affected by the
appearance of a new server for quite a while. Besides, due to the binding
mechanism, when a client needs to renew its lease, it sends a unicast message
directly to the server it initially obtained the lease from rather than
immediately resorting to broadcasting a DHCPDISCOVER message.

Since DHCP is often employed on a contiguous physical network segment, it may
not always be possible to use a firewall to block traffic to the server port
(67). This would require some sort of Layer 2 firewall, which I'm sure exists,
but doesn't seem to be widely deployed (or recommended). It would of course be
possible to set up rules on a Layer 3/4 firewall to block traffic to port 67 on
machines not authorized to act as DHCP servers to prevent a rogue server from
having any effect outside its physical segment.

In conclusion:

- Wireshark is a great learning tool
- RFCs are educational from a technical as well as a historical perspective
- Now I know how DHCP works in a bit more depth

[rfc1531]: https://tools.ietf.org/html/rfc1531
[rfc1541]: https://tools.ietf.org/html/rfc1541
[rfc2131]: https://tools.ietf.org/html/rfc2131
[rfc2119]: https://tools.ietf.org/html/rfc2119
