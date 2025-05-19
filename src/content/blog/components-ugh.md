---
date: 2003-06-12
description: Macromedia's user interface components have cooties.
layout: blog-post.11ty.js
tags:
  - blog-category-graphics
  - blog-category-rants
  - blog-category-websites
  - blog-post
title: Components… Ugh!
---

Components can be useful when writing code that's to be used by designers with little or no programming experience. The visual elements created when building a component make customizing them as effortless as using Flash MX's user interface. But what does this end up costing the developer? <!--more-->

## Standard Components

### Preloading

First of all, components require library symbols to be exported for ActionScript. For them to be preloaded properly, you'd need to go through the hassle of dragging the component onto the stage in a keyframe following a preloader, then individually disable "Export in first frame" for each symbol. Depending on the number of components and their level of complexity, not doing such would result in a bloated first frame with a hefty file size. Thus making any preloader inaccurate.

With a normal class, it can be placed on any frame and are preloaded properly as a result. Of course if the class references library instances, they'll have to be set up using the technique mentioned above. But the beauty of a class is that unless you're working with images, no library instances are required at all. Everything can be created, drawn and animated with 100% script. Additionally, the classes themselves can be contained in external files and included (via `#include`) for compiling a SWF.

### Speed

While a component is just a variant of a normal class, they provide less performance. In a simple benchmark test, a normal class was compared to a component containing the exact same routine. The machine tested on was an Intel® Celeron® 500 (representing an average clock speed of the Internet's population). The class was averaged at 15,554 ms while the component averaged at 15,774 ms. Not a very big difference with a single `for()` loop. However, with a few simultaneous frame loops running their own routines, components could fall further behind.

Here is the component's code:

```actionscript
#initclip

function testComponent()
{
  this.init();
}

testComponent.prototype = new MovieClip();

testComponent.prototype.init = function()
{
  for (var i=0; i<5000; i++)
  {
    this.createEmptyMovieClip("mc"+i, i);
  }
}

Object.registerClass("linkageID", testComponent);

#endinitclip
```

Here is the class' code:

```actionscript
function testClass(target)
{
  this.target = target;
  this.init();
}

testClass.prototype.init = function()
{
  for (var i=0; i<5000; i++)
  {
    this.target.createEmptyMovieClip("mc"+i, i);
  }
}
```

Now we'll shift focus to Macomedia's FUI Components that come packed with Flash MX. If there are any reasons one can fathom as to why components have a bad name, it is due to these particular components. They are not targeted to developers even though the power is there for them. As mentioned earlier, they are targeted to designers who have little or no experience with code.

## FUI Components

### Sloppy

Because of the target audience, FUI Component code quality seems to have been ignored. They have inefficient code and are spread out across dozens of MovieClips. That rules out the possibility of making any changes in a reasonable amount of time.

### Bulky

Seeing that all objects used in the FUI Components must all be editable by a designer through the Flash MX user interface, they are forced into being stored in the library. Depending on the component, the library for a single component can rise to nearly 100 MovieClips.

### File Size

Components are too big for their purpose. Below is a list of the FUI Components and their respective (compressed) file sizes.

| Component    | Size  |
| ------------ | ----- |
| FCheckBox    | 6 KB  |
| FComboBox    | 16 KB |
| FListBox     | 14 KB |
| FPushButton  | 6 KB  |
| FRadioButton | 8 KB  |
| FScrollBar   | 8 KB  |
| FScrollPane  | 10 KB |

Granted that certain components share other components and library objects. Therefore if all components were placed in a single movie, the file size would not be 68 KB. Although shared objects open up another issue.

### Shared Library Objects

Since components share objects to minimize file size, we run into issues when trying to differentiate design elements between two components. That can be problematic when the very object you are trying to make unique is shared. As a result, making a visual change to one makes the same change to another component. Working around this involves duplicating the MovieClip and changing its library name and linkage identifier (if applicable).

## Conclusion

Components aren't entirely bad and they definitely have their uses. Those uses depend entirely on preference and who will be using your code.
