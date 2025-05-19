---
date: 2025-04-13
description: Some of the retro approaches to crafting a website are returning.
layout: blog-post.11ty.js
tags:
  - blog-category-announcements
  - blog-category-engineering
  - blog-category-websites
  - blog-post
title: The Modern Way To Build A Website
# Diagrams were created using Lucidchart, and saved there; logged in with Google
---

"Back in the day", we used to handcraft our websites with static HTML files on our local machines before uploading them somewhere; either a free web host like Tripod, Angelfire and GeoCities, or a paid one like GoDaddy. <!--more--> The more initiated might have used SSI and---from my perspective at the time---the "crazy ones" used Perl through CGI. Then, as things modernized, PHP took over and soon every website had swappable themes. WordPress improved much of those conventions, Ruby On Rails was an unsanitized/insecure---but very automated---conventional mess, and our websites were very much tied to a webserver. Fortunately, all of that is the past.

While most websites have truly become software, it's _still possible_ for them to be simple enough to run on little more than a file server. Static site generators are not a new thing, but their modernizations make them better than ever and they take us back to some of the old DIY days of website creation. Local tools with no extra baggage.

I chose to rewrite the frontend of my website using [11ty](//11ty.dev/) (Eleventy), a modern clone of [Jekyll](//jekyllrb.com). My blog posts are written in [Markdown](//wikipedia.org/wiki/Markdown), letting me focus on the content. The templates and more customized pages are written in HTML---within simple [JavaScript](//wikipedia.org/wiki/JavaScript) files for interpolation and iteration---and [SCSS](//sass-lang.com). Publishing articles and site changes is handled in the cloud through CI/CD with [GitHub Actions](//github.com/features/actions), but the actual authoring and development is still performed with local files on a workstation.

It was time for me to upgrade from my old shared web host to something better. While I could've opted for an affordable VPS, my choice to implement a distributed design on AWS has provided much better---and _infinitely-scaling_---performance _and_ with an even lower annual cost.

![Deployment flow](aws-deployment.svg "CI/CD automation makes everything possible by simply `git push`'ing my changes.")

![User flow](aws-user.svg 'CloudFront (CDN) provides extreme performance via content localization with many edge servers and HTTP/3.')

And because AWS [API Gateway](//aws.amazon.com/api-gateway) supports [OpenAPI](//www.openapis.org), I didn't even have to write a RESTful API implementation---which would've otherwise been with [Express 5](//expressjs.com). Per my specification, requests are simply routed from DNS (AWS [Route 53](//aws.amazon.com/route53/)), to the gateway, then to my AWS [Lambda](//aws.amazon.com/lambda)s (cloud functions) running on [Node.js](//nodejs.org).

The code was written to be as agnostic as possible; meaning that if for whatever reason I felt it necessary to migrate from Amazon to something else---such as Google or Azure---it wouldn't be much effort beyond changes to dependencies and _maybe_ I/O.

## The source code

- [website-frontend](//github.com/stevenvachon/website-frontend)
- [website-backend](//github.com/stevenvachon/website-backend)

## Helpful articles

- [Use IAM roles to connect GitHub Actions to actions in AWS](//aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/)
- [Create a simple function with CloudFront Functions](//docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-tutorial.html)
- [Add index.html to request URLs without a file name in a CloudFront Functions viewer request event](//docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_url_rewrite_single_page_apps_section.html)
- [403 instead of 404 from S3](//repost.aws/knowledge-center/s3-troubleshoot-403)
