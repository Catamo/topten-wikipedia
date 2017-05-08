$(function() {

  const $btnSearch = $("#btnSearch");
  const $searchResults = $("#searchResults");
  const $main = $("#main");
  const $query = $("#query");

  const HTML_SPINNER = "<i class='fa fa-circle-o-notch fa-spin'></i>";

  const urlWiki = 'https://en.wikipedia.org/w/api.php?pithumbsize=150&format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?';
  var urlPage = 'http://en.wikipedia.org/?curid=';

  $("form").submit(function(ev){
    ev.preventDefault();
    var reqString = urlWiki + "&gsrsearch=" + $query.val();

    $query.prop("disabled", true);
    $btnSearch.prop("disabled", true);
    var oldHtml = $btnSearch.html();
    $btnSearch.html(HTML_SPINNER);

    $.getJSON(reqString, function(data){
        console.log(data);
        var source   = $("#entry-template").html();
            template = Handlebars.compile(source),
            html = "";

        $searchResults.html("");

        $.each(data.query.pages, function(key, val){
          val.url = urlPage + val.pageid;

          html = template(val);
          $searchResults.append(html);
        });

        $main.removeClass("hidden");

        $query.prop("disabled", false);
        $btnSearch.prop("disabled", false).html(oldHtml);

        $('html, body').animate({
            scrollTop: $main.offset().top
        }, 800);
    });
  });

  $("#backToTop").click(function (ev) {
    ev.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 800);
  });

});
