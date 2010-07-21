##Install

    curl -# http://github.com/bmeck/Witch/raw/master/install.sh | sh

##Navigating

Use the repl and location to change the page, just like a normal web browser.

    window.location.assign('www.google.com')

##Capabilities

* Will run sandboxed javascript
* Will track cookies of documents
* Provides a repl

##Not Implemented... Yet

* Form Submission / document.form
* AJAX
* Globals setting reactions (ie. setting window.location)
* Automatic Redirects
* http.createClient is not handling large urls well