---
title: Visualizing Congress with D3.js
description: Learning D3.js with Congress visualizations.
layout: post
category: writing
date: 2015-03-29 00:00:00
---

<style>
.d3container {
  width: 100%;
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>

I've been wanting to learn [D3.js](http://d3js.org/) for a while now, so I decided to create some visualizations of the United States Congress, inspired by Neil deGrasse Tyson:

<div class="center">
<img src="/assets/images/vis_ndgt0.jpg">
<img src="/assets/images/vis_ndgt1.jpg"><br>
<img src="/assets/images/vis_ndgt2.jpg"><br>
</div>

It wasn't hard to find some [open-source Congress data](https://github.com/unitedstates/congress-legislators), and converting the [YAML](https://github.com/unitedstates/congress-legislators/blob/master/legislators-current.yaml) to [JSON](/assets/data/legislators-current.json) was [practically a one-liner in Ruby](https://gist.github.com/benburwell/20e76f70645c8003b088#file-yaml-to-json-rb). Armed with my trusty JSON data, I set off to learn the basics of D3.

Conveniently, D3 packages some of the base functionality that we often turn to jQuery for, eliminating the need to include yet another library. Using CSS selectors to query the DOM, adding nodes and attributes, and fetching JSON data are just a few such functions.

D3 also comes with some pretty neat built-in plotting functions. I wanted to make a bubble chart to show the gender and number of terms of each legislator. My first attempt looked something like this:

<div class="d3container" id="d3gender_terms_v0"></div>

I used green dots for legislators who identified as female and blue dots for legislators who identified as male. [The code for this](/assets/scripts/d3/gender_terms_v0.js) is very simple, and it doesn't produce a totally awesome result. What I wanted to do next was to bundle all of the circles together in a meaningful way.

Fortunately, D3 has a layout feature that allows you to easily use some pre-built layouts such as `d3.layout.pack()`. The unfortunate part is that I found the documentation rather hard to use and the particular data structure required by D3 to use the `pack()` layout was hard to track down as someone very new to D3. It turns out that this layout is a type of [hierarchical layout](https://github.com/mbostock/d3/wiki/Hierarchy-Layout), which expects an object with an array of `children`, a `value`, `depth`, and `parent`, all of which are used depending on the particular type of layout used. In the case of the `pack()` layout, D3 computes an *x*-coordinate, a *y*-coordinate, and a radius based on the `value` of each datum.

While sorting the data does not produce an optimal packing, it does help visualize the makeup of Congress. I wanted to put the legislators who had the largest number of terms in the center of the pack. I also used the `d3.scale.category10()` function to produce a color value for each gender automatically. The [resulting code](/assets/scripts/d3/gender_terms_v1.js) produces a very nice bubble chart:

<div class="d3container" id="d3gender_terms_v1"></div>

Let's take advantage of some other data that are available to us and see the proportions in which different religions are prevalent. The dataset we're using only has religion data on about a third of the current legislators, so we can start off by making a bar graph of the proportions within that subset:

<div class="d3container" id="d3religion_v0"></div>

As you might expect, [the code for the bar graph](/assets/scripts/d3/religion_v0.js) is fairly simple. One interesting thing that we can do here is to create a linear scale specifying the domain and range. Essentially, this gives us a way to compute the appropriate width of the bars as a function of the actual data value. The most complex part of this visualization is the `transform()` function, which prepares the raw data for use in D3. This function is present due to the added challenge I gave myself of only transforming the dataset client-side.

<aside><p><em>n.b.</em> &mdash; While transforming the data client-side on load adds to the page rendering time, I wanted to see how many sorts of visualizations I could make using just one dataset. In a production environment, it would probably make sense to flatten and transform the data as necessary for each visualization server-side, though an analysis of download time vs. time spent transforming the data for different visualizations would be necessary due to browser caching.</p></aside>

We can also make [a quick donut chart](/assets/scripts/d3/religion_v1.js) to show the subset of legislators that we examined in our bar graph.

<div class="d3container" id="d3religion_v1"></div>

As you may have noticed, there is some overlap in what religion people identify as. Should "Roman Catholic" really get a separate bar from "Christian"? Or "Catholic"? This seems like a great opportunity to use another hierarchical representation. However, our data source does not contain any hierarchical data about religions. So let's find something else to visualize!

Since we have information on each legislator's terms, let's see what we get by making a [partition layout](https://github.com/mbostock/d3/wiki/Partition-Layout) of their party affiliation. Since there are currently over 500 legislators in the U.S. Congress, we'll take a random 10% sample so that things don't get too out of hand:

<div class="d3container" id="d3party_affiliation_v0"></div>

Since the random sample is being taken in the client, you should see a new chart if you refresh the page. You can check out [the source code](/assets/scripts/d3/party_affiliation_v0.js) for full details.

<hr>

After a brief exploration of D3, it is clearly an extremely powerful &mdash; if not completely intuitive &mdash; library for building rich data-driven documents. I'm excited to continue learning more about D3 and using it in my own projects. You should definitely take a look at [Mike Bostock's site](http://bost.ocks.org/mike/) for some much cooler applications of D3 from its creator. There's also a [gallery](https://github.com/mbostock/d3/wiki/Gallery) as well as [tons of other examples](http://bl.ocks.org/mbostock). And of course, you can check out the [D3 source code on GitHub](https://github.com/mbostock/d3).

Thanks for reading! If you have any comments, let me know [@bburwell](https://twitter.com/bburwell).

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
<script src="/assets/scripts/d3/gender_terms_v0.js"></script>
<script src="/assets/scripts/d3/gender_terms_v1.js"></script>
<script src="/assets/scripts/d3/religion_v0.js"></script>
<script src="/assets/scripts/d3/religion_v1.js"></script>
<script src="/assets/scripts/d3/party_affiliation_v0.js"></script>
