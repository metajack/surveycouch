var survey_data = null;

function survey_submitted(data, status)
{
    $('#title').empty();
    $('#title').append("Relax, and thanks for your answers!");
    $('#body').empty();
    $('#body').append("<p>Your survey answers have been submitted.  We " +
                      "appreciate your time and look forward to learning " +
                      "even more about you.</p>" +
                      "<p><a href='index.html'>Survey Couch</a></p>");
}

function survey_submit(e)
{
    e.preventDefault();
    
    var questions = [];
    for (var r in survey_data.rows) {
        questions.push(survey_data.rows[r].value);
        // remove unneeded fields
        delete questions[r]["_id"];
        delete questions[r]["_rev"];
    }
    
    // build json response
    var doc = {
        "type": "survey",
        "questions": questions,
        "answers": []
    };
    
    $('#questions .question').each(function (i) {
        if (this.tagName.toLowerCase() == 'input' &&
            this.type == 'radio') {
            if (this.checked)
                doc.answers.push(this.value);
        } else {
            doc.answers.push(this.value);
        }
    });
    
    $.ajax({"type": "POST",
            "url": "/surveycouch/",
            "contentType": "application/json",
            "dataType": "json",
            "processData": false,
            "data": $.toJSON(doc),
            "success": survey_submitted});
}

$(document).ready(function () {
    $('#form').submit(survey_submit);
    
    $.getJSON("/surveycouch/_design/surveycouch/_view/questions",
              function (data) {
                  survey_data = data;
                  for (var r in data.rows) {
                      var doc = data.rows[r].value;
                      
                      var question = "<div>" + doc.question + "</div>";
                      var answer = "<div>";
                      
                      switch (doc.answers.type) {
                      case "text":
                          answer += "Answer: <input name='" + r + 
                              "' type='text' class='question' />";
                          break;
                      case "textarea":
                          answer += "Answer:<br /><textarea name='" + r +
                              "' class='question'></textarea>";
                          break;
                      case "choice":
                          answer += "<ul>";
                          for (var i in doc.answers.choices) {
                              answer += "<li><input name='" + r + 
                                  "' type='radio' value='" + i + "' " +
                                  "class='question' />";
                              answer += "<label>" + 
                                  doc.answers.choices[i] + "</label></li>";
                          }
                          answer += "</ul>";
                          break;
                      default:
                          continue;
                      }
                      answer += "</div>";
                      
                      $('#questions').append("<li>" + question + 
                                             answer + "</li>");
                  }
              });
});