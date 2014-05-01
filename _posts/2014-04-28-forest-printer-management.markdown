---
layout: post
title: Forest™ Printer Management System
description: For my Software Engineering class, we built a printer management infrastructure.
date: 2014-04-28 00:00:00
type: project
---

In the Fall 2013 semester, I took a Software Engineering class. After a few weeks studying about development lifecycles, scheduling techniques, and such, we split the class into groups to propose and develop large software projects. I joined the team that was building a system that would track printer usage, display status, and collect statistics. Having previously created [a printer status project](http://mathcs.muhlenberg.edu/~bb246500/printers/), I found the idea intriguing.

Several of the team members had experience using GitHub, so we decided to [create an organization](https://github.com/printerSystemCSI210) to store documents and provide version control. We had the school Math/CS department web server running Apache available for web hosting. Additionally, I had experience with [Node.js](http://nodejs.org) running on [Heroku](https://www.heroku.com/), so we had that technology in our arsenal as well.

One of the first challenges we encountered that would have an impact on our architecture was the fact that most printers do not have public IP addresses and thus would need to be queried from inside the local network, while we wanted the public-facing site to be accessible regardless of physical location. This led us to developing the concept of an API which would enable a master database to be queried and updated by various components. In developing an API-central infrastructure, we were also looking down th line towards supporting client-developed applications and native applications for various platforms (iOS, Android, Windows, OS X).

<p style="text-align:center">[![Forest Interaction Diagram](/assets/images/forest_interaction_diagram.png)](/images/forest_interaction_diagram.png)</p>

Our first task was to develop a data format and database schema. As we intended to use [actionhero](http://actionherojs.com) for the API server, we created a [schema for MongoDB](https://github.com/printerSystemCSI210/api-server/blob/master/initializers/_project.js) and a base [set of API commands](https://github.com/printerSystemCSI210/api-server/tree/master/actions) we would need to implement in order to get a framework of the service up and running. We [deployed this on Heroku](https://forest-api.herokuapp.com).

Simultaneously, we began work on a [web frontend](https://github.com/printerSystemCSI210/frontend) [hosted on the Math/CS server](http://mathcs.muhlenberg.edu/~mb247142/forest/frontend/home.php) that would communicate with the API to display graphs using [chart.js](http://www.chartjs.org). You can make an account here and add printers, though the interface is probably still a bit buggy.

Additionally, we created a [Ruby program](https://github.com/printerSystemCSI210/query-agent) that would be running on the local network and would pull printer addresses from the API and query their status and properties via SNMP and push this information back to the API at a specified interval. We began working on bundling the gem as a standalone application using [Omnibus](https://github.com/opscode/omnibus-ruby), but due to lack of time at the end of the semester, this was never completed.

At the end of the semester, we had built three interacting components, each using a different technology (Node.js/Mongoose, PHP/Apache, Ruby). You can [read our final Venture Proposal (pdf)](/assets/pdf/forest_venture_proposal.pdf). While all of our components communicated over HTTP using JSON, it’s worth noting that actionhero supports socket connections over TCP/TLS, which would have been a better choice for some of our infrastructure in production. We decided to use HTTP since it was easier to deploy on Heroku’s free tier and easier to interact with without writing additional components in Ruby and PHP.

We’ve talked about continuing to develop the project beyond the class, but no progress has really been made. It’s probably possible to get a working monitoring system up and running based off our code (which is [all on GitHub](https://github.com/printerSystemCSI210)), but it would require quite a bit of legwork as it currently stands.
