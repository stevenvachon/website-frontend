---
date: 2012-06-30
description: Compares the difference in performance between PHP's array_splice() and unset() & array_values().
layout: blog-post.11ty.js
tags:
  - blog-category-engineering
  - blog-post
title: 'Benchmark: PHP array_splice vs. unset & array_values'
---

If you're wondering which of these two popular techniques for removing array indexes is fastest, this should be of some help. <!--more-->

| Function                     | Time          | Comparison     |
| ---------------------------- | ------------- | -------------- |
| `unset()` & `array_values()` | 1.645 seconds | (10.3% faster) |
| `array_splice()`             | 1.834 seconds |                |

Here is the code:

```php
<?php

function getmicrotime()
{
  list($usec, $sec) = explode(' ',microtime());
  return ((float)$usec + (float)$sec);
}

$time_start = getmicrotime();
for ($i=0; $i<1000000; $i++)
{
  $test_array = array(0,1,2,3,4,5);
  array_splice($test_array, 3, 1);
}
echo 'array_splice() :: '.number_format(getmicrotime()-$time_start,3).' seconds<br/>';

$time_start = getmicrotime();
for ($i=0; $i<1000000; $i++)
{
  $test_array = array(0,1,2,3,4,5);
  unset($test_array[3]);
  $test_array = array_values($test_array);
}
echo 'unset() & array_values() :: '.number_format(getmicrotime()-$time_start,3).' seconds<br/>';
```
