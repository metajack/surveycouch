# surveycouch

SurveyCouch is a very simple survey application written as a
CouchApp.  CouchApps are pure JavaScript applications that are hosted
from within CouchDB itself.

## Dependencies

* [CouchDB](http://couchdb.org) 0.9 or later
* [CouchApp](http://github.com/jchris/couchapp/tree/master)

Note that if you know enough about CouchDB you can install the
application without CouchApp.  However, this is so inconvenient that I
recommend you just install CouchApp.

## Installing

Create a database called surveycouch and then set up `.couchapprc` to
point to it.  For example, copy `couchapprc.example` to `.couchapprc`
and change the database URL to something appropriate.

Next, push the application into CouchDB by running `couchapp push
local` (if you changed the name of the database location, you'll need
to use the same thing here).

Finally, visit
http://localhost:5984/surveycouch/_design/surveycouch/index.html
to see your application.  Note that if you're CouchDB is running on
another domain or port you will have to edit the URL accordingly.

## License

This code is copyright (c) 2009 by Jack Moffitt <jack@metajack.im> and
is available under the [Apache License version
2.0](http://www.gnu.org/licenses/gpl.html).  See `LICENSE.txt` for
details.
