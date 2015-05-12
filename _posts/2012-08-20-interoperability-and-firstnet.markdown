---
title: Interoperability and FirstNet
description: The United States is finally putting real effort into building a nationwide public safety network, but there are serious problems that need to be addressed.
date: 2012-08-20 00:00:00
category: writing
layout: post
redirect_from: "/writing/interoperability-and-firstnet/"
---

The United States is finally putting real effort into building a nationwide public safety network with [FirstNet], the First Responder Network Authority. FirstNet has been tasked by Congress to build, deploy, and maintain a nationwide broadband network for use by public safety agencies in order to provide completely interoperable communications.

<!--more-->

While I applaud this effort, there are several potential issues that should be addressed. To begin with, a centrally controlled network of this scale would present large reliability problems. In numerous occasions, communities that have rolled out digital or trunked radio systems with many system components have had failures due to a tower or controller failing, leaving all users in the affected area with no way to communicate with each other or with users in other parts of the system. This is not only a risk for naturally occurring phenomena, such as a power outage or [overheating], but also create centralized targets for terrorist attacks. If an attack was planned, it would be relatively simple to first bring down the local tower, thereby preventing all communication in the area. Therefore, a high degree of redundancy must be implemented, as well as physical infrastructure safeguards, which are both technically complex and expensive.

It is not clear whether the new broadband system would completely replace all existing public safety communication systems, or if it would simply be used to supplement them in situations where inter-agency coordination is required. The question also arises as to which agencies will use the system. In addition to the many public and governmental agencies that would be involved in the response to a major incident, there are also many <abbr title="Non-governmental entity">NGO</abbr>s, such as the Red Cross and Salvation Army that are often involved. Would they be permitted to use the network?

In my opinion, it is much better to have a simpler but more robust interoperability plan. Steps have already been taken in this direction, such as the implementation of several nationwide interoperability frequencies on each band. On the VHF-high band, there are five channels set aside that all agencies have blanket authorization to use for interoperability purposes. This is the <abbr title="Keep It Simple, Silly">KISS</abbr> principle in practice. With simple narrowband FM voice modulation that nearly every existing radio supports, there is no need to add infrastructure or purchase additional assets. Additionally, as using a single frequency is directly radio-to-radio, there is no reliance on an outside device for control, and it is no more subject to jamming than the proposed 700 MHz system would be.

Besides all of the technical problems that could (and certainly will) arise during the construction of the system, it almost seems superfluous. After all, we already have a nationwide broadband network of cell phones. The resources that would be allocated to developing the new system could be better utilized in hardening and improving the cellular network. Perhaps a public safety system could piggy-back on existing infrastructure. I also believe that strengthening the established interoperability frequencies with repeaters would be a much cheaper and more effective way to implement the desired outcome. When working with a large incident, it is exceedingly rare that a responder would need to communicate over more than a mile or two, something that is quite feasible with modern handheld radios used by nearly all agencies. If wider coordination is required, a small number of individuals would need to communicate over longer distances, but this could be done just as well by telephone, cellular, or VoIP.

Perhaps the network will be more useful than it currently seems. However, it is not clear to me at the present time that it will properly address a _bona fide_ need in a cost-effective and reliable manner. As a system increases in complexity, more points of failure are introduced, and the less reliable it becomes, all other factors being equal. And speaking from personal experience, reliability is the number one highest priority for first responders, followed closely by simplicity. The tools we use in the field need to “just work.”

[FirstNet]:http://www.ntia.doc.gov/category/public-safety
[overheating]:http://www.sfgate.com/bayarea/article/Oakland-police-radios-fail-during-Obama-visit-3736022.php
