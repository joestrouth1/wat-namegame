# Regrets

Some things I'd do differently if I took on this assignment again.

- Skip TypeScript. I like TypeScript and felt compelled to demonstrate a working knowledge of it, but choosing it for an application with one developer that will be unmaintained in the very near future merely added complexity. I could have spent the time polishing the UI, adding features, or writing docs instead of writing overload signatures and augmented types for framework functions.
- Write more tests. The flip side to my TS regrets, I didn't do enough to demonstrate a working knowledge in this area. I justified this in my mind by considering that these tests won't be run ever again, that my preferred `@testing-library` doesn't support Vue 3 well yet, and that there are few shared components worth testing. Hopefully the `split-app` React+TS repo I reviewed during my technical interview was sufficient in this area.
- Insufficient cross-browser compatability testing. I'm sure many folks at WillowTree use Apple products but I simply do not own any devices that will run Safari. Nothing against them but I have zero idea what this app looks like in that browser. Fingers crossed!
- Not taking the time to configure PostCSS. I only relied on SCSS for nesting rulesets and using variables within media query definitions. Both of those could've been achieved using proposed CSS syntax via PostCSS plugins. By the time I hit those limitations I had already spent too much time on tooling.
- Using the bleeding edge versions of packages that I haven't used in over a year. I was excited to have my choice of tools and see what had changed since the Vue ecosystem moved to TS. I'm a little glad I did for learning's sake but it left me in a sort of uncanny valley. The tools felt *just* foreign enough that I spent more time reading docs than I expected and that cut into building features.