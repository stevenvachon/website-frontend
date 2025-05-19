---
date: 2013-01-30
description: How to remove that outer padding on your CSS table layouts caused by border-spacing.
layout: blog-post.11ty.js
tags:
  - blog-category-websites
  - blog-post
title: Inside-Only CSS Table border-spacing
---

When working with a `<table>` or `display:table` layout, getting some nice space between each cell can be a real pain. Resorting to hacks like `padding` or a transparent `border` sometimes work, but not if you need a visible border or `box-shadow`. <!--more--> Having come up with a half-complete solution, I came across [Percentage Plus Pixel Sizing](http://www.cssplay.co.uk/boxes/outside.html) and figured out the rest.

Note: **there _must_ be substantial content in at least one cell** for it to stretch the table to 100% width.

## Demo

Check out the [jsFiddle][demo].

## How To Set It Up

Let's start with a table and some basic content:

```html
<div id="container">
  <h1>This is a title</h1>
  <p>This is a paragraph.</p>
  <table>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>
        3; Let's put a whole bunch of content in here so that it stretches to
        100% width on most monitors.
      </td>
      <td>4</td>
    </tr>
    <tr>
      <td>5</td>
      <td>6</td>
      <td>7</td>
      <td>8</td>
    </tr>
  </table>
</div>
```

… and some CSS:

```css
table {
  border-collapse: separate;
  border-spacing: 10px;
  margin: 0 -10px; /* ejects outer border-spacing */
  min-width: 100%; /* in case content is too short */
}

td {
  background: green;
  width: 25%; /* keeps it even */
}
```

With substantial content, having `-10px` applied to the horizontal margins kind of simulates `width:100%` and pulls the outer `border-spacing` off the page.

We could stop here if working with a constant 100% width page. However, typical web design structures will often result in horizontal overflow and sometimes visible scrollbars.

```css
#container {
  background: red;
  box-sizing: border-box; /* avoids exceeding 100% width */
  margin: 0 auto;
  max-width: 1024px;
  padding: 0 10px; /* fits table overflow */
  width: 100%;
}
```

The padding will fit the `<table>` overflow and in this working example, `box-sizing` will ensure that the container does not exceed the `<body>`.

As you can see in the [demo][demo], the table lines up perfectly with the content above it. Fluid and responsive. Don't forget that it also works with a `display:table` layout. Enjoy!

[demo]: http://jsfiddle.net/stevenvachon/XBNnq/
