<h1>Baby Ready</h1>
<p><a href="https://bookkeeper-ape-63565.netlify.com/">Baby Ready</a> is a responsive full-stack app that allows users to record and track important information related to their pregnancy.</p>
<img src="public/help0001.png">

## Getting started
### Installing
```
>   `git clone https://github.com/bdcrews/baby-ready`
>   `cd baby-ready`
>   `npm install`
```
>   `git clone https://github.com/bdcrews/baby-ready-server`
>   `cd baby-ready`
>   `npm install`
```
### Launching
```
>   `npm start` (both projects)
```
Then open [`localhost:3000`](http://localhost:3000) in a browser.
### Testing
```
>   `npm run test`
```

<h2>Introduction</h2>
<p>Baby Ready helps soon to be moms stay organized during their pregnancy by giving them a convient place to save, view, and update important information.  The app gives helpful tips and has a journal for new moms fill out.</p>

<h2>How it Works</h2>
<h3>User Data</h3>
<p>Baby Ready gives you a convenient place to store important stats related to your pregnancy. These stats are show on the opening page after login to give you quick access to your information.</p>

<h3>Journal</h3>
<p>The Baby Ready Journal gives you a convenient place to jot down your thoughts. Weather that is a list of questions for your next doctor's visit or happy memories of your pregnancy that you don't want to forget.</p>
<p>When you create a new page or update a journal page a new screen will be shown that allows you to enter or update the journal page. Update also gives the user the option to delete the page from the journal.</p>

<h2>Technology</h2>
<h3>Front End</h3>
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>JavaScript</li>
  <li>React Bootstrap</li>
</ul>
<h3>Back End</h3>
<ul>
  <li>Node.js + Express.js (web server)</li>
  <li>MongoDB (database)</li>
  <li><a href="https://mochajs.org/">Mocha</a> + <a href="http://chaijs.com/">Chai</a> (testing)</li>
  <li>Continuous integration and deployment with <a href="https://travis-ci.org/">Travis CI</a></li>
</ul>
<h3>Responsive</h3>
<ul>
  <li>The app is fully responsive and quickly adapts to all mobile, tablet, and desktop viewports.</li>
</ul>
<h3>Security</h3>
<ul>
  <li>User passwords are encrypted using <a href="https://jwt.io/">JWT (JSON Web Tokens)</a>.</li>
  <li><a href="http://passportjs.org/">Passport</a> is used to control endpoints from unauthorized users.</li>
</ul>
