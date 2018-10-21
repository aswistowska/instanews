const MAX_ARTICLE_NUMBER = 12;

function findImage(multimedia, format) {
    for (let i = 0; i < multimedia.length; i++) {
        const currentImage = multimedia[i];
        if (currentImage.format === format) {
            return currentImage;
        }
    }
}

function extractArticleData(article) {
    console.log(article);
    const abstract = article.abstract;
    const multimedia = findImage(article.multimedia, "superJumbo");
    if (!multimedia) {
        return null;
    }
    const imageUrl = multimedia.url;
    return {
        abstract: abstract,
        imageUrl: imageUrl
    };
}

function renderArticle(articleData, articleNode) {
    $("img", articleNode).attr("src", articleData.imageUrl);
    $("p", articleNode).text(articleData.abstract);
}

$(function () {
    const sectionSelect = $("#nyt_section_select");
    sectionSelect.on("change", function () {
        window.location.hash = sectionSelect.val();
    });
    if(window.location.hash) {
        sectionSelect.val(window.location.hash.substr(1)).change();
    }
});
/*
$(function () {
    let url = "https://api.nytimes.com/svc/topstories/v2/home.json";

    url += "?" + $.param({
        "api-key": "b0d2e78ec76340b08e94f63c93132731"
    });

    $.ajax({
        url: url,
        method: "GET"
    }).done(function (data) {

        for (let i = 0; i < data.results.length && i < MAX_ARTICLE_NUMBER; i++) {
            const result = data.results[i];
            const articleData = extractArticleData(result);
            if (articleData) {
                const articleNode = $("<article><img /><p></p></article>");
                $("#articleContainer").append(articleNode);
                renderArticle(articleData, articleNode);
            }
        }


    }).fail(function (err) {
        throw err;
    });
});
*/