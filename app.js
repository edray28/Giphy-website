//Created using Jquery 
$(document).ready(function () {

    const gifArea = $("#gifs"); //GIF area to be placed in Div element
    const search = $("#search"); //Search in Form input 
    const header = $("h2"); //Header2 Indicator

    //Form on Submit Function 
    $("form").on("submit", function (e) {
        e.preventDefault();
        const searchVal = search.val();
        search.val("");

        //Get API with Key & Search query
        $.get(`https://api.giphy.com/v1/gifs/search?api_key=VlXgO8ZpkT8ATmgJxYF8YZHv1CEtV89M&q=${searchVal}&offset=0&lang=en`,
        ).then(function (res) {
            const numResults = res.data.length;
            if (numResults) {
                const randomize = Math.floor(Math.random() * numResults);  //Randomize gifs per search query
                const newLabel = $(`<h4>${res.data[randomize].title}</h4></a>`);     //Title per Gif
                const newColumn = $("<div>", { class: "col-md-3 col-9 mb-4 text-center" });      //Gif parent Div
                //Gif image
                const newGifs = $("<img>", {
                    src: res.data[randomize].images.original.url,
                    class: "w-200 img-fluid border border-white",
                });

                newColumn.append(newLabel);       //Add Title to Div per gif 
                newColumn.append(newGifs);       // Add img to Div column
                gifArea.append(newColumn);    //Add Div element to Div with Id gifarea html
                $("h2").text("Gif Found!");
            } else {
                header.text("Gif not Found! Try Again");
            }
        })
        //Clears Search Query & Gifs on Gifarea
        $("#clear").on("click", function () {
            gifArea.empty();
            header.text("Cleared!");
        });
    });

});
