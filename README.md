# Meaningful Words

### The Product

![words gif](https://user-images.githubusercontent.com/29419913/33754250-38046d82-dba0-11e7-941e-1ad635f177fa.gif)

This is a fun project I made using the D3.js library.  It's designed to give readers a feel for the flavor of a text.

### The Process

I used the HTML5 File API to handle file manipulation browser-side, then came up with some algorithms to break a file into words and filter out those that don't matter.

Finally I used D3 to make a force layout graph with the most-used words in a text.

- Each node represents one word
- The radius of a node corresponds to the number of occurrences of that word in the text (relative to the other words)
- The color gradient is another visual representation of a word's concentration.

Play around, have fun, and try uploading your own text!
