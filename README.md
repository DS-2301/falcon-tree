# Tree

A React component visualization tool that renders your entire component architecture as an interactive, searchable graph.

**Live Demo:** https://falcon-tree.netlify.app/  
**Source Code:** https://github.com/DS-2301/falcon-tree

> Currently showing the tree of the app located in the `testData` folder

---

## Product

### Problem

When I open a React codebase to understand how it works, I want to answer a few questions:

- How is this app structured?
- Where on this page is that component used?
- What's the component hierarchy?

To do that, I either hope for a good folder structure (which is not always the case) and/or go through most of the components trying to understand how they operate and relate to each other.

### Solution

To solve this question once and for all, I present **Tree** - a new tab in Falcon that visualizes all the project's components and their relationships.

This feature:

- Clearly shows how your app is structured
- Provides refactor potential by showing unused components
- Gives visual insight into how you use your existing components
- Allows you to inspect props being passed to particular components in the fastest and most structured way
- Enables you to identify and debug issues quickly

You can see the structure in 2 seconds vs reading the code for 10 minutes.
If you know the name of the component you're looking for, you can search it up and then jump into the code to further investigate/make changes/debug.

### Personal Bias

I personally have been looking for a feature like this for a long time, and would be easily converted to a new IDE just for this feature (or at least will use it as my second one). I tried a bunch of VSCode extensions, but all of them are either trash or straight up not working.

Features like this are insanely useful both when you're trying to understand what's happening in a project you never worked on, when you're working on a large project daily, or when you're coming back to a repository you haven’t worked on in a while, but loosely remember how things are done there.

---

## Design

### First Encounter

When a user opens Tree, they see their entire component architecture rendered as an interactive graph. The root component sits at the top, with child components flowing downward. No configuration required - the tool parses their codebase automatically.

### Making Sense of It

- **Color coding:** Components are colored by their folder/category (layout, forms, common, etc.), creating instant visual grouping
- **Usage badges:** Components used multiple times show a count badge (×3), immediately surfacing reusability patterns, and can be further inspected by clicking on the component card
- **Orphan detection:** Unused components appear in a separate "Orphan Components" section with a warning style, highlighting cleanup opportunities

### Workflow Integration

1. **Search:** Type a component name to highlight matches across the tree. Arrow keys cycle through results while the canvas auto-zooms to each match.

2. **Inspect:** Click any node to open the details panel showing:
   - File path (with "Jump to Code" action)
   - Props definition
   - Individual instances with their passed props
   - Category/folder path

---

## Prototype

I prioritized the core interaction loop: see structure -> search for component -> understand its context.

The parser handles real-world patterns (named exports, arrow functions, nested folders) rather than just idealized examples.

### What I Learned

- **React Flow is super cool** - I will probably use it in my other projects. It saved me a lot of time versus writing my own custom visual board solution.
- I tried Tree on a couple of my other projects during testing and found a lot of repetitive patterns + about 20 legacy components which I hadn't been using anywhere in months.

---

## Testing

I tested the feature on the initial fake app (which is the current live example), ensured it worked correctly, and slowly added more layers of complexity (unused files, nested structure, more components, more nesting, duplicated components). When I covered most of the use cases I could think of, I started testing the parser on my other projects, and after a couple of adjustments (arrow function components, no default export, etc.) I landed on a solution that works in all my projects except one with aliases in exports (this is a totally solvable problem that I intentionally decided to leave out of the scope of this assignment).

### Success Criteria

The feature succeeds when a user can answer "Where is Button used and with what props?" faster using Tree than by grepping their codebase or using 15 `Cmd+Click` combinations (literally a use case I faced at work way too many times).

---

## Marketing

### Name: Tree

Simple, short, and inline with other Falcon tabs. Unique and descriptive enough that it wouldn't be confused with anything else.

### Video Concept

I would create a short marketing video showcasing a developer getting a ticket that looks pretty simple (short description, viewer should get it from the first glance).

They start digging through the code and can't find where the thing they need to work on is located. Background noise + music becomes louder and more intense, cuts becoming quicker, increasing the tension, visually and audibly showing frustration and growing anger.

In the last couple of cuts, the person alt-tabs into Falcon into the Tree view, and **everything goes quiet** - no music, no noise. Close-up face shot showing relief and calmness. They click on the component card and "Jump to Code."

Shot from the back with a person typing, slowly zooming out. Falcon logo + visuals appear on the screen, and Falcon-themed music slowly gets louder as the camera zooms out.

Something like this can clearly communicate why one should use it and how it's better than alternatives. Plus some virality + brand identity expansion potential if done well.

---

## Feedback Loop

### Future Features

1. **Support for non-React codebases** - React was chosen as a good POC with very high usage, plus it's easier to scope out in the context of the assignment

2. **AI analysis** - Falcon can analyze your codebase and identify things such as: "You have 7 different button implementations", "These 3 components share the same layout pattern", etc.

3. **Copy function** - Select a component/page, click copy, and it prompts you on how you want to copy this component and how this copy will be different from the original, then proceeds with copy generation

4. **Keyboard shortcuts** - Various shortcuts to be consistent with Falcon's keyboard-first approach

### Prioritization

Features are prioritized based on user feedback gathered:

- Online in the wild (YouTube, Twitter, Discord)
- Through feedback channels (feedback forms, personal outreach, Discord feedback)

**Bugs are prioritized higher than any feature.**

### Version 1.0 -> 1.1

Small features + bug fixes based on likely early feedback. Features like #1, #3, or ones that users proposed and are relatively easy/quick to do - to retain traction and show care.

### Version 1.1 -> 2.0

Major changes, introducing new functionalities (features like #2, #4).

### Long-term Vision

Tree becomes the **thinking space** for architecture decisions - not just visualization, but a place where you plan refactors, identify inconsistencies, and evolve your design.
