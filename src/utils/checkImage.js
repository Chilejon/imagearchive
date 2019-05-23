const helpers = {
   helper1: function(string){
      return string.trim() + ".jpg"

   },
   checkImageExists: function(image_url){
    var http = new XMLHttpRequest();

    http.open("HEAD", image_url, false);
    http.send();

    if (http.status === 404) {
      return "src\\images\\NotFound.jpg";
    } else {
      return image_url;
    }
   }
}

export default helpers

