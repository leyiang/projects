$(document).ready(function() {
    
    $(".project-item img").click(function() {
        $(".imgScaled img").attr( "src", $(this).attr("src") );

        $(".imgScaled").fadeIn();
        return false;
    })
    
    $(".project-item").click(function() {
        window.location.href = $(this).attr("data-url");  
    })

    $(".imgScaled").click(function() {
        $(this).fadeOut();
    })
})