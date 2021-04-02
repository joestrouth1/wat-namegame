# Design changes

The assignment permitted me to make UI changes up to and including designing an entirely different interface.

I tried to stick to the original designs with a few exceptions, noted below.

## Typography

The desktop mockup uses Helvetica throughout. This font does not ship with the latest version of Windows. Given that system fonts were used for the iOS and Android designs, I used a system font stack for the web.

## Mobile

I referenced the desktop and iOS/Android designs when creating mobile mockups.

Those designs used a variant of the splash screen logo with a gradient fill. I used that variant everywhere, including the desktop web where it was originally solid.

The app designs did not show the "Continue" button below the employee grid that was present on desktop web. I added that everywhere. They also did not include the instructional text "Which one of these..." above the employee name. I added hint text below the grid to clarify the expected interaction.

The desktop design used a disabled "Continue" button before any selection is made. Disabled buttons are frequently hard to read and are unreachable by keyboard. I used a regular button that's always accessible and focused the instructional text if a user tried to continue before selecting the correct employee.

## Other changes

After reviewing the designs and asking for clarification, I wasn't sure about how to calculate "Correct"/"Incorrect Selections" on the score page. The header shows correct first guesses out of 5 rounds. I calculated the percentages using all guesses, such that if each round required four guesses the score would be 0/5 and 25%/75%.

There was no visible label for the employees on the grid. Folks who use software like Dragon Naturally Speaking to interact with the web using their voice would have difficulty specifying which element they'd like to click. I added a number to the corner of each element so that they could say "Click 3", instead of having to rely on [MouseGrid](https://www.nuance.com/products/help/dragon/dragon-for-mac/enx/Content/Navigation/MouseGrid.html) which can be slow.

I had to make the decision early on that this application was not going to be accessible to screen readers. Adding alt text that contained the employee's name would defeat the entire purpose of the game. There's room for improvement, especially with regard to announcing SPA navigation changes, but fixing those issues would not fix the fundamental inaccessibility of this kind of game. It is what it is.
