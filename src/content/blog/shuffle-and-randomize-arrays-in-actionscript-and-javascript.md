---
date: 2011-07-24
description: The most efficient way to randomize or shuffle the indexes of an Array in ActionScript and JavaScript.
layout: blog-post.11ty.js
tags:
  - blog-category-engineering
  - blog-category-websites
  - blog-post
title: Shuffle and Randomize Arrays in ActionScript and JavaScript
---

I'd been looking around for the best solution for this and most of what I had found either performed poorly or wasn't quite random enough. Not so strangely in the end, the best solution was the most basic. <!--more-->

Note: This also works fine with the ActionScript 3 `Vector()` class.

For ActionScript:

```actionscript
function shuffleArray(array:Array):Array
{
  for (var i:int=0, len:int=array.length; i<len; i++)
  {
    var j:int = Math.round( Math.random() * (len-1) );

    var value:* = array[i];

    array[i] = array[j];
    array[j] = value;
  }

  return array;
}
```

For JavaScript:

```js
function shuffleArray(array) {
  for (var i = 0, len = array.length; i < len; i++) {
    var j = Math.round(Math.random() * (len - 1));

    var value = array[i];

    array[i] = array[j];
    array[j] = value;
  }

  return array;
}
```
