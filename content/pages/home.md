---
title: Portfolio v2
blocks:
  - tagline: "\U0001F6E0 Software Engineer"
    headline: Game/Web Development
    text: >
      This project is set up to show you the basics of working with **Tina**.
      You're looking at the landing page, which pulls content from
      content/pages/home.md, components from components/blocks, and puts them
      all together in `pages/[filename].tsx`, all based on a schema defined in
      .tina/schema.ts.
    actions:
      - label: Get Started
        type: button
        icon: true
        link: /posts
      - label: Read Blog
        type: link
        icon: false
        link: /posts
    image:
      src: /uploads/60178860.jpg
      alt: Quirky developer photo
    color: default
    _template: hero
  - items:
      - icon:
          name: BiPalette
          color: green
          style: float
        title: Configurable Theme
        text: >-
          Edit global theme configuration with Tina. Change your theme's primary
          color, font, or icon set.
      - icon:
          name: BiLike
          color: primary
          style: float
        title: This Is a Feature
        text: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
      - icon:
          name: BiCodeBlock
          color: red
          style: float
        title: Amazing Feature
        text: >-
          Aliquam blandit felis rhoncus, eleifend ipsum in, condimentum nibh.
          Praesent ac faucibus risus, eu lacinia enim.
    color: tint
    _template: features
  - quote: >-
      A good programmer is someone who always looks both ways before crossing a
      one-way street.
    author: A good programmer
    color: tint
    _template: testimonial
---


