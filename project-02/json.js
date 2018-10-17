function findImage (multimedia, format) {
    for(let i = 0; i < multimedia.length; i++) {
        const currentImage = multimedia[i];
        if(currentImage.format === format) {
            return currentImage;
        }
    }
}

function extractArticleData (article) {
    const abstract = article.abstract;
    const multimedia = findImage(article.multimedia, 'superJumbo');
    const imageUrl = multimedia.url;
    return {
        abstract: abstract,
        imageUrl: imageUrl
    }
}

function renderArticle (articleData, articleNode) {
    $('img', articleNode).attr('src', articleData.imageUrl);
    $('p', articleNode).text(articleData.abstract);
}

$(function () {
    let url = "https://api.nytimes.com/svc/topstories/v2/home.json";

    url += '?' + $.param({
        'api-key': "b0d2e78ec76340b08e94f63c93132731"
    });

    $.ajax({
        url: url,
        method: 'GET'
    }).done(function(data) {

        const result = data.results[0];
        const articleData = extractArticleData(result);
        const articleNode = $('article')[0];

        renderArticle(articleData, articleNode);

    }).fail(function(err) {
        throw err;
    });
});