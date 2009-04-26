function view_survey(id)
{
    $.getJSON("/surveycouch/" + id,
              function (data) {
                  var survey = "<p>There are " + data.answers.length + 
                      " answers.</p>";

                  for (var a in data.answers) {
                      survey += "<h2>Answer " + (parseInt(a) + 1) + "</h2>";
                      survey += "<p>The question was '" + 
                          data.questions[a].question + "</p>";
                      survey += "<p>Answered: ";
                      if (data.questions[a].answers.type == 'choice') {
                          var choices = data.questions[a].answers.choices;
                          survey += choices[data.answers[a]];
                      } else {
                          survey += data.answers[a];
                      }
                      survey += "</p>";
                  }

                  $('#title').empty();
                  $('#title').append('Survey ' + id);
                  $('#body').empty();
                  $('#body').append(survey);
                  $('#body').append("<hr /><a href='results.html'>" +
                                    "Back to results</a>");
              });
}

$(document).ready(function () {
        $.getJSON("/surveycouch/_design/surveycouch/_view/surveys",
                  function (data) {
                      for (var r in data.rows) {
                          var doc = data.rows[r].value;
                          
                          $('#surveys').append("<li>" + 
                                               "<a href='javascript:void(0);'" +
                                               " onclick='view_survey(\"" +
                                               doc._id + "\");'>" +
                                               doc._id + "</a></li>");
                      }
                  });
    });