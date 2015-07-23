<!--
<a name="unreleased"></a>
# Unreleased
-->

<a name="0.0.2"></a>
# 0.0.2

**NEW:**
* Synchronous XHR option (#28, ported from keen-js)

**BREAKING:**
* `.recordEvent` XHR calls now use POST, mirroring previous keen-js functionality (#27).
* `client.url()`: The previous keen-js implementation of `client.url()` automatically included `https://api.keen.io/3.0/projects/PROJECT_ID` + a `path` argument ('/events/whatever'), which severely limited its value. It now only returns `https://api.keen.io` + the path argument.


<a name="0.0.1"></a>
# 0.0.1 Hello, world!

**NEW:**
* [Everything](./README.md) :)
