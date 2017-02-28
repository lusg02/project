
$('#search-text').bind('keyup', function () {
	var $searchForm = $('#search-form');
	var searchText = $(this).val();

	$.get('http://api.bing.com/qsonhs.aspx?q=' + searchText, function (d) {
		var d = d.AS.Results[0].Suggests;
		var html = '';

		for (var i=0; i<d.length; i++) {
			html += '<li>' + d[i].Txt + '</li>'
		}

		$('#search-result').html(html);

		$('#search-suggest').show().css({
			top: $searchForm.offset().top + $('#search-form').height() + 10,
			left: $searchForm.offset().left,
			position: 'absolute'
		});
	}, 'json');

});

$(document).bind('click', function () {
	$('#search-suggest').hide();
});

$(document).delegate('li', 'click', function () {
	var keyword = $(this).text();

	location.href = 'http://cn.bing.com/search?q=' + keyword;
});