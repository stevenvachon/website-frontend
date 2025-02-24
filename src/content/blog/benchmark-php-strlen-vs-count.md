---
date: 2012-03-25
description: Compares the difference in performance between PHP's strlen() and count().
layout: blog-post.njk
tags:
  - blog-category-engineering
  - blog-post
title: 'Benchmark: PHP strlen vs. count (and sizeof)'
---

I was writing some code that generated a string from an array and came across a pretty rare situation where I could _either_ get the length of that array or the length of the assembled string. Wondering which was faster and finding nothing on Google, I put this benchmark together. <!--more-->

For the sake of search engines, I included `sizeof()` in the title. There was no need to include it in the benchmark as it's the same as `count()` and runs at the same speed.

| Function   | Time          | Comparison     |
| ---------- | ------------- | -------------- |
| `strlen()` | 0.237 seconds | (8.85% faster) |
| `count()`  | 0.260 seconds |                |

Here is the code:

```php
<?php

$test_array = array(0,1,2,3,4,5);
$test_string = '/test/';

function getmicrotime()
{
  list($usec, $sec) = explode(' ',microtime());
  return ((float)$usec + (float)$sec);
}

$time_start = getmicrotime();
for ($i=0; $i<1000000; $i++)
{
  count($test_array);
}
echo 'count() :: '.number_format(getmicrotime()-$time_start,3).' seconds<br/>';

$time_start = getmicrotime();
for ($i=0; $i<1000000; $i++)
{
  strlen($test_string);
}
echo 'strlen() :: '.number_format(getmicrotime()-$time_start,3).' seconds<br/>';
```
