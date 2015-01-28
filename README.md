# Hey, there!

This is the git for my personal website: [who.guido.is](who.guido.is).

# Design

This time around I went for sorta-classic approach with the emulation of an OSX terminal. The buttons flicker when pressed like in in the old macs (the first computers I ever used) and there is also a dot background for the command palette that is also kind of retro.

Not exactly minimal like previous designs but, hey, you gotta do new things to keep evolving.

## Interesting challenges faced

### Javascript sequential operations

It turned out to be tricky to make the terminal write one line after the other in a sequential way. Since Javascript launches a thread per functioned called, there is no real warranty that one thing will be executed after the other just because they are called in that order. Mutex wont do since JS threading is not user controllable.

This is bad enough for writing one line after the other, so imagine writing one character at a time to emulate user writing speed.

At this point there are three approaches:

1. Keep a global counter to set delays in setTimeout function
2. Use callback functions
3. A mix (our lucky winner)

The problem with using only callback functions is that if you have to include a callback per character the memory usage gets high.

**The Solution** turned out to be using callback functions for "machine written" lines and a global turn variable for "user written" lines. Check it out in the code for appendLine and appendText respectively ;)

### Making the "PDF version" button visible without making it ugly

This site is "cool" but that is not for everyone. I needed a PDF version. But the button, while being visible enough, could make the user immediately go for it. The idea of this website is to **connect the visitor with the cv**, making them interact to get the document (breaking the "virtual distance").

**The Solution** was changing the dot color in the background to an inviting yet not disturbing shade of green. I hope it did the trick and scored a balanced result.

###EO Making the "PDF version" button visible without making it ugly

This site is "cool" but that is not for everyone. I needed a PDF version. But the button, while being visible enough, could make the user immediately go for it. The idea of this website is to **connect the visitor with the cv**, making them interact to get the document (breaking the "virtual distance").

**The Solution** was changing the dot color in the background to an inviting yet not disturbing shade of green. I hope it did the trick and scored a balanced result.

###EOF


