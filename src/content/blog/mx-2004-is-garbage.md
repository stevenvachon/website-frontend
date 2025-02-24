---
date: 2003-09-12
description: Macromedia MX 2004 is not up to my standards. Read on to find out why.
layout: blog-post.njk
tags:
  - blog-category-graphics
  - blog-category-rants
  - blog-category-websites
  - blog-post
  - numbered-headers
title: 'MX 2004: Garbage (A Big "Booo" for Macromedia)'
---

I was one of the many individuals really excited about the upcoming Flash version. I kept hearing about a few key features that I thought would be very useful. However, I expected more to be included in this version than just those few features. Damn, was I wrong. Thankfully, I didn't pre-order the upgrade or I'd be in the hole $300. <!--more-->

In this article I'll start off with the few features that originally caught my eye and got me excited. Then I'll go through the list of things that really upset me with Flash MX 2004 Professional. I'll try not to rant (too much, heheh).

## What Got Me Excited

### onMouseWheel

Being a fan of JavaScript, the first thing that drew my attention to MX 2004 was its ability to support the mouse wheel without the need of an external script (Microsoft JScript). Avoiding browser scripting whenever possible is always a good thing, considering nearly 10,000,000 people on the Internet have it disabled. This feature still semi-pleases me, even after toying around with the software demo. However, I learned shortly thereafter that it's a Windows-only feature. Boooo.

### TextField Images

Not only has this been a very popular question among rookies, but for quite some time I have wanted to create a "hack" class that would support images in text fields. But it seemed like such an annoying thing to write, so I never even started on it. Now, MX 2004 has support for such built in with no hacks used. I've tested it, and it seems to work okay. No complaints.

### ContextMenu

Custom context menus is something we've been wishing for since the days of Flash 3. Even though it doesn't remove the "About Flash Player" at the bottom, it still allows you to extend your web applications a little further. Good feature, and works fine.

## What Turned Me Off

### UI Optimization

The complete lack of it. First off, it looks nearly identical to that of Flash MX. That's not so bad, though, since MX had a nice interface (in my opinion). All they noticeably added was some fluffy design (ie. the blue bars). But the main failing point is the CPU lag. I have a 3 GHz machine, so there is no reason for a text editor to lag. But guess what? Macromedia managed to do it! If you're running Windows 2000, try putting 500 or so lines of ActionScript---1 or 2; it makes no difference---in the Actions window then drag the scroll bar. They also removed "Actions" from the frame context menu. The History panel lags quite a bit too when going back around ten steps.

I decided not to even bother testing this software on any of my slower machines considering the results on my fastest.

### Timeline Effects

I hate to even mention the S-word, but Flash is not [Swish](http://www.swishzone.com/). At least it wasn't before MX 2004. It was nice being able to say "I use Flash, not Swish" to people who think Flash movies are the easiest thing on the planet to create. Soon we'll have thousands of timeline newbies calling themselves "Flash experts" instead of "Swish experts". Swish introduced a wave of terrible Flash sites, and MX 2004 will bring on a new one. So, get ready.

### FUI Components

As if the MX components weren't terrible enough, Macromedia had to recreate them to be even larger in file size. Meanwhile keeping many of the same bugs that were resident in the previous versions. If 55 KB for a combo box is small, I think I'm out of a job. On top of that, they include all these other components for practically anything you could think of. Is this good? I think not. It's all "click here to be a professional" crap. That definitely helps rookies replace me. Thanks Macromedia.

### ActionScript 2.0

I know the value of a good OOP language, but I also know when something new has no value. ActionScript 2 seems so pointless to me aside from Macromedia trying to put a stop to the "Flash bashing" from non-Flash programmers. Complaints of ActionScript 1 not being standardized enough must have really hurt Macromedia's feelings. Enough so, that they put those programmers ahead of their current user base. They'd rather try to get new users than make their current ones happy. It must be corporate greed. They added so few features to MX 2004 that they insist on advertising ActionScript, which doesn't offer us current Flash developers anything new; only a different syntax for writing things we've been doing for nearly two years. Extending classes with extends rather than prototypes is hardly a big leap and their idea of typecasting is very primitive. It's trying to be a programming language and it doesn't even have binary variables! On top of that, the file sizes are larger than in the previous version. Yeah, like we really needed that.

#### Regular Expressions

We've been asking Macromedia for this since Flash 4, and they still fail to deliver. There are community written classes available, but due to ActionScript syntax, they aren't perfect. They are around 10 KB in file size and aren't extremely difficult to write. So, Macromedia has no excuse.

#### Socket Security

Sockets with Flash are still very weak. We still cannot connect to other sites with a certificate. And since ActionScript 2 has no binary variables, we're unable to reconstruct regular socket protocols. Boooo.

#### RegExp Search & Replace

Developers who use regular expressions for search & replace are still required to use third party applications to get the job done comfortably. Boooo.

## Conclusion

It seems to me that Flash MX 2004, both normal and Professional, are early alpha releases with "final" slapped on the front. They can't be complete. They're just too sloppy. Macromedia seems to be living by Microsoft's philosophy on software development: People don't pay for bug fixes, they pay for new features. Well, this new version of Flash has both few bug fixes and few new features. What's even more unfortunate is that the majority of those new features are pointless and redundant. The three features that originally got me excited about MX 2004 aren't enough to justify the amount of money required to use them. If you feel like wasting your money on this garbage, feel free. I'm not jumping on that sinking boat.
