---
date: 2009-12-11
description: Compares the performance increase in using a Vector() array instead of DisplayObjectContainer.getChildAt() for an ActionScript 3 particle emitter.
layout: blog-post.11ty.js
tags:
  - blog-category-engineering
  - blog-post
title: 'Benchmark: ActionScript 3 Vector vs. getChildAt'
---

I have never stored my particle instances in an array or any unique variables. There's just no need to. The same can be achieved using only the child list, and with less bloat. New to Flash Player 10 is the `Vector()` class, and while they _are_ [faster than arrays](http://www.mikechambers.com/blog/2008/09/24/actioscript-3-vector-array-performance-comparison/), are they faster than `getChildAt()` and the child list? <!--more--> While being faced with a new particle-based project, I figured I'd find out.

| Function       | Time       | Comparison     |
| -------------- | ---------- | -------------- |
| `Vector()`     | 3036.02 ms | (2.76% faster) |
| `getChildAt()` | 3122.12 ms |                |

Keep in mind that adding `Vector()` to your code is an additional object and as such, will use additional memory.

Here is the benchmark code:

```actionscript
package
{
  import flash.display.*;
  import flash.events.*;
  import flash.utils.*;



  public class VectorChild extends Sprite
  {
    protected var NUM_CHILDREN:int = 20000;
    protected var NUM_TESTS_EACH:int = 100;

    protected var containerTimes:Vector.<int> = new Vector.<int>(NUM_TESTS_EACH, NUM_CHILDREN);
    protected var testCount:int = -1;
    protected var testPhase:int = 0;  // 0=container, 1=vector
    protected var timer:Timer = new Timer(10, 1);
    protected var vectorTimes:Vector.<int> = new Vector.<int>(NUM_TESTS_EACH, NUM_CHILDREN);



    public function VectorChild()
    {
      startNextTest();
    }



    protected function getAverages():void
    {
      var containerSum:int;
      var vectorSum:int;

      for (var i:int=0; i<NUM_TESTS_EACH; i++)
      {
        containerSum += containerTimes[i];
        vectorSum += vectorTimes[i];
      }

      trace("===============================");
      trace("Average Container Test Time: "+ (containerSum/NUM_TESTS_EACH) +" ms");
      trace("Average Vector Test Time: "+ (vectorSum/NUM_TESTS_EACH) +" ms");
    }



    protected function handleContainerTest(event:Event):void
    {
      var time:int = getTimer();

      for (var i:int=0; i<NUM_CHILDREN; i++)
      {
        var sprite:Sprite = new Sprite();

        // Some nonsense
        sprite.x = Math.random() * 200;
        sprite.y = Math.random() * 150;

        addChild(sprite);
      }

      for (i=0; i<NUM_CHILDREN; i++)
      {
        sprite = getChildAt(i) as Sprite;

        // More nonsense
        sprite.x += 50;
      }

      time = getTimer() - time;

      containerTimes[testCount] = time;

      trace("Container Test: "+ time +" ms");

      reset();
      startNextTest();
    }



    protected function handleVectorTest(event:Event):void
    {
      var time:int = getTimer();

      var vector:Vector.<Sprite> = new Vector.<Sprite>(NUM_CHILDREN);

      for (var i:int=0; i<NUM_CHILDREN; i++)
      {
        var sprite:Sprite = new Sprite();

        // Some nonsense
        sprite.x = Math.random() * 200;
        sprite.y = Math.random() * 150;

        vector[i] = sprite;

        // Still gets added to the stage -- it needs to be visual, after all
        addChild(sprite);
      }

      for (i=0; i<NUM_CHILDREN; i++)
      {
        sprite = vector[i];

        // More nonsense
        sprite.x += 50;
      }

      time = getTimer() - time;

      vectorTimes[testCount] = time;

      trace("Vector Test: "+ time +" ms");

      reset();
      startNextTest();
    }



    protected function reset():void
    {
      for (var i:int=NUM_CHILDREN-1; i>=0; i--)
      {
        removeChildAt(i);
      }
    }



    protected function startNextTest():void
    {
      if (++testCount >= NUM_TESTS_EACH)
      {
        if (testPhase == 0)
        {
          testCount = 0;
          testPhase = 1;

          timer.removeEventListener(TimerEvent.TIMER_COMPLETE, handleContainerTest);

          timer.addEventListener(TimerEvent.TIMER_COMPLETE, handleVectorTest);

          timer.start();
        }
        else
        {
          getAverages();
        }
      }
      else if (testCount == 0 && testPhase == 0)
      {
        timer.addEventListener(TimerEvent.TIMER_COMPLETE, handleContainerTest);

        timer.start();
      }
      else
      {
        timer.start();
      }
    }
  }
}
```
