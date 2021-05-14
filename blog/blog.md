---
layout: blog
title: Blog
subtitle: Hier kan je al mijn blogs terugvinden.
permalink: /blog
---

<html>
<head>
<title>Home - Fury_106</title>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" />
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZJGHDFE3XH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZJGHDFE3XH');
</script>
</head>

<body>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

<!--Cookies popup-->
<script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" data-cfasync="false"></script>
<script>
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#252e39"
    },
    "button": {
      "background": "#14a7d0"
    }
  },
  "content": {
    "message": "Deze website maakt gebruik van cookies en scripts (zoals Google Analytics) om voor een betere ervaring te zorgen. Door onze website te gebruiken ga je akkoord met het gebruik hiervan.",
    "dismiss": "Doorgaan",
    "link": "Privacy policy",
    "href": "https://fury106.github.io/privacy"
  }
});
</script>
</body>
</html>