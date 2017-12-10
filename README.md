# Meaningful Words

### [Live Link](https://th0r0nd0r.github.io/meaningful-words/)


### The Product

![words gif](https://user-images.githubusercontent.com/29419913/33779416-b52c747e-dc01-11e7-8eb6-06b684f55090.gif)

This is a fun project I made using the D3.js library.  It's designed to give readers a feel for the flavor of a text.

### The Process

I used the HTML5 File API to handle file manipulation browser-side, then came up with some algorithms to break a file into words and filter out those that don't matter.

Finally I used D3 to make a force layout graph with the most-used words in a text.

- Each node represents one word
- The radius of a node corresponds to the number of occurrences of that word in the text (relative to the other words)
- The color gradient is another visual representation of a word's concentration.

Play around, have fun, and try it with your own text!
