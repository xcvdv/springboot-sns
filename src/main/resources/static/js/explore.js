let created_at;
let next_page_num = 0;
let total_page_num = 0;

window.onload = getExploreStory;

function getExploreStory() {
    $.ajax({
        type: "get",
        url: "/api/explore?page=0",
        dataType: "Json",
        success: function (data) {
            log = data;
            (data.content).forEach(content => {
                $("#story-list").append(exploreView(content));
            });
            total_page_num = data.totalPages;
            next_page_num = data.pageable.pageNumber + 1;
            if (next_page_num > total_page_num - 1)
                window.removeEventListener("scroll", checkScroll);
        },
        error: function (data) {
            if (data.status === 403)
                location.replace("/login");
        }
    });
}

window.addEventListener('scroll', checkScroll);

function checkScroll() {
    if (Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100) > 50)
        getExploreStory();
}

function exploreView(content) {
    let view = `<div>
    <div class="gallery-picture" tabindex="0" data-story-id="${content.storyId}">
        <img src="/file/post/${content.imageUrl}" class="gallery-image" style="display: block;">
        <div class="gallery-item-info">
            <ul>
                <li class="grid-like"><span class="visually-hidden">Likes:</span>
                    <i class="fas fa-heart" aria-hidden="true"></i> 111
                </li>
                <li class="grid-comments"><span class="visually-hidden">Comments:</span>
                    <i class="fas fa-comment" aria-hidden="true"></i> 111
                </li>
            </ul>
        </div>
    </div></div>`;
    return view;
}