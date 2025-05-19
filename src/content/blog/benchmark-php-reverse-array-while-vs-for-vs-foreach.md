---
date: 2012-04-08
description: Compares the difference in performance between PHP's while(), for() and foreach() when running backwards.
layout: blog-post.11ty.js
tags:
  - blog-category-engineering
  - blog-post
title: 'Benchmark: PHP Reverse Array while vs. for vs. foreach'
---

When looping through an array in reverse and wondering which was faster while finding nothing on Google, I put this benchmark together. <!--more-->

| Function            | Time          | Comparison     |
| ------------------- | ------------- | -------------- |
| `while()`           | 0.921 seconds | (38% faster)   |
| `for()`             | 0.916 seconds | (38.4% faster) |
| `for()` _optimized_ | 0.793 seconds | (46.6% faster) |
| `foreach()`         | 1.486 seconds |                |

Here is the code:

```php
<?php

$test_array = array(0,1,2,3,4,5);

function getmicrotime()
{
  list($usec, $sec) = explode(' ',microtime());
  return ((float)$usec + (float)$sec);
}

$time_start = getmicrotime();
for ($i=0; $i<1000000; $i++)
{
  $j = count($test_array)-1;

  while ($j >= 0)
  {
    $test_array[$j];

    $j--;
  }
}
echo 'while() :: '.number_format(getmicrotime()-$time_start,3).' seconds<br/>';

$time_start = getmicrotime();
for ($i=0; $i<1000000; $i++)
{
  $length = count($test_array)-1;

  for ($j=$length; $j>=0; $j--)
  {
    $test_array[$j];
  }
}
echo 'for() :: '.number_format(getmicrotime()-$time_start,3).' seconds<br/>';

$time_start = getmicrotime();
for ($i=0; $i<1000000; $i++)
{
  for ($j=count($test_array)-1; $j>=0; $j--)
  {
    $test_array[$j];
  }
}
echo 'for() optimized :: '.number_format(getmicrotime()-$time_start,3).' seconds<br/>';

$time_start = getmicrotime();
for ($i=0; $i<1000000; $i++)
{
  $reversed_array = array_reverse($test_array, true);

  foreach ($reversed_array as $key=>$value)
  {
    // Nothing
  }
}
echo 'foreach() :: '.number_format(getmicrotime()-$time_start,3).' seconds<br/>';
```
