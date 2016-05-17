# reactiv
A react-like incremental vdom renderer

[![Circle CI](https://circleci.com/gh/twelve-monkeys/reactiv.svg?style=svg)](https://circleci.com/gh/twelve-monkeys/reactiv)
[![Travis CI](https://travis-ci.org/twelve-monkeys/reactiv.svg?branch=master)](https://travis-ci.org/twelve-monkeys/reactiv)
[![bitHound Overall Score](https://www.bithound.io/github/twelve-monkeys/reactiv/badges/score.svg)](https://www.bithound.io/github/twelve-monkeys/reactiv)

Still proof-of-concept.

This is a concretisation of google's incremental dom renderer, which has a vdom attached to the dom. This version keeps the virtual dom but mutates it incrementally. This uses the same small, non-gc-churning data objects as google's approach while avoiding relying on the DOM for iteration as it does.

It also supports fully a component lifecycle, including a proto-component class.

It is designed to be api compatible with google's incremental dom renderer, which has webpack/babel processing for .jsx available.
